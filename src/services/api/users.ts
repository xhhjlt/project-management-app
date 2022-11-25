import { SignUpArg, User } from 'types/api/user';
import API from '.';

export const usersApi = API.injectEndpoints({
  endpoints: (builder) => ({
    allUsers: builder.query<Array<User>, void>({
      query: () => ({
        url: `users`,
      }),
      providesTags: ['user'],
    }),
    userById: builder.query<User, string>({
      query: (userId) => ({
        url: `users/${userId}`,
      }),
      providesTags: ['user'],
    }),
    updateUser: builder.mutation<User, User & SignUpArg>({
      query: ({ _id, ...body }) => ({
        url: `users/${_id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['user'],
    }),
    deleteUser: builder.mutation<User, string>({
      query: (userId) => ({
        url: `users/${userId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['user'],
    }),
  }),
});

export const { useAllUsersQuery, useUserByIdQuery, useUpdateUserMutation, useDeleteUserMutation } =
  usersApi;
