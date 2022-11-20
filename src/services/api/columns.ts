import { Column } from 'types/api/columns';
import API from '.';

export const columnsApi = API.injectEndpoints({
  endpoints: (builder) => ({
    allColumnsInBoard: builder.query<Array<Column>, string>({
      query: (boardId) => ({
        url: `boards/${boardId}/columns`,
      }),
      providesTags: ['column'],
    }),
    columnById: builder.query<Column, Pick<Column, '_id' | 'boardId'>>({
      query: ({ _id, boardId }) => ({
        url: `boards/${boardId}/columns/${_id}`,
      }),
      providesTags: ['column'],
    }),
    columnsSet: builder.query<Array<Column>, Array<string>>({
      query: (columnIds) => ({
        url: `columnsSet`,
        params: {
          ids: columnIds,
        },
      }),
      providesTags: ['column'],
    }),
    columnsSetByUserId: builder.query<Array<Column>, string>({
      query: (userId) => ({
        url: `columnsSet`,
        params: {
          userId,
        },
      }),
      providesTags: ['column'],
    }),
    columnsSetUpdateOrder: builder.mutation<Array<Column>, Array<Pick<Column, '_id' | 'order'>>>({
      query: (body) => ({
        url: `columnsSet`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['column'],
    }),
    columnsSetCreate: builder.mutation<Array<Column>, Array<Omit<Column, '_id'>>>({
      query: (body) => ({
        url: `columnsSet`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['column'],
    }),
    createColumn: builder.mutation<Column, Omit<Column, '_id'>>({
      query: ({ boardId, ...body }) => ({
        url: `boards/${boardId}/columns`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['column'],
    }),
    updateColumn: builder.mutation<Column, Column>({
      query: ({ _id, boardId, ...body }) => ({
        url: `boards/${boardId}/columns/${_id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['column'],
    }),
    deleteColumn: builder.mutation<Column, Pick<Column, '_id' | 'boardId'>>({
      query: ({ _id, boardId }) => ({
        url: `boards/${boardId}/columns/${_id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['column'],
    }),
  }),
});

export const {
  useAllColumnsInBoardQuery,
  useColumnByIdQuery,
  useCreateColumnMutation,
  useDeleteColumnMutation,
  useUpdateColumnMutation,
  useColumnsSetByUserIdQuery,
  useColumnsSetCreateMutation,
  useColumnsSetQuery,
  useColumnsSetUpdateOrderMutation,
} = columnsApi;
