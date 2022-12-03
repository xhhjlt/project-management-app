import { Button, Divider, IconButton, Paper, Stack, Badge } from '@mui/material';
import { openDeleteColumnModal, openItemModal } from './boardSlice';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import { useAppDispatch } from 'app/hooks';
import { Item } from './Item';
import { ColumnTitle } from './ColumnTitle';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { useUpdateColumnMutation } from 'services/api/columns';
import { useAllTasksInColumnQuery } from 'services/api/tasks';
import { Column } from 'types/api/columns';

const paperStyles = {
  boxSizing: 'border-box',
  width: 340,
  p: '12px',
  backgroundColor: '#f9fbe7', // '#f0f4c3',
  display: 'flex',
  flexDirection: 'column',
};

export const BoardColumn = ({ _id, title, order, boardId }: Column) => {
  const dispatch = useAppDispatch();
  const [updateColumn] = useUpdateColumnMutation();
  const { data: tasks } = useAllTasksInColumnQuery({ columnId: _id, boardId });

  return (
    <Draggable draggableId={_id} index={order}>
      {(provided) => (
        <Paper sx={paperStyles} {...provided.draggableProps} ref={provided.innerRef}>
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
              <IconButton
                sx={{ p: 0, ml: 2, pt: '4px' }}
                onClick={() => {
                  dispatch(
                    openDeleteColumnModal({
                      _id,
                      order,
                      title,
                      boardId,
                    })
                  );
                }}
              >
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
              <Stack gap={1} mt={1} mb={2} ref={provided.innerRef} {...provided.droppableProps}>
                {tasks &&
                  tasks.map((item, index) => {
                    return (
                      <Item
                        key={item._id}
                        id={item._id}
                        title={item.title}
                        description={item.description}
                        order={index}
                        boardId={boardId}
                        columnId={_id}
                        priority={item.priority}
                        size={item.size}
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
            Add item
          </Button>
        </Paper>
      )}
    </Draggable>
  );
};
