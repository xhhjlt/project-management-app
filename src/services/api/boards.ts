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
      query: (boardID) => ({
        url: `boards/${boardID}`,
      }),
    }),
    boardsSet: builder.query<Array<Board>, Array<string>>({
      query: (boardIDs) => ({
        url: `boardsSet`,
        params: {
          ids: boardIDs,
        },
      }),
    }),
    boardsSetByUserId: builder.query<Array<Board>, string>({
      query: (userID) => ({
        url: `boardsSet/${userID}`,
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
      query: (boardID) => ({
        url: `boards/${boardID}`,
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
