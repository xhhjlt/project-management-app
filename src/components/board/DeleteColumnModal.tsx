import { Backdrop, Box, Button, Fade, Modal, Stack, Typography, IconButton } from '@mui/material';
import { useCallback } from 'react';
import {
  closeDeleteColumnModal,
  deleteBoardColumn,
  selectDeleteColumnModalOpen,
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

export const DeleteColumnModal = () => {
  const deleteColumnModalOpen = useAppSelector(selectDeleteColumnModalOpen);
  const dispatch = useAppDispatch();

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
              DELETE COLUMN?
            </Typography>
            <Typography>This will delete column and all the tasks in it.</Typography>
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
                  dispatch(deleteBoardColumn());
                  dispatch(handleClose);
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
