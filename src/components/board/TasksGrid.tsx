import { Button, Stack } from '@mui/material';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { ColumnModal } from './ColumnModal';
import { useAppSelector, useAppDispatch } from 'app/hooks';
import { addItemOnDrop, deleteItemOnDrag, openColumnModal, selectBoardColumns } from './boardSlice';
import { Column } from './Column';
import { DeleteColumnModal } from './DeleteColumnModal';
import { AddItemModal } from './AddItemModal';
import { ItemDescriptionModal } from './ItemDescriptionModal';
import { DeleteItemModal } from './DeleteItemModal';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';

export const TasksGrid = () => {
  const boardColumns = useAppSelector(selectBoardColumns);
  const dispatch = useAppDispatch();

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;
    if (!destination) {
      return;
    }
    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

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
  };

  return (
    <Stack direction="row" spacing={1}>
      <DragDropContext onDragEnd={onDragEnd}>
        {boardColumns.length > 0 &&
          boardColumns.map((column) => {
            return <Column key={column.id} id={column.id} title={column.title} />;
          })}
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
