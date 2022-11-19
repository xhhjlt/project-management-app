import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URI } from './common';

export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_URI }),
  endpoints: (builder) => ({
    getPokemonByName: builder.query<Record<string, string>, string>({
      query: (name) => `pokemon/${name}`,
    }),
  }),
});
