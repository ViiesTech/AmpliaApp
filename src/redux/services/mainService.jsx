import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL, endpoints } from '../constant';
export const mainApis = createApi({
  reducerPath: 'mainApis',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().persistedData.token;
      console.log('<--:TOKEN:-->', token);
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: builder => ({
    getAllCategories: builder.query({
      query: () => ({
        url: endpoints.GET_ALL_CATEGORIES,
        method: 'GET',
      }),
    }),
    getAllServices: builder.query({
      query: ({ search, categoryId } = {}) => ({
        url: endpoints.GET_ALL_SERVICES(search, categoryId),
        method: 'GET',
      }),
    }),
    getFiles: builder.query({
      query: params => ({
        url: endpoints.GET_ALL_FILES(params),
        method: 'GET',
      }),
    }),
    getUserDetail: builder.query({
      query: () => ({
        url: endpoints.GET_USER_DETAIL,
        method: 'GET',
      }),
    }),
    deleteUser: builder.mutation({
      query: () => ({
        url: endpoints.DELETE_USER,
        method: 'DELETE',
      }),
    }),
    changePassword: builder.mutation({
      query: data => ({
        url: endpoints.CHANGE_PASSWORD,
        method: 'POST',
        body: data,
      }),
    }),
    getSingleService: builder.query({
      query: id => {
        console.log('getSingleService ID:-', id);

        return {
          url: endpoints.GET_SINGLE_SERVICE(id),
          method: 'GET',
        };
      },
    }),
    getBookings: builder.query({
      query: userId => {

        return {
          url: endpoints.GET_BOOKINGS(userId),
          method: 'GET',
        };
      },
    }),
    createBooking: builder.mutation({
      query: data => ({


        url: endpoints.createBooking,
        method: 'POST',
        body: data,
      }),
    }),
    getAllSubAdmins: builder.query({
      query: () => ({
        url: endpoints.GET_ALL_SUBADMINS,
        method: 'GET',
      }),
    }),
    // Chat Endpoints
    createChat: builder.mutation({
      query: (data) => ({
        url: 'chat',
        method: 'POST',
        body: data,
      }),
    }),
    sendMessage: builder.mutation({
      query: ({ id, data }) => ({
        url: `chat/${id}`,
        method: 'POST',
        body: data,
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      }),
    }),
    createRating: builder.mutation({
      query: (data) => ({
        url: endpoints.CREATE_RATING,
        method: 'POST',
        body: data,
      }),
    }),
    getRatings: builder.query({
      query: (serviceId) => ({
        url: endpoints.GET_RATINGS(serviceId),
        method: 'GET',
      }),
    }),
    getAllTaxCategories: builder.query({
      query: (params) => ({
        url: 'tax-category',
        method: 'GET',
        params: params,
      }),
    }),
    calculateTax: builder.mutation({
      query: (data) => ({
        url: 'tax-category/calculate',
        method: 'POST',
        body: data,
      }),
    }),
  }),
});
export const {
  useLazyGetFilesQuery,
  useLazyGetAllCategoriesQuery,
  useLazyGetUserDetailQuery,
  useDeleteUserMutation,
  useChangePasswordMutation,
  useLazyGetAllServicesQuery,
  useLazyGetSingleServiceQuery,
  useLazyGetBookingsQuery,
  useCreateBookingMutation,
  useLazyGetAllSubAdminsQuery,
  useCreateChatMutation,
  useSendMessageMutation,
  useCreateRatingMutation,
  useLazyGetRatingsQuery,
  useLazyGetAllTaxCategoriesQuery,
  useCalculateTaxMutation,
} = mainApis;
