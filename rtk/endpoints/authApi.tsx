import api from "../services";

const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (body: { email: string; password: string }) => ({
        url: "/auth/login",
        method: "POST",
        body,
      }),
    }),
    forgotPassword: builder.mutation({
      query: (body: { email: string }) => ({
        url: "/api/v1/admin/forgot-password",
        method: "POST",
        body,
      }),
    }),
    resend: builder.mutation({
      query: (body: { email: string }) => ({
        url: "/api/v1/admin/resend-reset-link",
        method: "POST",
        body,
      }),
    }),
    resetPassword: builder.mutation({
      query: (body: { token: string; new_password: string }) => ({
        url: "/api/v1/admin/reset-password",
        method: "POST",
        body,
      }),
    }),
    logout: builder.mutation({
      query: (body: { refresh_token: string }) => ({
        url: "/api/v1/auth/logout",
        method: "POST",
        body,
      }),
    }),
    changePassword: builder.mutation({
      query: (body: { old_password: string; new_password: string }) => ({
        url: "/api/v1/user/change-password",
        method: "POST",
        body,
      }),
    }),
  }),
});

export { authApi };
export const { 
              useLoginMutation, 
              useForgotPasswordMutation, 
              useResendMutation,
            useResetPasswordMutation,
            useLogoutMutation,
            useChangePasswordMutation
           } = authApi;
