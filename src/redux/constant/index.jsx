export const BASE_URL = 'https://kathern-malapportioned-alva.ngrok-free.dev/';

export const endpoints = {
  REGISTER: 'auth/signup/requestOtp',
  LOGIN: 'auth/signin',
  SIGNUP_VERIFY_OTP: 'auth/signup/verifyOtp',
  SIGNUP_RESEND_OTP: 'auth/signup/resendOtp',
  VERIFY_OTP: 'auth/verifyOtp',
  FORGET_PASSWORD: 'auth/fotgotPassword',
  RESET_PASSWORD: 'auth/resetPassword',
  GET_ALL_FILES: year => (year ? `file?year=${year}` : 'file'),
  GET_ALL_CATEGORIES: 'category',
  GET_ALL_SERVICES: () => 'service',
};
