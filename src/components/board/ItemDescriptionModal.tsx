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
  useTheme,
} from '@mui/material';
import { useCallback, useEffect, useRef, useState } from 'react';
import { closeItemDescriptionModal, selectItemDescriptionModalOpen } from './boardSlice';
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
import { Form, useParams } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useDeleteTaskMutation, useTaskByIdQuery, useUpdateTaskMutation } from 'services/api/tasks';
import Task from 'types/api/tasks';
import { currentLanguage } from 'components/header/langSlice';
import { openDeleteConfirmationModal } from 'components/common/commonSlice';

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
  cursor: 'pointer',
  whiteSpace: 'pre-line',
  p: '8.5px',
  overflow: 'hidden',
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
  cursor: 'pointer',
  p: '8.5px',
  whiteSpace: 'pre-line',
};

export const ItemDescriptionModal = () => {
  const theme = useTheme();
  const itemDescriptionModalOpen = useAppSelector(selectItemDescriptionModalOpen);
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<Task>();
  const dispatch = useAppDispatch();
  const containerRef = useRef(null);
  const titleRef = useRef<HTMLDivElement | null>(null);
  const [titleIsEditing, setTitleIsEditing] = useState(false);
  const [descriptionIsEditing, setDescriprionIsEditing] = useState(false);
  const { id: boardId } = useParams();
  const { data: item } = useTaskByIdQuery(
    {
      _id: itemDescriptionModalOpen.itemId!,
      boardId: boardId!,
      columnId: itemDescriptionModalOpen.columnId!,
    },
    { skip: !(boardId && itemDescriptionModalOpen.columnId && itemDescriptionModalOpen.itemId) }
  );
  const [updateItem] = useUpdateTaskMutation();
  const language = useAppSelector(currentLanguage);
  const [deleteItem] = useDeleteTaskMutation();

  const title = watch('title');
  const description = watch('description');

  const getDescription = () => {
    if (description) {
      return description;
    }
    if (item!.description === 'No description provided...') {
      return (
        <span style={{ color: '#616161' }}>
          {language === 'EN' ? 'No description provided...' : 'Описание отсутствует...'}
        </span>
      );
    }
    if (item!.description && description === undefined) {
      return item!.description;
    }
    return (
      <span style={{ color: '#616161' }}>
        {language === 'EN' ? 'No description provided...' : 'Описание отсутствует...'}
      </span>
    );
  };

  const handleClose = useCallback(() => {
    dispatch(closeItemDescriptionModal());
    reset();
  }, [dispatch, reset]);

  useEffect(() => {
    if (itemDescriptionModalOpen.isOpen && item) {
      reset({
        title: item!.title,
      });
    }
  }, [itemDescriptionModalOpen.isOpen, item]);

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

  const onSubmit: SubmitHandler<Task> = (data) => {
    updateItem({
      _id: itemDescriptionModalOpen.itemId!,
      boardId: boardId!,
      columnId: itemDescriptionModalOpen.columnId!,
      title: data.title,
      description: data.description || 'No description provided...',
      priority: data.priority || '',
      size: data.size || '',
      order: item!.order,
      userId: '',
      users: [],
    });
    handleClose();
  };

  useEffect(() => {
    if (errors.title && !titleIsEditing) {
      setTitleIsEditing(true);
    }
  }, [errors.title, titleIsEditing]);

  return (
    <div>
      {item && (
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
          <Slide
            direction="up"
            in={itemDescriptionModalOpen.isOpen}
            container={containerRef.current}
          >
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Box
                sx={{
                  ...style,
                  color:
                    theme.palette.mode === 'dark'
                      ? theme.palette.grey[400]
                      : theme.palette.grey[900],
                }}
              >
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
                      {title ? title : item!.title}
                    </Typography>
                  )}
                  <TextField
                    style={{ display: titleIsEditing ? 'inline-block' : 'none' }}
                    defaultValue={title ? title : item!.title}
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
                          item!.description === 'No description provided...'
                            ? ''
                            : description !== undefined
                            ? description
                            : item!.description
                            ? item!.description
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
                          <InputLabel id="priority-select-label">
                            {language === 'EN' ? 'Priority' : 'Приоритет'}
                          </InputLabel>
                          <Select
                            labelId="priority-select-label"
                            id="priority-select"
                            defaultValue={item!.priority}
                            label="Priority"
                            {...register('priority')}
                          >
                            <MenuItem value="Urgent">
                              <Stack direction="row" spacing={1} alignItems="center">
                                <FcAlarmClock />
                                <Typography>
                                  {language === 'EN' ? 'Urgent' : 'Критичный'}
                                </Typography>
                              </Stack>
                            </MenuItem>
                            <MenuItem value="High">
                              <Stack direction="row" spacing={1} alignItems="center">
                                <FcVlc />
                                <Typography>{language === 'EN' ? 'High' : 'Высокий'}</Typography>
                              </Stack>
                            </MenuItem>
                            <MenuItem value="Medium">
                              <Stack direction="row" spacing={1} alignItems="center">
                                <FcNeutralTrading />
                                <Typography>{language === 'EN' ? 'Meddium' : 'Средний'}</Typography>
                              </Stack>
                            </MenuItem>
                            <MenuItem value="Low">
                              <Stack direction="row" spacing={1} alignItems="center">
                                <FcLowBattery />
                                <Typography>{language === 'EN' ? 'Low' : 'Низкий'}</Typography>
                              </Stack>
                            </MenuItem>
                            <MenuItem value="">
                              <em>{language === 'EN' ? 'None' : 'Не выбран'}</em>
                            </MenuItem>
                          </Select>
                        </FormControl>
                      </Box>
                      <Box sx={{ minWidth: 120 }}>
                        <FormControl size="small" fullWidth>
                          <InputLabel id="size-select-label">
                            {language === 'EN' ? 'Size' : 'Размер'}
                          </InputLabel>
                          <Select
                            labelId="size-select-label"
                            id="size-select"
                            defaultValue={item!.size}
                            label="Size"
                            {...register('size')}
                          >
                            <MenuItem value="Xlarge">
                              <Stack direction="row" spacing={1} alignItems="center">
                                <FcGlobe />
                                <Typography>
                                  {language === 'EN' ? 'Х-Large' : 'Огромная'}
                                </Typography>
                              </Stack>
                            </MenuItem>
                            <MenuItem value="Large">
                              <Stack direction="row" spacing={1} alignItems="center">
                                <FcLandscape />
                                <Typography>{language === 'EN' ? 'Large' : 'Большая'}</Typography>
                              </Stack>
                            </MenuItem>
                            <MenuItem value="Medium">
                              <Stack direction="row" spacing={1} alignItems="center">
                                <FcHome />
                                <Typography>{language === 'EN' ? 'Medium' : 'Средняя'}</Typography>
                              </Stack>
                            </MenuItem>
                            <MenuItem value="Small">
                              <Stack direction="row" spacing={1} alignItems="center">
                                <FcCloseUpMode />
                                <Typography>{language === 'EN' ? 'Small' : 'Маленькая'}</Typography>
                              </Stack>
                            </MenuItem>
                            <MenuItem value="">
                              <em>{language === 'EN' ? 'None' : 'Не выбран'}</em>
                            </MenuItem>
                          </Select>
                        </FormControl>
                      </Box>
                    </Stack>
                    <Stack spacing={2}>
                      <Button
                        variant="outlined"
                        color="error"
                        startIcon={<DeleteIcon />}
                        onClick={() => {
                          dispatch(
                            openDeleteConfirmationModal({
                              text: {
                                titleEn: 'item',
                                titleRus: 'задачу',
                                bodyEn: 'item from this board',
                                bodyRus: 'эту задачу с текущей доски',
                              },
                              onDelete: () =>
                                deleteItem({
                                  _id: item!._id,
                                  columnId: item!.columnId,
                                  boardId: boardId!,
                                }),
                            })
                          );
                        }}
                      >
                        {language === 'EN' ? 'Delete item' : 'Удалить'}
                      </Button>
                      <Button variant="contained" color="neutral" onClick={handleClose}>
                        {language === 'EN' ? 'Cancel' : 'Отмена'}
                      </Button>
                      <Button variant="contained" component="label">
                        {language === 'EN' ? 'Save' : 'Сохранить'}
                        <input type="submit" hidden />
                      </Button>
                    </Stack>
                  </Stack>
                </Stack>
              </Box>
            </Form>
          </Slide>
        </Modal>
      )}
    </div>
  );
};
