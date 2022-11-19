import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URI } from './common';

const API = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: API_URI }),
  endpoints: () => ({}),
});

export default API;
