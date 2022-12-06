import { Button, Divider, IconButton, Paper, Stack, Badge, useTheme } from '@mui/material';
import { openItemModal } from './boardSlice';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { Item } from './Item';
import { ColumnTitle } from './ColumnTitle';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { useDeleteColumnMutation, useUpdateColumnMutation } from 'services/api/columns';
import { ColumnWithTasks } from './TasksGrid';
import { currentLanguage } from 'components/header/langSlice';
import { openDeleteConfirmationModal } from 'components/common/commonSlice';

const paperStyles = {
  boxSizing: 'border-box',
  width: 340,
  p: '12px',
  display: 'flex',
  flexDirection: 'column',
  minHeight: '200px',
};

export const BoardColumn = ({ _id, title, order, boardId, tasks }: ColumnWithTasks) => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const [updateColumn] = useUpdateColumnMutation();
  const language = useAppSelector(currentLanguage);
  const [deleteColumn] = useDeleteColumnMutation();

  const handleDelete = () => {
    dispatch(
      openDeleteConfirmationModal({
        text: {
          titleEn: 'column',
          titleRus: 'колонку',
          bodyEn: 'column and all the tasks in it',
          bodyRus: 'эту колонку и все задачи в ней',
        },
        onDelete: () => deleteColumn({ _id, boardId }),
      })
    );
  };

  return (
    <Draggable draggableId={_id} index={order}>
      {(provided) => (
        <Paper
          elevation={10}
          sx={{
            ...paperStyles,
            backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[900] : '#fffff7', //'#fffde7', //'#f9fbe7',
          }}
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          <Stack
            direction="row"
            justifyContent={'space-between'}
            sx={{ p: 1, mb: 1 }}
            {...provided.dragHandleProps}
          >
            <Stack direction="row" spacing={3}>
              <ColumnTitle
                value={title}
                onChange={(newTitle) =>
                  updateColumn({
                    _id: _id,
                    boardId,
                    title: newTitle!,
                    order,
                  })
                }
              />
              <Badge
                badgeContent={tasks?.length}
                color="primary"
                sx={{
                  top: 16,
                }}
              ></Badge>
            </Stack>
            <Stack>
              <IconButton sx={{ p: 0, ml: 2, pt: '4px' }} onClick={handleDelete}>
                <ClearOutlinedIcon
                  sx={{
                    color: '#616161',
                    width: 20,
                  }}
                />
              </IconButton>
            </Stack>
          </Stack>
          <Divider variant="middle" />
          <Droppable droppableId={_id} type="task">
            {(provided) => (
              <Stack
                gap={1}
                mt={1}
                mb={2}
                pb={1}
                sx={{ overflow: 'auto', height: '100%' }}
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {tasks &&
                  tasks
                    .sort((a, b) => a.order - b.order)
                    .map((item, index) => {
                      return (
                        <Item
                          key={item._id}
                          _id={item._id}
                          title={item.title}
                          description={item.description}
                          order={index}
                          boardId={boardId}
                          columnId={_id}
                          priority={item.priority}
                          size={item.size}
                          userId={''}
                          users={[]}
                        />
                      );
                    })}
                {provided.placeholder}
              </Stack>
            )}
          </Droppable>
          <Button
            variant="text"
            startIcon={<AddRoundedIcon />}
            sx={{
              color: '#616161',
              display: 'flex',
              m: '0 auto',
              width: '80%',
              mt: 'auto',
              mb: -0.5,
            }}
            onClick={() => {
              dispatch(
                openItemModal({
                  _id: _id,
                  order,
                  title,
                  boardId,
                })
              );
            }}
          >
            {language === 'EN' ? 'Add item' : 'Добавить задачу'}
          </Button>
        </Paper>
      )}
    </Draggable>
  );
};
