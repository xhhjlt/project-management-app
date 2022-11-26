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
  TextField,
} from '@mui/material';
import { useCallback, useEffect, useRef, useState } from 'react';
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
  pt: 2,
  pb: 2,
  color: '#212121',
};

const titleBlockStyles = {
  m: '0 40px 16px 24px',
  minHeight: '49px',
};

const titleStyles = {
  fontWeight: 600,
  color: '#212121',
  cursor: 'pointer',
  whiteSpace: 'pre-line',
  p: '8.5px',
};

const titleEditStyles = {
  '& .MuiInputBase-input': {
    fontWeight: 600,
    fontSize: '1.25rem',
    lineHeight: '1.6',
    letterSpacing: '0.0075em',
  },
};

const descriptionBoxStyles = {
  m: '16px 16px 8px 24px',
  width: '70%',
};

const descriptionStyles = {
  color: '#212121',
  cursor: 'pointer',
  p: '8.5px',
  whiteSpace: 'pre-line',
};

export const ItemDescriptionModal = () => {
  const itemDescriptionModalOpen = useAppSelector(selectItemDescriptionModalOpen);
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<ItemType>();
  const dispatch = useAppDispatch();
  const containerRef = useRef(null);
  const titleRef = useRef<HTMLDivElement | null>(null);
  const [titleIsEditing, setTitleIsEditing] = useState(false);
  const [descriptionIsEditing, setDescriprionIsEditing] = useState(false);

  const title = watch('title');
  const description = watch('description');

  const handleClose = useCallback(() => {
    dispatch(closeItemDescriptionModal());
    reset();
  }, [dispatch, reset]);

  useEffect(() => {
    if (itemDescriptionModalOpen.isOpen) {
      reset({
        title: itemDescriptionModalOpen.itemTitle!,
        description: itemDescriptionModalOpen.itemDescription || '',
      });
    }
  }, [itemDescriptionModalOpen.isOpen]);

  // creating title registration props, including it's default ref
  const titleFormProps = register('title', {
    required: true,
    onBlur: () => {
      setTitleIsEditing(false);
    },
  });

  // adding own ref to title input
  const customTitleRef = (ref: HTMLDivElement | null) => {
    // doing default react hook form ref registration
    titleFormProps.ref(ref);
    // doing our custom ref registration
    titleRef.current = ref;
  };

  // see if title editing state has been changed
  useEffect(() => {
    if (titleIsEditing) {
      const muiElement = titleRef!.current as {
        querySelector: (s: string) => { focus: () => void };
      };
      const input = muiElement.querySelector('textarea');
      input.focus();
    }
  }, [titleIsEditing]);

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
    handleClose();
  };

  const getDescription = () => {
    if (description) {
      return description;
    }
    if (itemDescriptionModalOpen.itemDescription && description === undefined) {
      return itemDescriptionModalOpen.itemDescription;
    }
    return <span style={{ color: '#616161' }}>No description provided..</span>;
  };

  useEffect(() => {
    if (errors.title && !titleIsEditing) {
      setTitleIsEditing(true);
    }
  }, [errors.title, titleIsEditing]);

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
              <Box sx={titleBlockStyles}>
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
                {!titleIsEditing && (
                  <Typography
                    variant="h6"
                    component="h2"
                    sx={titleStyles}
                    onClick={() => setTitleIsEditing(true)}
                  >
                    {title}
                  </Typography>
                )}
                <TextField
                  style={{ display: titleIsEditing ? 'inline-block' : 'none' }}
                  defaultValue={title}
                  variant="outlined"
                  sx={titleEditStyles}
                  autoComplete="off"
                  {...titleFormProps}
                  ref={customTitleRef}
                  error={errors.title ? true : false}
                  helperText={errors.title && 'You should provide a title'}
                  multiline
                  autoFocus
                  fullWidth
                  size="small"
                  onFocus={(e) => (e.target.selectionStart = e.target.value.length)}
                />
              </Box>
              <Divider />
              <Stack direction="row" sx={{ minHeight: '440px' }}>
                <Box sx={descriptionBoxStyles}>
                  {!descriptionIsEditing && (
                    <Typography
                      variant="body1"
                      sx={descriptionStyles}
                      onClick={() => setDescriprionIsEditing(true)}
                    >
                      {getDescription()}
                    </Typography>
                  )}
                  {descriptionIsEditing && (
                    <TextField
                      defaultValue={
                        description !== undefined
                          ? description
                          : itemDescriptionModalOpen.itemDescription
                          ? itemDescriptionModalOpen.itemDescription
                          : ''
                      }
                      variant="outlined"
                      autoComplete="off"
                      {...register('description')}
                      multiline
                      autoFocus
                      fullWidth
                      size="small"
                      onBlur={() => setDescriprionIsEditing(false)}
                      onFocus={(e) => (e.target.selectionStart = e.target.value.length)}
                    />
                  )}
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
