import { Button, Stack } from '@mui/material';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { ColumnModal } from './ColumnModal';
import { useAppDispatch } from 'app/hooks';
import { openColumnModal } from './boardSlice';
import { DeleteColumnModal } from './DeleteColumnModal';
import { AddItemModal } from './AddItemModal';
import { ItemDescriptionModal } from './ItemDescriptionModal';
import { DeleteItemModal } from './DeleteItemModal';
import { DragDropContext, DropResult, Droppable } from 'react-beautiful-dnd';
import { useParams } from 'react-router-dom';
import { useAllColumnsInBoardQuery, useColumnsSetUpdateOrderMutation } from 'services/api/columns';
import { BoardColumn } from './BoardColumn';
import { Column } from 'types/api/columns';
import { useEffect, useState } from 'react';

export const TasksGrid = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const { data } = useAllColumnsInBoardQuery(id as string);
  const [copyOfData, setCopyOfData] = useState(structuredClone(data));

  useEffect(() => {
    setCopyOfData(structuredClone(data));
  }, [data]);

  const [updateOrder] = useColumnsSetUpdateOrderMutation();

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId, type } = result;

    if (!destination) {
      return;
    }
    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    if (type === 'column') {
      const from = source.index;
      const to = destination.index;

      const fixOrders = (col: Column) => {
        if (col.order < Math.min(from, to) || col.order > Math.max(from, to)) {
          return { ...col, order: col.order };
        }
        if (col.order === from) {
          return { ...col, order: to };
        }
        return { ...col, order: col.order + Math.sign(from - to) };
      };

      if (copyOfData) {
        const newCopyOfData = copyOfData.map(fixOrders);
        updateOrder(newCopyOfData.map((col: Column) => ({ _id: col._id, order: col.order })));
        setCopyOfData(newCopyOfData);
      }
    }
  };

  return (
    <Stack direction="row" spacing={1}>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="all-columns" direction="horizontal" type="column">
          {(provided) => (
            <Stack direction="row" spacing={1} {...provided.droppableProps} ref={provided.innerRef}>
              {copyOfData &&
                copyOfData
                  .sort((a, b) => a.order - b.order)
                  .map((column, index) => {
                    return (
                      <BoardColumn
                        key={column._id}
                        _id={column._id}
                        title={column.title}
                        order={index}
                        boardId={id!}
                      />
                    );
                  })}

              {provided.placeholder}
            </Stack>
          )}
        </Droppable>
      </DragDropContext>
      <Button
        variant="contained"
        size={data ? 'large' : 'small'}
        startIcon={data?.length === 0 && <AddRoundedIcon />}
        sx={{
          boxSizing: 'border-box',
          width: 'auto',
          ...(data?.length === 0 && { width: 300 }),
          height: 45,
          userSelect: 'none',
        }}
        onClick={() => {
          dispatch(openColumnModal());
        }}
      >
        {data?.length === 0 ? <span>Add column</span> : <AddRoundedIcon />}
      </Button>
      <ColumnModal />
      <DeleteColumnModal />
      <AddItemModal />
      <ItemDescriptionModal />
      <DeleteItemModal />
    </Stack>
  );
};
