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
import { Form, useParams } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { closeColumnModal, selectColumnModalOpen } from './boardSlice';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import { Column } from 'types/api/columns';
import { useCreateColumnMutation } from 'services/api/columns';
import { currentLanguage } from 'components/header/langSlice';

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

export const ColumnModal = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm<Column>();
  const columnModalOpen = useAppSelector(selectColumnModalOpen);
  const dispatch = useAppDispatch();
  const [createColumn] = useCreateColumnMutation();
  const { id: boardId } = useParams();
  const language = useAppSelector(currentLanguage);

  const handleClose = useCallback(() => {
    dispatch(closeColumnModal());
    reset();
  }, [dispatch, reset]);

  useEffect(() => {
    handleClose();
  }, [handleClose, isSubmitSuccessful, reset]);

  const onSubmit: SubmitHandler<Column> = (data) => {
    createColumn({
      boardId: boardId!,
      title: data.title,
      order: 0,
    });
  };

  return (
    <div>
      <Modal
        open={columnModalOpen}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={columnModalOpen}>
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
                {language === 'EN' ? 'ADD COLUMN' : 'ДОБАВИТЬ КОЛОНКУ'}
              </Typography>
              <FormControl>
                <TextField
                  label={language === 'EN' ? 'Enter column title' : 'Введите название колонки'}
                  defaultValue=""
                  variant="outlined"
                  sx={{ width: '100%' }}
                  autoComplete="off"
                  {...register('title', { required: true })}
                  error={errors.title ? true : false}
                  helperText={
                    errors.title &&
                    (language === 'EN'
                      ? 'You should provide column title'
                      : 'Вам нужно ввести название колонки')
                  }
                />
              </FormControl>
              <Stack direction="row" justifyContent="space-evenly">
                <Button
                  variant="contained"
                  color="neutral"
                  sx={{ width: '7rem' }}
                  onClick={handleClose}
                >
                  {language === 'EN' ? 'Cancel' : 'Отмена'}
                </Button>
                <Button variant="contained" component="label" sx={{ width: '7rem' }}>
                  {language === 'EN' ? 'Add' : 'Добавить'}
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
