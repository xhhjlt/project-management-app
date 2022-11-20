import { Point } from 'types/api/points';
import API from '.';

export const pointsApi = API.injectEndpoints({
  endpoints: (builder) => ({
    pointsByTaskId: builder.query<Array<Point>, string>({
      query: (taskId) => ({
        url: `points/${taskId}`,
      }),
      providesTags: ['point'],
    }),
    pointsByUserId: builder.query<Array<Point>, string>({
      query: (userId) => ({
        url: `points`,
        params: {
          userId,
        },
      }),
      providesTags: ['point'],
    }),
    pointsSet: builder.query<Array<Point>, Array<string>>({
      query: (pointsIds) => ({
        url: `points`,
        params: {
          ids: pointsIds,
        },
      }),
      providesTags: ['point'],
    }),
    pointsSetUpdate: builder.mutation<Array<Point>, Array<Pick<Point, '_id' | 'done'>>>({
      query: (body) => ({
        url: `points`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['point'],
    }),
    createPoint: builder.mutation<Point, Omit<Point, '_id'>>({
      query: (body) => ({
        url: `points`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['point'],
    }),
    updatePoint: builder.mutation<Point, Omit<Point, 'taskId' | 'boardId'>>({
      query: ({ _id, ...body }) => ({
        url: `points/${_id}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['point'],
    }),
    deletePoint: builder.mutation<Point, string>({
      query: (pointId) => ({
        url: `points/${pointId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['point'],
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
