import { Button, Divider, IconButton, Paper, Stack, Badge } from '@mui/material';
import {
  ColumnType,
  openDeleteColumnModal,
  openItemModal,
  selectBoardColumns,
  setColumnTitle,
} from './boardSlice';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { Item } from './Item';
import { ColumnTitle } from './ColumnTitle';
import { Droppable } from 'react-beautiful-dnd';

const paperStyles = {
  boxSizing: 'border-box',
  width: 340,
  p: '12px',
  backgroundColor: '#f9fbe7', // '#f0f4c3',
  display: 'flex',
  flexDirection: 'column',
};

export const Column = ({ id, title }: ColumnType) => {
  const dispatch = useAppDispatch();
  const boardColumns = useAppSelector(selectBoardColumns);
  const column = boardColumns.find((el) => el.id === id);

  return (
    <Paper sx={paperStyles}>
      <Stack direction="row" justifyContent={'space-between'} sx={{ p: 1, mb: 1 }}>
        <Stack direction="row" spacing={3}>
          <ColumnTitle
            value={title}
            onChange={(newTitle) => dispatch(setColumnTitle({ id, title: newTitle }))}
          />
          <Badge
            badgeContent={column?.items?.length}
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
              dispatch(openDeleteColumnModal({ id }));
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
      <Droppable droppableId={id}>
        {(provided) => (
          <Stack gap={1} mt={1} mb={2} ref={provided.innerRef} {...provided.droppableProps}>
            {column!.items!.length > 0 &&
              column?.items?.map((item, index) => {
                return (
                  <Item
                    key={item.id}
                    id={item.id}
                    title={item.title}
                    description={item.description}
                    priority={item.priority}
                    size={item.size}
                    index={index}
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
          dispatch(openItemModal({ id }));
        }}
      >
        Add item
      </Button>
    </Paper>
  );
};
