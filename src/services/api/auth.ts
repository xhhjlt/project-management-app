import { signInArg, signInResp, signUpArg, signUpResp } from 'types/api/auth';
import API from '.';

export const authApi = API.injectEndpoints({
  endpoints: (builder) => ({
    signIn: builder.query<signInResp, signInArg>({
      query: (body) => ({
        url: `auth/signin`,
        body,
      }),
    }),
    signUp: builder.query<signUpResp, signUpArg>({
      query: (body) => ({
        url: `auth/signup`,
        body,
      }),
    }),
  }),
});

export const { useSignInQuery, useSignUpQuery } = authApi;
