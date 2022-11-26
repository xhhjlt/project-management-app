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
import { addBoardColumn, closeColumnModal, ColumnType, selectColumnModalOpen } from './boardSlice';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { v4 as uuid } from 'uuid';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';

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
  } = useForm<ColumnType>();
  const columnModalOpen = useAppSelector(selectColumnModalOpen);
  const dispatch = useAppDispatch();

  const handleClose = useCallback(() => {
    dispatch(closeColumnModal());
    reset();
  }, [dispatch, reset]);

  useEffect(() => {
    handleClose();
  }, [handleClose, isSubmitSuccessful, reset]);

  const onSubmit: SubmitHandler<ColumnType> = (data) => {
    const small_id = uuid().slice(0, 8);
    data.id = small_id;
    data.items = [];
    dispatch(addBoardColumn(data));
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
                ADD COLUMN
              </Typography>
              <FormControl>
                <TextField
                  label="Enter column title"
                  defaultValue=""
                  variant="outlined"
                  sx={{ width: '100%' }}
                  autoComplete="off"
                  {...register('title', { required: true })}
                  error={errors.title ? true : false}
                  helperText={errors.title && 'You should provide column title'}
                />
              </FormControl>
              <Stack direction="row" justifyContent="space-evenly">
                <Button
                  variant="contained"
                  color="neutral"
                  sx={{ width: '7rem' }}
                  onClick={handleClose}
                >
                  Cancel
                </Button>
                <Button variant="contained" component="label" sx={{ width: '7rem' }}>
                  Add
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
