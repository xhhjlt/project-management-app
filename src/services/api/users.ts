import { SignUpArg, User } from 'types/api/user';
import API from '.';

export const usersApi = API.injectEndpoints({
  endpoints: (builder) => ({
    allUsers: builder.query<Array<User>, unknown>({
      query: () => ({
        url: `users`,
      }),
    }),
    userById: builder.query<User, string>({
      query: (userID) => ({
        url: `users/${userID}`,
      }),
    }),
    updateUser: builder.mutation<User, User & SignUpArg>({
      query: ({ _id, ...body }) => ({
        url: `users/${_id}`,
        method: 'PUT',
        body,
      }),
    }),
    deleteUser: builder.mutation<User, string>({
      query: (userID) => ({
        url: `users/${userID}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const { useAllUsersQuery, useUserByIdQuery, useUpdateUserMutation, useDeleteUserMutation } =
  usersApi;
