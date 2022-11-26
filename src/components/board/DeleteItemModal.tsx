import { Backdrop, Box, Button, Fade, Modal, Stack, Typography, IconButton } from '@mui/material';
import { useCallback } from 'react';
import {
  closeDeleteItemModal,
  closeItemDescriptionModal,
  deleteBoardItem,
  selectDeleteItemModalOpen,
} from './boardSlice';
import { useAppDispatch, useAppSelector } from 'app/hooks';
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

export const DeleteItemModal = () => {
  const deleteItemModalOpen = useAppSelector(selectDeleteItemModalOpen);
  const dispatch = useAppDispatch();

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
              DELETE ITEM?
            </Typography>
            <Typography>Are you sure you want to delete this item from this board?</Typography>
            <Stack direction="row" justifyContent="space-evenly">
              <Button
                variant="contained"
                color="neutral"
                sx={{ width: '7rem' }}
                onClick={handleClose}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                color="secondary"
                sx={{ width: '7rem' }}
                onClick={() => {
                  dispatch(deleteBoardItem());
                  dispatch(handleClose);
                  dispatch(closeItemDescriptionModal());
                }}
              >
                Delete
              </Button>
            </Stack>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};
