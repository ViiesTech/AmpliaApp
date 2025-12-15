import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL, endpoints } from '../constant';
export const mainApis = createApi({
  reducerPath: 'mainApis',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().persistedData.token;
      console.log('state ===>', token);
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
    getFiles: builder.query({
      query: (year) => ({
        url: endpoints.GET_ALL_FILES(year),
        method: 'GET',
      }),
    }),
  }),
});
export const {
  useLazyGetFilesQuery,
  useLazyGetAllCategoriesQuery,
} = mainApis;
