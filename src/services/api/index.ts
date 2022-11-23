import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URI } from './common';

const API = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: API_URI,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['user', 'board', 'column', 'task', 'point', 'file'],
  endpoints: () => ({}),
});

export default API;
