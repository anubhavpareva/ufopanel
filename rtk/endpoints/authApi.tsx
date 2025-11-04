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
    signup: builder.mutation({
      query: (body: {
        full_name: string;
        email: string;
        password: string;
        agree_to_terms: boolean;
      }) => ({
        url: "/auth/signup/start",
        method: "POST",
        body,
      }),
    }),
    verifyOtp: builder.mutation({
      query: (body: {
        verification_token:string;
        otp:string;
        purpose:string;
      }) => ({
        url: "/auth/verify-otp",
        method: "POST",
        body,
      }),
    }),
    forgotPassword: builder.mutation({
      query: (body: { email: string }) => ({
        url: "/auth/forgot/start",
        method: "POST",
        body,
      }),
    }),
    resend: builder.mutation({
      query: (body: { verification_token: string }) => ({
        url: "/auth/resend-otp",
        method: "POST",
        body,
      }),
    }),
    resetPassword: builder.mutation({
      query: (body: { reset_token: string; new_password: string }) => ({
        url: "/auth/reset/confirm",
        method: "POST",
        body,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/auth/signout",
        method: "POST",
        
      }),
    }),
    changePassword: builder.mutation({
      query: (body: { old_password: string; new_password: string }) => ({
        url: "/auth/password/change",
        method: "POST",
        body,
      }),
    }),
  }),
});

export { authApi };
export const {
  useLoginMutation,
  useSignupMutation,
  useVerifyOtpMutation,
  useForgotPasswordMutation,
  useResendMutation,
  useResetPasswordMutation,
  useLogoutMutation,
  useChangePasswordMutation,
} = authApi;
