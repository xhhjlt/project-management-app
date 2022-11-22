import { Board } from 'types/api/boards';
import API from '.';

export const boardsApi = API.injectEndpoints({
  endpoints: (builder) => ({
    allBoards: builder.query<Array<Board>, undefined>({
      query: () => ({
        url: `boards`,
      }),
      providesTags: ['board'],
    }),
    boardById: builder.query<Board, string>({
      query: (boardId) => ({
        url: `boards/${boardId}`,
      }),
      providesTags: ['board'],
    }),
    boardsSet: builder.query<Array<Board>, Array<string>>({
      query: (boardIds) => ({
        url: `boardsSet`,
        params: {
          ids: boardIds,
        },
      }),
      providesTags: ['board'],
    }),
    boardsSetByUserId: builder.query<Array<Board>, string>({
      query: (userId) => ({
        url: `boardsSet/${userId}`,
      }),
      providesTags: ['board'],
    }),
    createBoard: builder.mutation<Board, Omit<Board, '_id'>>({
      query: (body) => ({
        url: `boards`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['board'],
    }),
    updateBoard: builder.mutation<Board, Board>({
      query: ({ _id, ...body }) => ({
        url: `boards/${_id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['board'],
    }),
    deleteBoard: builder.mutation<Board, string>({
      query: (boardId) => ({
        url: `boards/${boardId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['board'],
    }),
  }),
});

export const {
  useAllBoardsQuery,
  useBoardByIdQuery,
  useBoardsSetQuery,
  useBoardsSetByUserIdQuery,
  useCreateBoardMutation,
  useUpdateBoardMutation,
  useDeleteBoardMutation,
} = boardsApi;
