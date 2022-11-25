import { FileInfo } from 'types/api/files';
import API from '.';

export const filesApi = API.injectEndpoints({
  endpoints: (builder) => ({
    filesByBoardId: builder.query<Array<FileInfo>, string>({
      query: (boardId) => ({
        url: `file/${boardId}`,
      }),
      providesTags: ['file'],
    }),
    filesByUserId: builder.query<Array<FileInfo>, string>({
      query: (userId) => ({
        url: `file`,
        params: {
          userId,
        },
      }),
      providesTags: ['file'],
    }),
    filesByTaskId: builder.query<Array<FileInfo>, string>({
      query: (taskId) => ({
        url: `file`,
        params: {
          taskId,
        },
      }),
      providesTags: ['file'],
    }),
    filesSet: builder.query<Array<FileInfo>, Array<string>>({
      query: (filesIds) => ({
        url: `file`,
        params: {
          ids: filesIds,
        },
      }),
      providesTags: ['file'],
    }),
    uploadFile: builder.mutation<FileInfo, FormData>({
      query: (body) => ({
        url: `file`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['file'],
    }),
    deleteFile: builder.mutation<FileInfo, string>({
      query: (fileId) => ({
        url: `file/${fileId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['file'],
    }),
  }),
});

export const {
  useFilesByBoardIdQuery,
  useFilesByTaskIdQuery,
  useFilesByUserIdQuery,
  useFilesSetQuery,
  useDeleteFileMutation,
  useUploadFileMutation,
} = filesApi;
