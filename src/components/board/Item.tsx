import { openItemDescriptionModal } from './boardSlice';
import { Paper, Typography, Chip, Stack, Tooltip } from '@mui/material';
import { useAppDispatch } from 'app/hooks';
import * as Icons from 'react-icons/fc';
import { Draggable } from 'react-beautiful-dnd';
import Task from 'types/api/tasks';

const PRIORITY: Record<string, string> = {
  Urgent: 'FcAlarmClock',
  High: 'FcVlc',
  Medium: 'FcNeutralTrading',
  Low: 'FcLowBattery',
};

const SIZE: Record<string, string> = {
  Large: 'FcGlobe',
  Medium: 'FcLandscape',
  Small: 'FcHome',
  Tiny: 'FcCloseUpMode',
};

const paperStyles = {
  p: 1,
  cursor: 'pointer',
};

const getIconComponent = (icon: string) => {
  if (!icon) {
    return <></>;
  }
  const Component = (Icons as Record<string, React.FC>)[icon];

  return <Component />;
};

export const Item = ({ _id, title, order, columnId, size, priority }: Task) => {
  const dispatch = useAppDispatch();

  return (
    <Draggable draggableId={_id} index={order}>
      {(provided) => (
        <Paper
          sx={paperStyles}
          onClick={() => {
            dispatch(openItemDescriptionModal({ itemId: _id, columnId }));
          }}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <Typography
            variant="body2"
            gutterBottom
            sx={{ wordBreak: 'break-word', pb: 0.5, verticalAlign: 'center' }}
          >
            {title}
          </Typography>
          <Stack direction="row" spacing={1}>
            {priority && (
              <Tooltip title="Priority" placement="top" followCursor arrow>
                <Chip
                  label={priority}
                  size="small"
                  icon={getIconComponent(PRIORITY[priority])}
                  sx={{ backgroundColor: '#f5f5f5' }}
                />
              </Tooltip>
            )}
            {size && (
              <Tooltip title="Size" placement="top" followCursor arrow>
                <Chip
                  label={size}
                  size="small"
                  icon={getIconComponent(SIZE[size])}
                  sx={{ backgroundColor: '#f5f5f5' }}
                />
              </Tooltip>
            )}
          </Stack>
        </Paper>
      )}
    </Draggable>
  );
};
