import { Board } from 'types/api/boards';
import API from '.';

export const boardsApi = API.injectEndpoints({
  endpoints: (builder) => ({
    allBoards: builder.query<Array<Board>, unknown>({
      query: () => ({
        url: `boards`,
      }),
    }),
    boardById: builder.query<Board, string>({
      query: (boardId) => ({
        url: `boards/${boardId}`,
      }),
    }),
    boardsSet: builder.query<Array<Board>, Array<string>>({
      query: (boardIds) => ({
        url: `boardsSet`,
        params: {
          ids: boardIds,
        },
      }),
    }),
    boardsSetByUserId: builder.query<Array<Board>, string>({
      query: (userId) => ({
        url: `boardsSet/${userId}`,
      }),
    }),
    createBoard: builder.mutation<Board, Omit<Board, '_id'>>({
      query: (body) => ({
        url: `boards`,
        method: 'POST',
        body,
      }),
    }),
    updateBoard: builder.mutation<Board, Board>({
      query: ({ _id, ...body }) => ({
        url: `boards/${_id}`,
        method: 'PUT',
        body,
      }),
    }),
    deleteBoard: builder.mutation<Board, string>({
      query: (boardId) => ({
        url: `boards/${boardId}`,
        method: 'DELETE',
      }),
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
