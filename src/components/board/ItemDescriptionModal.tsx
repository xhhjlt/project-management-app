import {
  Backdrop,
  Box,
  Modal,
  Typography,
  IconButton,
  Slide,
  Divider,
  Stack,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Button,
} from '@mui/material';
import { useCallback, useRef } from 'react';
import {
  closeItemDescriptionModal,
  ItemPayloadType,
  ItemType,
  openDeleteItemModal,
  selectItemDescriptionModalOpen,
  setItem,
} from './boardSlice';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import {
  FcAlarmClock,
  FcVlc,
  FcNeutralTrading,
  FcCloseUpMode,
  FcGlobe,
  FcLandscape,
  FcHome,
  FcLowBattery,
} from 'react-icons/fc';
import DeleteIcon from '@mui/icons-material/Delete';
import { Form } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';

const PRIORITY: Record<string, string> = {
  URGENT: 'FcAlarmClock',
  HIGH: 'FcVlc',
  MEDIUM: 'FcNeutralTrading',
  LOW: 'FcLowBattery',
};

const SIZE: Record<string, string> = {
  LARGE: 'FcGlobe',
  MEDIUM: 'FcLandscape',
  SMALL: 'FcHome',
  TINY: 'FcCloseUpMode',
};

const style = {
  boxSizing: 'border-box',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  minHeight: 500,
  bgcolor: 'background.paper',
  borderRadius: '4px',
  pt: 4,
  pb: 2,
  color: '#212121',
};

const titleStyles = {
  fontWeight: 600,
  border: `1px solid transparent`,
  color: '#212121',
  cursor: 'pointer',
  m: '0 40px 16px 24px',
  p: '0.5rem',
  '&:focus': {
    outline: `1px solid transparent`,
    border: `1px solid #f5f5f5`,
    borderRadius: '4px',
    backgroundColor: '#f9fbe7',
  },
};

const descriptionBoxStyles = {
  m: '16px 16px 8px 24px',
  width: '70%',
};

const descriptionStyles = {
  border: `1px solid transparent`,
  fontWeight: 600,
  color: '#212121',
  cursor: 'pointer',
  p: '0.5rem',
  '&:focus': {
    outline: `1px solid transparent`,
    border: `1px solid #f5f5f5`,
    backgroundColor: '#f9fbe7',
    borderRadius: '4px',
  },
};

