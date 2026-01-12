import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL, endpoints } from '../constant';
export const authApis = createApi({
  reducerPath: 'authApis',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().persistedData.token;
      console.log('-:TOKEN:-', token);
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: builder => ({
    register: builder.mutation({
      query: data => ({
        url: endpoints.REGISTER,
        method: 'POST',
        body: data,
      }),
    }),
    signupVerifyOTP: builder.mutation({
      query: data => ({
        url: endpoints.SIGNUP_VERIFY_OTP,
        method: 'POST',
        body: data,
      }),
    }),
    login: builder.mutation({
      query: data => {
        console.log('login data',data)
        return {
          url: endpoints.LOGIN,
          method: 'POST',
          body: data,
        };
      },
    }),
    forgotPassword: builder.mutation({
      query: data => ({
        url: endpoints.FORGET_PASSWORD,
        method: 'POST',
        body: data,
      }),
    }),
    resetPassword: builder.mutation({
      query: data => ({
        url: endpoints.RESET_PASSWORD,
        method: 'POST',
        body: data,
      }),
    }),
    signupResendOTP: builder.mutation({
      query: data => ({
        url: endpoints.SIGNUP_RESEND_OTP,
        method: 'POST',
        body: data,
      }),
    }),
       verifyOTP: builder.mutation({
      query: data => ({
        url: endpoints.VERIFY_OTP,
        method: 'POST',
        body: data,
      }),
    }),
    // updateProfile: builder.mutation({
    //   query: data => ({
    //     url: endpoints.UPDATE_PROFILE,
    //     method: 'POST',
    //     body: data,
    //   }),
    // }),
  }),
});
export const {
  useRegisterMutation,
  useSignupVerifyOTPMutation,
  useSignupResendOTPMutation,
  useLoginMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useVerifyOTPMutation
} = authApis;
