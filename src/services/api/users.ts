import { User, UsersArg } from 'types/api/user';
import API from '.';

export const usersApi = API.injectEndpoints({
  endpoints: (builder) => ({
    allUsers: builder.query<Array<User>, unknown>({
      query: () => ({
        url: `users`,
      }),
    }),
    userById: builder.query<User, UsersArg>({
      query: ({ id }) => ({
        url: `users/${id}`,
      }),
    }),
    updateUser: builder.query<User, UsersArg>({
      query: ({ id }) => ({
        url: `users/${id}`,
        method: 'PUT',
      }),
    }),
    deleteUser: builder.query<User, UsersArg>({
      query: ({ id }) => ({
        url: `users/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const { useAllUsersQuery, useUserByIdQuery, useUpdateUserQuery, useDeleteUserQuery } =
  usersApi;
