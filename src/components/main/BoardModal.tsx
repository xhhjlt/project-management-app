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
  useTheme,
} from '@mui/material';
import { useCallback, useEffect } from 'react';
import { Form, useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import { currentLanguage } from 'components/header/langSlice';
import { CurrentUserId } from 'components/signForms/authSlice';
import {
  useBoardByIdQuery,
  useCreateBoardMutation,
  useUpdateBoardMutation,
} from 'services/api/boards';
import { closeBoardModal, selectBoardModalOpen, selectBoardModalType } from './mainSlice';
import { AppRoutes } from 'types/routes';

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
  description: string;
};

export const BoardModal = ({ boardId = '' }) => {
  const theme = useTheme();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm<FormBoardType>();
  const navigate = useNavigate();
  const open = boardId === useAppSelector(selectBoardModalOpen);
  const modalType = useAppSelector(selectBoardModalType);
  const language = useAppSelector(currentLanguage);
  const userId = useAppSelector(CurrentUserId);
  const { data: boardData } = useBoardByIdQuery(boardId);
  const [createBoard] = useCreateBoardMutation();
  const [updateBoard] = useUpdateBoardMutation();
  const dispatch = useAppDispatch();
  const modalTitle = {
    create: {
      RU: 'СОЗДАТЬ НОВУЮ ДОСКУ',
      EN: 'CREATE NEW BOARD',
    },
    edit: {
      RU: 'РЕДАКТИРОВАТЬ ДОСКУ',
      EN: 'EDIT BOARD',
    },
    duplicate: {
      RU: 'ДУБЛИРОВАТЬ ДОСКУ',
      EN: 'DUPLICATE BOARD',
    },
  };

  const handleClose = useCallback(() => {
    dispatch(closeBoardModal());
    reset();
  }, [dispatch, reset]);

  useEffect(() => {
    handleClose();
  }, [handleClose, isSubmitSuccessful, reset]);

  const onSubmit: SubmitHandler<FormBoardType> = async (data) => {
    if (modalType === 'create') {
      const board = {
        title: data.title,
        owner: userId || '',
        users: [],
        description: data.description,
      };
      await createBoard(board);
      navigate(AppRoutes.Main);
    }
    if (modalType === 'edit') {
      const board = {
        _id: boardId,
        title: data.title,
        owner: boardData?.owner || userId || '',
        users: boardData?.users || [],
        description: data.description,
      };
      await updateBoard(board);
    }
    if (modalType === 'duplicate') {
      const board = {
        title: data.title,
        owner: userId || boardData?.owner || '',
        users: boardData?.users || [],
        description: data.description,
      };
      await createBoard(board);
    }
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Box
              sx={{
                ...style,
                color:
                  theme.palette.mode === 'dark' ? theme.palette.grey[400] : theme.palette.grey[900],
              }}
            >
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
                {modalTitle[modalType][language]}
              </Typography>
              <Stack spacing={2}>
                <FormControl>
                  <TextField
                    label={language === 'EN' ? 'Enter board title' : 'Введите название доски'}
                    defaultValue={boardData?.title}
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
                  defaultValue={boardData?.description}
                  variant="outlined"
                  sx={{ width: '100%' }}
                  autoComplete="off"
                  {...register('description', { required: true })}
                  error={errors.description ? true : false}
                  helperText={
                    errors.description &&
                    (language === 'EN'
                      ? 'You should provide a description'
                      : 'Вам нужно ввести описание')
                  }
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
                <Button
                  variant="contained"
                  component="label"
                  color="success"
                  sx={{ width: '7rem' }}
                >
                  {language === 'EN' ? 'OK' : 'ОК'}
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
