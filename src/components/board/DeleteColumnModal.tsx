import { Backdrop, Box, Button, Fade, Modal, Stack, Typography, IconButton } from '@mui/material';
import { useCallback } from 'react';
import { closeDeleteColumnModal, selectDeleteColumnModalOpen } from './boardSlice';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import { useDeleteColumnMutation } from 'services/api/columns';
import { useParams } from 'react-router-dom';
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

export const DeleteColumnModal = () => {
  const deleteColumnModalOpen = useAppSelector(selectDeleteColumnModalOpen);
  const dispatch = useAppDispatch();
  const [deleteColumn] = useDeleteColumnMutation();
  const { id: boardId } = useParams();
  const language = useAppSelector(currentLanguage);

  const handleClose = useCallback(() => {
    dispatch(closeDeleteColumnModal());
  }, [dispatch]);

  return (
    <div>
      <Modal
        open={deleteColumnModalOpen.isOpen}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={deleteColumnModalOpen.isOpen}>
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
              {language === 'EN' ? 'DELETE COLUMN' : 'УДАЛИТЬ КОЛОНКУ'}
            </Typography>
            <Typography>
              {language === 'EN'
                ? 'Are you sure you want to delete this column and all the tasks in it?'
                : 'Вы уверенны, что хотите удалить эту колонку и все задачи в ней?'}
            </Typography>
            <Stack direction="row" justifyContent="space-evenly">
              <Button
                variant="contained"
                color="neutral"
                sx={{ width: '7rem' }}
                onClick={handleClose}
              >
                {language === 'EN' ? 'Cancel' : 'Отмена'}
              </Button>
              <Button
                variant="contained"
                color="secondary"
                sx={{ width: '7rem' }}
                onClick={() => {
                  deleteColumn({ _id: deleteColumnModalOpen.columnId!, boardId: boardId! });
                  dispatch(handleClose);
                }}
              >
                {language === 'EN' ? 'Delete' : 'Удалить'}
              </Button>
            </Stack>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};
