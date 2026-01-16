export const BASE_URL = 'https://apiforapp.link/Amplia/';

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
  GET_ALL_SERVICES: (search, categoryId) =>
    search
      ? `search?search=${search}`
      : categoryId
      ? `search?category=${categoryId}`
      : 'service',
  GET_USER_DETAIL: 'user',
  DELETE_USER: 'user',
  CHANGE_PASSWORD: 'user/updatePassword',
  GET_SINGLE_SERVICE: id =>  `service/${id}`,
};

export const TAX_SLABS = {
  2020: [
    { upto: 600000, rate: 0 },
    { upto: 1200000, rate: 0.05 },
    { upto: 1800000, rate: 0.1 },
    { upto: 2500000, rate: 0.15 },
    { upto: 3500000, rate: 0.175 },
    { upto: 5000000, rate: 0.2 },
    { upto: 8000000, rate: 0.225 },
    { upto: Infinity, rate: 0.25 },
  ],

  2021: [
    { upto: 600000, rate: 0 },
    { upto: 1200000, rate: 0.05 },
    { upto: 1800000, rate: 0.1 },
    { upto: 2500000, rate: 0.15 },
    { upto: 3500000, rate: 0.175 },
    { upto: 5000000, rate: 0.2 },
    { upto: 8000000, rate: 0.225 },
    { upto: Infinity, rate: 0.25 },
  ],

  2022: [
    { upto: 600000, rate: 0 },
    { upto: 1200000, rate: 0.025 },
    { upto: 2400000, rate: 0.125 },
    { upto: 3600000, rate: 0.2 },
    { upto: 6000000, rate: 0.25 },
    { upto: 12000000, rate: 0.325 },
    { upto: Infinity, rate: 0.35 },
  ],

  2023: [
    { upto: 600000, rate: 0 },
    { upto: 1200000, rate: 0.025 },
    { upto: 2400000, rate: 0.125 },
    { upto: 3600000, rate: 0.2 },
    { upto: 6000000, rate: 0.25 },
    { upto: 12000000, rate: 0.325 },
    { upto: Infinity, rate: 0.35 },
  ],

  2024: [
    { upto: 600000, rate: 0 },
    { upto: 1200000, rate: 0.025 },
    { upto: 2400000, rate: 0.125 },
    { upto: 3600000, rate: 0.2 },
    { upto: 6000000, rate: 0.25 },
    { upto: Infinity, rate: 0.35 },
  ],

  // Assumed same as 2024 (until Finance Act updates)
  2025: [
    { upto: 600000, rate: 0 },
    { upto: 1200000, rate: 0.025 },
    { upto: 2400000, rate: 0.125 },
    { upto: 3600000, rate: 0.2 },
    { upto: 6000000, rate: 0.25 },
    { upto: Infinity, rate: 0.35 },
  ],

  // Assumed same as 2024 (until Finance Act updates)
  2026: [
    { upto: 600000, rate: 0 },
    { upto: 1200000, rate: 0.025 },
    { upto: 2400000, rate: 0.125 },
    { upto: 3600000, rate: 0.2 },
    { upto: 6000000, rate: 0.25 },
    { upto: Infinity, rate: 0.35 },
  ],
};

export const messagesData = [
  {
    id: '1',
    text: 'Lorem ipsum dolor sit amet, consectetur adipicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua Lorem amet.',
    time: '4 mins ago',
    type: 'sent',
  },
  {
    id: '2',
    text: 'Lorem ipsum dolor sit amet, consectetur adipicing elit, sed do eiusmod tempor incididunt.',
    time: '4 mins ago',
    type: 'received',
  },
  {
    id: '3',
    text: 'Lorem ipsum dolor sit amet, consectetur',
    time: '4 mins ago',
    type: 'sent',
  },
  {
    id: '4',
    text: 'Lorem ipsum dolor sit amet, consectetur adipicing elit, sed do eiusmod tempor incididunt.',
    time: '4 mins ago',
    type: 'received',
  },
  {
    id: '5',
    text: 'Lorem ipsum dolor sit amet, consectetur',
    time: '4 mins ago',
    type: 'sent',
  },
];
