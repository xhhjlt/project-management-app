import { FileInfo } from 'types/api/files';
import API from '.';

export const filesApi = API.injectEndpoints({
  endpoints: (builder) => ({
    filesByBoardId: builder.query<Array<FileInfo>, string>({
      query: (boardId) => ({
        url: `file/${boardId}`,
      }),
    }),
    filesByUserId: builder.query<Array<FileInfo>, string>({
      query: (userId) => ({
        url: `file`,
        params: {
          userId,
        },
      }),
    }),
    filesByTaskId: builder.query<Array<FileInfo>, string>({
      query: (taskId) => ({
        url: `file`,
        params: {
          taskId,
        },
      }),
    }),
    filesSet: builder.query<Array<FileInfo>, Array<string>>({
      query: (filesIds) => ({
        url: `file`,
        params: {
          ids: filesIds,
        },
      }),
    }),
    uploadFile: builder.mutation<FileInfo, FormData>({
      query: (body) => ({
        url: `file`,
        method: 'POST',
        body,
      }),
    }),
    deleteFile: builder.mutation<FileInfo, string>({
      query: (fileId) => ({
        url: `file/${fileId}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {} = filesApi;
