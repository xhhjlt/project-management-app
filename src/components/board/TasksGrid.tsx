import { Button, Stack } from '@mui/material';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { ColumnModal } from './ColumnModal';
import { useAppSelector, useAppDispatch } from 'app/hooks';
import {
  addColumnOnDrop,
  addItemOnDrop,
  deleteColumnOnDrag,
  deleteItemOnDrag,
  openColumnModal,
  selectBoardColumns,
} from './boardSlice';
import { Column } from './Column';
import { DeleteColumnModal } from './DeleteColumnModal';
import { AddItemModal } from './AddItemModal';
import { ItemDescriptionModal } from './ItemDescriptionModal';
import { DeleteItemModal } from './DeleteItemModal';
import { DragDropContext, DropResult, Droppable } from 'react-beautiful-dnd';

export const TasksGrid = () => {
  const boardColumns = useAppSelector(selectBoardColumns);
  const dispatch = useAppDispatch();

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId, type } = result;
    if (!destination) {
      return;
    }
    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    if (type === 'column') {
      const draggableColumn = boardColumns.find((col) => col.id === draggableId)!;

      dispatch(deleteColumnOnDrag(draggableId));

      dispatch(
        addColumnOnDrop({
          draggableColumn,
          destinationIndex: destination.index,
        })
      );
    } else {
      const srcColumn = boardColumns.find((col) => col.id === source.droppableId)!;
      const draggableItem = srcColumn!.items![source.index];

      dispatch(deleteItemOnDrag({ draggableId, srcColumnId: source.droppableId }));
      dispatch(
        addItemOnDrop({
          draggableItem,
          destColumnId: destination.droppableId,
          destinationIndex: destination.index,
        })
      );
    }
  };

  return (
    <Stack direction="row" spacing={1}>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="all-columns" direction="horizontal" type="column">
          {(provided) => (
            <Stack direction="row" spacing={1} {...provided.droppableProps} ref={provided.innerRef}>
              {boardColumns.length > 0 &&
                boardColumns.map((column, index) => {
                  return (
                    <Column key={column.id} id={column.id} title={column.title} index={index} />
                  );
                })}

              {provided.placeholder}
            </Stack>
          )}
        </Droppable>
      </DragDropContext>
      <Button
        variant="contained"
        size={boardColumns.length === 0 ? 'large' : 'small'}
        startIcon={boardColumns.length === 0 && <AddRoundedIcon />}
        sx={{
          boxSizing: 'border-box',
          width: 300,
          ...(boardColumns.length > 0 && { width: 'auto' }),
          height: 45,
          userSelect: 'none',
        }}
        onClick={() => {
          dispatch(openColumnModal());
        }}
      >
        {boardColumns.length === 0 ? <span>Add column</span> : <AddRoundedIcon />}
      </Button>
      <ColumnModal />
      <DeleteColumnModal />
      <AddItemModal />
      <ItemDescriptionModal />
      <DeleteItemModal />
    </Stack>
  );
};
