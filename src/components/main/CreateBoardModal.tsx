import {
  Backdrop,
  Box,
  Button,
  Fade,
  FormControl,
  Modal,
  Stack,
  TextField,
  Typography,
  IconButton,
} from '@mui/material';
import { useCallback, useEffect } from 'react';
import { Form } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import { closeCreateBoardModal, selectCreateBoardModalOpen } from './mainSlice';
import { currentLanguage } from 'components/header/langSlice';
import { CurrentUserId, isUserLoggedIn } from 'components/signForms/authSlice';
import { useCreateBoardMutation } from 'services/api/boards';

const style = {
  boxSizing: 'content-box',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 330,
  bgcolor: 'background.paper',
  borderRadius: '4px',
  p: 4,
  color: '#212121',
  display: 'flex',
  flexDirection: 'column',
  gap: 3,
};

export type FormBoardType = {
  title: string;
  description?: string;
};

export const CreateBoardModal = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm<FormBoardType>();
  const createBoardModalOpen = useAppSelector(selectCreateBoardModalOpen);
  const language = useAppSelector(currentLanguage);
  const userId = useAppSelector(CurrentUserId);
  const loggedIn = useAppSelector(isUserLoggedIn);
  const [createBoard, { isLoading: isCreating }] = useCreateBoardMutation();
  const dispatch = useAppDispatch();

  const handleClose = useCallback(() => {
    dispatch(closeCreateBoardModal());
    reset();
  }, [dispatch, reset]);

  useEffect(() => {
    handleClose();
  }, [handleClose, isSubmitSuccessful, reset]);

  const onSubmit: SubmitHandler<FormBoardType> = async (data) => {
    const board = {
      title: data.title,
      owner: userId || '',
      users: [],
      description: data.description,
    };
    await createBoard(board);
  };

  return (
    <div>
      <Modal
        open={createBoardModalOpen}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={createBoardModalOpen}>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Box sx={style}>
              <IconButton
                sx={{ p: 0, position: 'absolute', right: '1rem', top: '1rem' }}
                onClick={handleClose}
              >
                <ClearOutlinedIcon
                  sx={{
                    color: '#616161',
                    width: 20,
                  }}
                />
              </IconButton>
              <Typography variant="h6" component="h2" sx={{ textAlign: 'center' }}>
                {language === 'EN' ? 'CREATE NEW BOARD' : 'СОЗДАТЬ НОВУЮ ДОСКУ'}
              </Typography>
              <Stack spacing={2}>
                <FormControl>
                  <TextField
                    label={language === 'EN' ? 'Enter board title' : 'Введите название доски'}
                    defaultValue=""
                    variant="outlined"
                    sx={{ width: '100%' }}
                    autoComplete="off"
                    {...register('title', { required: true })}
                    error={errors.title ? true : false}
                    helperText={
                      errors.title &&
                      (language === 'EN'
                        ? 'You should provide a title'
                        : 'Вам нужно ввести название')
                    }
                  />
                </FormControl>
                <TextField
                  label={language === 'EN' ? 'Enter board description' : 'Введите описание доски'}
                  defaultValue=""
                  variant="outlined"
                  sx={{ width: '100%' }}
                  autoComplete="off"
                  {...register('description')}
                  multiline
                  rows={5}
                />
              </Stack>
              <Stack direction="row" justifyContent="space-evenly">
                <Button
                  variant="contained"
                  color="neutral"
                  sx={{ width: '7rem' }}
                  onClick={handleClose}
                >
                  {language === 'EN' ? 'Cancel' : 'ОТМЕНА'}
                </Button>
                <Button variant="contained" component="label" sx={{ width: '7rem' }}>
                  {language === 'EN' ? 'CREATE' : 'СОЗДАТЬ'}
                  <input type="submit" hidden />
                </Button>
              </Stack>
            </Box>
          </Form>
        </Fade>
      </Modal>
    </div>
  );
};