export const ItemDescriptionModal = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm<ItemType>();
  const itemDescriptionModalOpen = useAppSelector(selectItemDescriptionModalOpen);
  const dispatch = useAppDispatch();
  const containerRef = useRef(null);

  const handleClose = useCallback(() => {
    dispatch(closeItemDescriptionModal());
  }, [dispatch]);

  const onSubmit: SubmitHandler<ItemPayloadType> = (data) => {
    console.log(data);
    dispatch(
      setItem({
        title: data.title,
        description: data.description,
        priority: {
          value: data.priority as unknown as string,
          icon: PRIORITY[(data.priority as unknown as string).toUpperCase()],
        },
        size: {
          value: data.size as unknown as string,
          icon: SIZE[(data.size as unknown as string).toUpperCase()],
        },
      })
    );

    // dispatch(
    //   setItemPriority({
    //     value: data.priority as unknown as string,
    //     icon: PRIORITY[(data.priority as unknown as string).toUpperCase()],
    //   })
    // );
    // dispatch(
    //   setItemSize({
    //     value: data.size as unknown as string,
    //     icon: SIZE[(data.size as unknown as string).toUpperCase()],
    //   })
    // );
    handleClose();
  };

  return (
    <div>
      <Modal
        open={itemDescriptionModalOpen.isOpen}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        ref={containerRef}
      >
        <Slide direction="up" in={itemDescriptionModalOpen.isOpen} container={containerRef.current}>
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
              <Typography
                variant="h6"
                component="h2"
                sx={titleStyles}
                // contentEditable={true}
                // suppressContentEditableWarning={true}
                // {...register('title')}
              >
                {itemDescriptionModalOpen.itemTitle}
              </Typography>
              <Divider />
              <Stack direction="row" sx={{ minHeight: '440px' }}>
                <Box sx={descriptionBoxStyles}>
                  <Typography
                    variant="body1"
                    sx={descriptionStyles}
                    // contentEditable={true}
                    // suppressContentEditableWarning={true}
                    // {...register('description')}
                  >
                    {itemDescriptionModalOpen.itemDescription ? (
                      itemDescriptionModalOpen.itemDescription
                    ) : (
                      <span style={{ color: '#616161' }}>No description provided..</span>
                    )}
                  </Typography>
                </Box>
                <Divider orientation="vertical" flexItem />
                <Stack
                  justifyContent={'space-between'}
                  sx={{ width: '30%', pl: 2, pr: 4, pt: 3, pb: 2 }}
                >
                  <Stack spacing={3}>
                    <Box sx={{ minWidth: 120 }}>
                      <FormControl size="small" fullWidth>
                        <InputLabel id="priority-select-label">Priority</InputLabel>
                        <Select
                          labelId="priority-select-label"
                          id="priority-select"
                          defaultValue={itemDescriptionModalOpen.itemPriority?.value}
                          label="Priority"
                          {...register('priority')}
                        >
                          <MenuItem value="Urgent">
                            <Stack direction="row" spacing={1} alignItems="center">
                              <FcAlarmClock />
                              <Typography>Urgent</Typography>
                            </Stack>
                          </MenuItem>
                          <MenuItem value="High">
                            <Stack direction="row" spacing={1} alignItems="center">
                              <FcVlc />
                              <Typography>High</Typography>
                            </Stack>
                          </MenuItem>
                          <MenuItem value="Medium">
                            <Stack direction="row" spacing={1} alignItems="center">
                              <FcNeutralTrading />
                              <Typography>Meddium</Typography>
                            </Stack>
                          </MenuItem>
                          <MenuItem value="Low">
                            <Stack direction="row" spacing={1} alignItems="center">
                              <FcLowBattery />
                              <Typography>Low</Typography>
                            </Stack>
                          </MenuItem>
                          <MenuItem value="">
                            <em>None</em>
                          </MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                    <Box sx={{ minWidth: 120 }}>
                      <FormControl size="small" fullWidth>
                        <InputLabel id="size-select-label">Size</InputLabel>
                        <Select
                          labelId="size-select-label"
                          id="size-select"
                          defaultValue={itemDescriptionModalOpen.itemSize?.value}
                          label="Size"
                          {...register('size')}
                        >
                          <MenuItem value="Large">
                            <Stack direction="row" spacing={1} alignItems="center">
                              <FcGlobe />
                              <Typography>Large</Typography>
                            </Stack>
                          </MenuItem>
                          <MenuItem value="Medium">
                            <Stack direction="row" spacing={1} alignItems="center">
                              <FcLandscape />
                              <Typography>Medium</Typography>
                            </Stack>
                          </MenuItem>
                          <MenuItem value="Small">
                            <Stack direction="row" spacing={1} alignItems="center">
                              <FcHome />
                              <Typography>Small</Typography>
                            </Stack>
                          </MenuItem>
                          <MenuItem value="Tiny">
                            <Stack direction="row" spacing={1} alignItems="center">
                              <FcCloseUpMode />
                              <Typography>Tiny</Typography>
                            </Stack>
                          </MenuItem>
                          <MenuItem value="">
                            <em>None</em>
                          </MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </Stack>
                  <Stack spacing={2}>
                    <Button
                      variant="outlined"
                      color="secondary"
                      startIcon={<DeleteIcon />}
                      onClick={() => {
                        dispatch(openDeleteItemModal(itemDescriptionModalOpen.itemId!));
                      }}
                    >
                      Delete item
                    </Button>
                    <Button variant="contained" color="neutral" onClick={handleClose}>
                      Cancel
                    </Button>
                    <Button variant="contained" component="label">
                      Save
                      <input type="submit" hidden />
                    </Button>
                  </Stack>
                </Stack>
              </Stack>
            </Box>
          </Form>
        </Slide>
      </Modal>
    </div>
  );
};
