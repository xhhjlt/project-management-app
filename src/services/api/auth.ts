import { SignInArg, SignInResp, signUpArg, User } from 'types/api/user';
import API from '.';

export const authApi = API.injectEndpoints({
  endpoints: (builder) => ({
    signIn: builder.mutation<SignInResp, SignInArg>({
      query: (body) => ({
        url: `auth/signin`,
        method: 'POST',
        body,
      }),
    }),
    signUp: builder.query<User, signUpArg>({
      query: (body) => ({
        url: `auth/signup`,
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useSignInMutation, useSignUpQuery } = authApi;
