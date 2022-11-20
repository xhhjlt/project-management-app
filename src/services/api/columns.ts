import { Column } from 'types/api/columns';
import API from '.';

export const columnsApi = API.injectEndpoints({
  endpoints: (builder) => ({
    allColumns: builder.query<Array<Column>, string>({
      query: (boardId) => ({
        url: `boards/${boardId}/columns`,
      }),
    }),
    columnById: builder.query<Column, Pick<Column, '_id' | 'boardId'>>({
      query: ({ _id, boardId }) => ({
        url: `boards/${boardId}/columns/${_id}`,
      }),
    }),
    columnsSet: builder.query<Array<Column>, Array<string>>({
      query: (columnIds) => ({
        url: `columnsSet`,
        params: {
          ids: columnIds,
        },
      }),
    }),
    columnsSetByUserId: builder.query<Array<Column>, string>({
      query: (userId) => ({
        url: `columnsSet`,
        params: {
          userId,
        },
      }),
    }),
    columnsSetUpdateOrder: builder.query<Array<Column>, Array<Pick<Column, '_id' | 'order'>>>({
      query: (body) => ({
        url: `columnsSet`,
        method: 'PATCH',
        body,
      }),
    }),
    columnsSetCreate: builder.query<Array<Column>, Array<Omit<Column, '_id'>>>({
      query: (body) => ({
        url: `columnsSet`,
        method: 'POST',
        body,
      }),
    }),
    createColumn: builder.mutation<Column, Omit<Column, '_id'>>({
      query: ({ boardId, ...body }) => ({
        url: `boards/${boardId}/columns`,
        method: 'POST',
        body,
      }),
    }),
    updateColumn: builder.mutation<Column, Column>({
      query: ({ _id, boardId, ...body }) => ({
        url: `boards/${boardId}/columns/${_id}`,
        method: 'PUT',
        body,
      }),
    }),
    deleteColumn: builder.mutation<Column, Pick<Column, '_id' | 'boardId'>>({
      query: ({ _id, boardId }) => ({
        url: `boards/${boardId}/columns/${_id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useAllColumnsQuery,
  useColumnByIdQuery,
  useCreateColumnMutation,
  useDeleteColumnMutation,
  useUpdateColumnMutation,
  useColumnsSetByUserIdQuery,
  useColumnsSetCreateQuery,
  useColumnsSetQuery,
  useColumnsSetUpdateOrderQuery,
} = columnsApi;
