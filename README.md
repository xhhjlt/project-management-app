# Selectors

- `isUserLoggedIn` type: boolean
- `CurrentUserId` type: string
- `CurrentUserLogin` type: string
- `currentLanguage` type: 'EN' | 'RU'

# RTQ Query hooks

Query - запрос данных, Mutation - изменение данных

## Boards
  - `useAllBoardsQuery`
  - `useBoardByIdQuery`
  - `useBoardsSetQuery`
  - `useBoardsSetByUserIdQuery`
  - `useCreateBoardMutation`
  - `useUpdateBoardMutation`
  - `useDeleteBoardMutation`

## Columns
  - `useAllColumnsInBoardQuery`
  - `useColumnByIdQuery`
  - `useCreateColumnMutation`
  - `useDeleteColumnMutation`
  - `useUpdateColumnMutation`
  - `useColumnsSetByUserIdQuery`
  - `useColumnsSetCreateMutation`
  - `useColumnsSetQuery`
  - `useColumnsSetUpdateOrderMutation`

## Tasks
  - `useAllTasksInColumnQuery`
  - `useTaskByIdQuery`
  - `useTasksSetByBoardIdQuery`
  - `useTasksSetByUserIdQuery`
  - `useTasksSetQuery`
  - `useTasksSetSearchQuery`
  - `useTasksSetUpdateOrderMutation`
  - `useCreateTaskMutation`
  - `useDeleteTaskMutation`
  - `useUpdateTaskMutation`

## Points
  - `usePointsByTaskIdQuery`
  - `usePointsByUserIdQuery`
  - `usePointsSetQuery`
  - `usePointsSetUpdateMutation`
  - `useCreatePointMutation`
  - `useUpdatePointMutation`
  - `useDeletePointMutation`

## Files
  - `useFilesByBoardIdQuery`
  - `useFilesByTaskIdQuery`
  - `useFilesByUserIdQuery`
  - `useFilesSetQuery`
  - `useDeleteFileMutation`
  - `useUploadFileMutation`

## Users
  - `useAllUsersQuery`
  - `useUserByIdQuery`
  - `useUpdateUserMutation`
  - `useDeleteUserMutation`
  
## Auth 
  - `useSignInMutation`
  - `useSignUpMutation`

