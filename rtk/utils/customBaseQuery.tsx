import {
  fetchBaseQuery,
  type FetchBaseQueryError,
  type BaseQueryFn,
} from "@reduxjs/toolkit/query";
import { Mutex } from "async-mutex";
import { showAlert } from "../feature/alertSlice";
import { logoutUser, refreshUser } from "../feature/authSlice";

interface TokenResponse {
  access_token: string;

  // add any other expected fields
}

interface RefreshResult {
  data: {
    data: TokenResponse;
  };
  error?: any;
}

// Create a mutex to prevent concurrent token refreshes
const mutex = new Mutex();
// Base query setup
const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const state = getState() as any;
    const user = state.auth.user;

    if (user?.access_token) {
      headers.set("Authorization", "Bearer " + user.access_token);
      
    }
headers.set("user-agent", "");
    headers.set("ngrok-skip-browser-warning", "true");
    return headers;
  },
});



export const baseQueryWithReauth: BaseQueryFn<
  any,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  await mutex.waitForUnlock();
  let result = await baseQuery(args, api, extraOptions);

  if (!result?.error) return result;
  console.log("currently i am gere:",result)
  const status = result.error.status;
  const errorMessage =
    (result.error.data as any)?.message ||
    (result.error.data as any)?.error ||
    (result.error.data as any)?.detail ||
    "Something went wrong.";

  if (status === 401) {
    handle401(api);
  } else if (status === 403) {
    result = await handle403(args, api, extraOptions, result);
  } else if (status === 440) {
    handle440();
  } else {
    api.dispatch(
      showAlert({
        message: errorMessage,
        severity: "error",
      })
    );
  }

  return result;
};

// 🔹 Handles 401 Unauthorized
const handle401 = (api: any) => {
  api.dispatch(logoutUser());
  localStorage.clear();
};

// 🔹 Handles 403 Forbidden with refresh logic
const handle403 = async (
  args: any,
  api: any,
  extraOptions: any,
  result: any
) => {
  if (mutex.isLocked()) {
    await mutex.waitForUnlock();
    return result;
  }

  const release = await mutex.acquire();

  try {
    const refreshResult = (await baseQuery(
      {
        url: "/api/v1/auth/refresh-token",
        method: "POST",
        body: {
          refresh_token: (api.getState() as any).auth.user?.refresh_token,
        },
      },
      api,
      extraOptions
    )) as RefreshResult;

    if (refreshResult?.data) {
      const tokenData = refreshResult.data.data;
      api.dispatch(refreshUser(tokenData.access_token));
      return await baseQuery(args, api, extraOptions);
    }
    const status = refreshResult.error.status;
    if (status === 401) {
      handle401(api);
    }
  } catch {
    localStorage.clear();
  } finally {
    release();
  }

  return result;
};

// 🔹 Handles 440 Session Expired
const handle440 = () => {
  localStorage.removeItem("persist:persist");
  window.location.href = "/";
};
