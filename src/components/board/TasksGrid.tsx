import { Button, Stack } from '@mui/material';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { ColumnModal } from './ColumnModal';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { openColumnModal } from './boardSlice';
import { AddItemModal } from './AddItemModal';
import { ItemDescriptionModal } from './ItemDescriptionModal';
import { DragDropContext, DropResult, Droppable } from 'react-beautiful-dnd';
import { useParams } from 'react-router-dom';
import { useAllColumnsInBoardQuery, useColumnsSetUpdateOrderMutation } from 'services/api/columns';
import { BoardColumn } from './BoardColumn';
import { useEffect, useState } from 'react';
import { useTasksSetByBoardIdQuery, useTasksSetUpdateOrderMutation } from 'services/api/tasks';
import Task from 'types/api/tasks';
import { currentLanguage } from 'components/header/langSlice';
import { Column } from 'types/api/columns';

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
  const [columnsWithTasks, setColumnsWithTasks] = useState<Array<ColumnWithTasks>>();
  const language = useAppSelector(currentLanguage);

  const [updateOrder] = useColumnsSetUpdateOrderMutation();
  const { data: tasksOnBoard } = useTasksSetByBoardIdQuery(id as string);
  const [updateTaskOrder] = useTasksSetUpdateOrderMutation();

  const linkColumnsWithTasks = (columns: Column[] | undefined, tasks: Task[] | undefined) =>
    columns &&
    columns.map((col) => {
      const filteredtasks = tasks?.filter((t) => t.columnId === col._id) || [];
      return {
        ...col,
        tasks: filteredtasks,
      };
    });

  const repairOrders = (columnsWithTasks: ColumnWithTasks[] | undefined) => {
    let fixed = false;
    const newColumnsWithTasks = columnsWithTasks?.map((col: ColumnWithTasks) => {
      col.tasks.sort((a: Task, b: Task) => a.order - b.order);
      return {
        ...col,
        tasks: col.tasks.map((task: Task, order: number) => {
          if (task.order !== order) {
            fixed = true;
            return { ...task, order };
          }
          return task;
        }),
      };
    });
    if (fixed) {
      const newTasksOnBoard = newColumnsWithTasks?.map((c: ColumnWithTasks) => c.tasks).flat();
      if (newTasksOnBoard) {
        updateTaskOrder(
          newTasksOnBoard.map((item: Task) => ({
            _id: item._id,
            order: item.order,
            columnId: item.columnId,
          }))
        );
      }
    }
    setColumnsWithTasks(newColumnsWithTasks);
  };

  const repairColumnsOrder = (columns: Column[]) => {
    const sortedColumns = [...columns].sort((a, b) => a.order - b.order);
    if (sortedColumns.some((c: Column, index: number) => c.order !== index)) {
      const fixedColumns = columns.map((c: Column, order: number) => ({ ...c, order }));
      updateOrder(fixedColumns.map(({ _id, order }: Column) => ({ _id, order })));
      return fixedColumns;
    }
    return columns;
  };

  useEffect(() => {
    if (columnsOnBoard) {
      const fixedColumns = repairColumnsOrder(columnsOnBoard);
      const columnsWithTasks = linkColumnsWithTasks(fixedColumns, tasksOnBoard);
      repairOrders(columnsWithTasks);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        setColumnsWithTasks(linkColumnsWithTasks(columnsOnBoard, newCopyOfTasks));
      }
    }
  };

  return (
    <Stack direction="row" spacing={1} sx={{ height: 'calc(100% - 150px)' }}>
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
        {columnsOnBoard?.length === 0 ? (
          <span>{language === 'EN' ? 'Add column' : 'Добавить колонку'}</span>
        ) : (
          <AddRoundedIcon />
        )}
      </Button>
      <ColumnModal />
      <AddItemModal />
      <ItemDescriptionModal />
    </Stack>
  );
};
