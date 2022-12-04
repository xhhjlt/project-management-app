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
import { useEffect, useState } from 'react';
import { useTasksSetByBoardIdQuery, useTasksSetUpdateOrderMutation } from 'services/api/tasks';
import Task from 'types/api/tasks';

export type ColumnWithTasks = {
  _id: string;
  title: string;
  order: number;
  boardId: string;
  tasks: Array<Task>;
};

export const TasksGrid = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const { data: columnsOnBoard } = useAllColumnsInBoardQuery(id as string);
  //const [copyOfData, setCopyOfData] = useState(structuredClone(columnsOnBoard));
  const [columnsWithTasks, setColumnsWithTasks] = useState<Array<ColumnWithTasks>>();

  // useEffect(() => {
  //   setCopyOfData(structuredClone(columnsOnBoard));
  // }, [columnsOnBoard]);

  const [updateOrder] = useColumnsSetUpdateOrderMutation();
  const { data: tasksOnBoard } = useTasksSetByBoardIdQuery(id as string);
  const [updateTaskOrder] = useTasksSetUpdateOrderMutation();

  useEffect(() => {
    if (columnsOnBoard) {
      const columnsWithTasks = columnsOnBoard.map((col) => {
        const filteredtasks = tasksOnBoard?.filter((t) => t.columnId === col._id) || [];
        return {
          ...col,
          tasks: filteredtasks,
        };
      });
      setColumnsWithTasks(columnsWithTasks);
    }
  }, [columnsOnBoard, tasksOnBoard]);

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

      const fixOrders = (col: ColumnWithTasks) => {
        if (col.order < Math.min(from, to) || col.order > Math.max(from, to)) {
          return { ...col, order: col.order };
        }
        if (col.order === from) {
          return { ...col, order: to };
        }
        return { ...col, order: col.order + Math.sign(from - to) };
      };

      if (columnsWithTasks) {
        const newCopyOfData = columnsWithTasks.map(fixOrders);
        updateOrder(
          newCopyOfData.map((col: ColumnWithTasks) => ({ _id: col._id, order: col.order }))
        );
        setColumnsWithTasks(newCopyOfData);
      }
    } else {
      const srcColumnId = source.droppableId;
      const destColumnId = destination.droppableId;
      const from = source.index;
      const to = destination.index;

      const fixTasksOrders = (item: Task) => {
        // drag-n-drop in one column
        if (srcColumnId === destColumnId && item.columnId === srcColumnId) {
          if (item.order < Math.min(from, to) || item.order > Math.max(from, to)) {
            return { ...item, order: item.order };
          }
          if (item.order === from) {
            return { ...item, order: to };
          }
          return { ...item, order: item.order + Math.sign(from - to) };
        }
        // order tasks in source column, not draggable item
        if (
          srcColumnId !== destColumnId &&
          item.columnId === srcColumnId &&
          item._id !== draggableId
        ) {
          if (item.order < from) {
            return { ...item, order: item.order };
          }
          return { ...item, order: item.order - 1 };
        }
        // order tasks in droppable column, not draggable item
        if (
          srcColumnId !== destColumnId &&
          item.columnId === destColumnId &&
          item._id !== draggableId
        ) {
          if (item.order < to) {
            return { ...item, order: item.order };
          }
          return { ...item, order: item.order + 1 };
        }
        // draggable item
        if (item._id === draggableId) {
          return { ...item, order: to, columnId: destColumnId };
        }
        // tasks in other columns
        return { ...item, order: item.order };
      };

      if (tasksOnBoard) {
        const newCopyOfTasks = tasksOnBoard.map(fixTasksOrders);
        updateTaskOrder(
          newCopyOfTasks.map((item: Task) => ({
            _id: item._id,
            order: item.order,
            columnId: item.columnId,
          }))
        );
      }
    }
  };

  return (
    <Stack direction="row" spacing={1}>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="all-columns" direction="horizontal" type="column">
          {(provided) => (
            <Stack direction="row" spacing={1} {...provided.droppableProps} ref={provided.innerRef}>
              {columnsWithTasks &&
                columnsWithTasks
                  .sort((a, b) => a.order - b.order)
                  .map((column, index) => {
                    return (
                      <BoardColumn
                        key={column._id}
                        _id={column._id}
                        title={column.title}
                        order={index}
                        boardId={id!}
                        tasks={column.tasks}
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
        size={columnsOnBoard ? 'large' : 'small'}
        startIcon={columnsOnBoard?.length === 0 && <AddRoundedIcon />}
        sx={{
          boxSizing: 'border-box',
          width: 'auto',
          ...(columnsOnBoard?.length === 0 && { width: 300 }),
          height: 45,
          userSelect: 'none',
        }}
        onClick={() => {
          dispatch(openColumnModal());
        }}
      >
        {columnsOnBoard?.length === 0 ? <span>Add column</span> : <AddRoundedIcon />}
      </Button>
      <ColumnModal />
      <DeleteColumnModal />
      <AddItemModal />
      <ItemDescriptionModal />
      <DeleteItemModal />
    </Stack>
  );
};
