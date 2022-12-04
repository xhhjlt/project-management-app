import { Backdrop, Box, Button, Fade, Modal, Stack, Typography, IconButton } from '@mui/material';
import { useCallback } from 'react';
import {
  closeDeleteItemModal,
  closeItemDescriptionModal,
  selectDeleteItemModalOpen,
} from './boardSlice';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import { useDeleteTaskMutation } from 'services/api/tasks';
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

export const DeleteItemModal = () => {
  const deleteItemModalOpen = useAppSelector(selectDeleteItemModalOpen);
  const dispatch = useAppDispatch();
  const [deleteItem] = useDeleteTaskMutation();
  const { id: boardId } = useParams();
  const language = useAppSelector(currentLanguage);

  const handleClose = useCallback(() => {
    dispatch(closeDeleteItemModal());
  }, [dispatch]);

  return (
    <div>
      <Modal
        open={deleteItemModalOpen.isOpen}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={deleteItemModalOpen.isOpen}>
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
              {language === 'EN' ? 'DELETE ITEM' : 'УДАЛИТЬ ЗАДАЧУ'}
            </Typography>
            <Typography>
              {language === 'EN'
                ? 'Are you sure you want to delete this item from this board?'
                : 'Вы уверенны, что хотите удалить эту задачу с текущей доски?'}
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
                  deleteItem({
                    _id: deleteItemModalOpen.itemId!,
                    columnId: deleteItemModalOpen.columnId!,
                    boardId: boardId!,
                  });
                  dispatch(handleClose);
                  dispatch(closeItemDescriptionModal());
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
