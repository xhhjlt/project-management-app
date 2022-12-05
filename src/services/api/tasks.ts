import Task from 'types/api/tasks';
import API from '.';

export const tasksApi = API.injectEndpoints({
  endpoints: (builder) => ({
    allTasksInColumn: builder.query<Array<Task>, Pick<Task, 'boardId' | 'columnId'>>({
      query: ({ boardId, columnId }) => ({
        url: `boards/${boardId}/columns/${columnId}/tasks`,
      }),
      providesTags: ['task'],
    }),
    taskById: builder.query<Task, Pick<Task, '_id' | 'boardId' | 'columnId'>>({
      query: ({ _id, boardId, columnId }) => ({
        url: `boards/${boardId}/columns/${columnId}/tasks/${_id}`,
      }),
      providesTags: ['task'],
    }),
    tasksSet: builder.query<Array<Task>, Array<string>>({
      query: (taskIds) => ({
        url: `tasksSet`,
        params: {
          ids: taskIds,
        },
      }),
      providesTags: ['task'],
    }),
    tasksSetSearch: builder.query<Array<Task>, string>({
      query: (search) => ({
        url: `tasksSet`,
        params: {
          search,
        },
      }),
      providesTags: ['task'],
    }),
    tasksSetByUserId: builder.query<Array<Task>, string>({
      query: (userId) => ({
        url: `tasksSet`,
        params: {
          userId,
        },
      }),
      providesTags: ['task'],
    }),
    tasksSetByBoardId: builder.query<Array<Task>, string>({
      query: (boardId) => ({
        url: `tasksSet/${boardId}`,
      }),
      providesTags: ['task'],
    }),
    tasksSetUpdateOrder: builder.mutation<
      Array<Task>,
      Array<Pick<Task, '_id' | 'order' | 'columnId'>>
    >({
      query: (body) => ({
        url: `tasksSet`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['task'],
    }),
    createTask: builder.mutation<Task, Omit<Task, '_id'>>({
      query: ({ boardId, columnId, ...body }) => ({
        url: `boards/${boardId}/columns/${columnId}/tasks`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['task'],
    }),
    updateTask: builder.mutation<Task, Task>({
      query: ({ _id, boardId, ...body }) => ({
        url: `boards/${boardId}/columns/${body.columnId}/tasks/${_id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['task'],
    }),
    deleteTask: builder.mutation<Task, Pick<Task, '_id' | 'boardId' | 'columnId'>>({
      query: ({ _id, boardId, columnId }) => ({
        url: `boards/${boardId}/columns/${columnId}/tasks/${_id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['task'],
    }),
  }),
});

export const {
  useAllTasksInColumnQuery,
  useTaskByIdQuery,
  useTasksSetByBoardIdQuery,
  useTasksSetByUserIdQuery,
  useTasksSetQuery,
  useTasksSetSearchQuery,
  useTasksSetUpdateOrderMutation,
  useCreateTaskMutation,
  useDeleteTaskMutation,
  useUpdateTaskMutation,
} = tasksApi;
