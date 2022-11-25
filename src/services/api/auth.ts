import { SignInArg, SignInResp, SignUpArg, User } from 'types/api/user';
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
    signUp: builder.mutation<User, SignUpArg>({
      query: (body) => ({
        url: `auth/signup`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['user'],
    }),
  }),
});

export const { useSignInMutation, useSignUpMutation } = authApi;
