import { Backdrop, Box, Button, Fade, Modal, Stack, Typography, IconButton } from '@mui/material';
import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import { closeDeleteConfirmationModal, selectDeleteConfirmationModalOpen } from './commonSlice';
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

export type DeleteConfirmationModalParams = {
  text: {
    titleEn: string;
    titleRus: string;
    bodyEn: string;
    bodyRus: string;
  };
  onDelete: (id: string) => void;
  id: string;
};

export const DeleteConfirmationModal = ({ text, onDelete, id }: DeleteConfirmationModalParams) => {
  const deleteConfirmationModalOpen = id === useAppSelector(selectDeleteConfirmationModalOpen);
  const dispatch = useAppDispatch();
  const language = useAppSelector(currentLanguage);

  const handleClose = useCallback(() => {
    dispatch(closeDeleteConfirmationModal());
  }, [dispatch]);

  return (
    <div>
      <Modal
        open={deleteConfirmationModalOpen}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={deleteConfirmationModalOpen}>
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
              {language === 'EN' ? 'DELETE ' : 'УДАЛИТЬ '}
              {language === 'EN' ? text.titleEn.toUpperCase() : text.titleRus.toUpperCase()}
            </Typography>
            <Typography>
              {language === 'EN'
                ? 'Are you sure you want to delete this '
                : 'Вы уверенны, что хотите удалить '}
              {language === 'EN' ? text.bodyEn : text.bodyRus}?
            </Typography>
            <Stack direction="row" justifyContent="space-evenly">
              <Button variant="contained" sx={{ width: '7rem' }} onClick={handleClose} color="info">
                {language === 'EN' ? 'Cancel' : 'Отмена'}
              </Button>
              <Button
                variant="contained"
                color="error"
                sx={{ width: '7rem' }}
                onClick={() => {
                  onDelete(id);
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
