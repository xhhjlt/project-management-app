import { Point } from 'types/api/points';
import API from '.';

export const pointsApi = API.injectEndpoints({
  endpoints: (builder) => ({
    pointsByTaskId: builder.query<Array<Point>, string>({
      query: (taskId) => ({
        url: `points/${taskId}`,
      }),
    }),
    pointsByUserId: builder.query<Array<Point>, string>({
      query: (userId) => ({
        url: `points`,
        params: {
          userId,
        },
      }),
    }),
    pointsSet: builder.query<Array<Point>, Array<string>>({
      query: (pointIds) => ({
        url: `points`,
        params: {
          ids: pointIds,
        },
      }),
    }),
    pointsSetUpdate: builder.mutation<Array<Point>, Array<Pick<Point, '_id' | 'done'>>>({
      query: (body) => ({
        url: `points`,
        method: 'PATCH',
        body,
      }),
    }),
    createPoint: builder.mutation<Point, Omit<Point, '_id'>>({
      query: (body) => ({
        url: `points`,
        method: 'POST',
        body,
      }),
    }),
    updatePoint: builder.mutation<Point, Omit<Point, 'taskId' | 'boardId'>>({
      query: ({ _id, ...body }) => ({
        url: `points/${_id}`,
        method: 'PATCH',
        body,
      }),
    }),
    deletePoint: builder.mutation<Point, string>({
      query: (pointId) => ({
        url: `points/${pointId}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  usePointsByTaskIdQuery,
  usePointsByUserIdQuery,
  usePointsSetQuery,
  usePointsSetUpdateMutation,
  useCreatePointMutation,
  useUpdatePointMutation,
  useDeletePointMutation,
} = pointsApi;
