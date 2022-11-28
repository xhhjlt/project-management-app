import { Container, Typography, Box, TextField, Button } from '@mui/material';
import { useAppSelector } from 'app/hooks';
import { currentLanguage } from 'components/header/langSlice';
import { CurrentUserId, isUserLoggedIn } from 'components/signForms/authSlice';
import { useForm, SubmitHandler } from 'react-hook-form';
import {
  useAllBoardsQuery,
  useCreateBoardMutation,
  useDeleteBoardMutation,
} from 'services/api/boards';

interface DemoFormData {
  title: string;
}

export function RqtDemo() {
  const language = useAppSelector(currentLanguage);
  const userId = useAppSelector(CurrentUserId);
  const loggedIn = useAppSelector(isUserLoggedIn);
  const { data, isLoading } = useAllBoardsQuery(undefined, { pollingInterval: 3000 });
  const [deleteBoard] = useDeleteBoardMutation();
  const [createBoard, { isLoading: isCreating }] = useCreateBoardMutation();
  const { register, handleSubmit } = useForm<DemoFormData>();

  const onSubmit: SubmitHandler<DemoFormData> = async ({ title }) => {
    const board = {
      title,
      owner: userId || '',
      users: [],
      description: '',
    };
    await createBoard(board);
  };

  return (
    <Container component="main">
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <TextField
          margin="normal"
          fullWidth
          {...register('title')}
          label={language === 'EN' ? 'Title: ' : 'Название: '}
          type="text"
          autoFocus
        />
        <Typography>
          {language === 'EN' ? 'Owner: ' : 'Вледелец: '}
          {loggedIn ? userId : '???'}
        </Typography>

        <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
          {isCreating
            ? language === 'EN'
              ? 'Loading...'
              : 'Загрузка...'
            : language === 'EN'
            ? 'Create board'
            : 'Создать доску'}
        </Button>
      </Box>
      <Box>
        {isLoading
          ? '...'
          : data?.map((board) => (
              <Typography
                key={board._id}
                variant="h5"
                onClick={() => deleteBoard(board._id)}
                sx={{ cursor: 'pointer' }}
              >
                {`${board.title} : ${board.owner}`}
              </Typography>
            ))}
      </Box>
    </Container>
  );
}
