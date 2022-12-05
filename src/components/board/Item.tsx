import { openItemDescriptionModal } from './boardSlice';
import { Paper, Typography, Chip, Stack, Tooltip } from '@mui/material';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import * as Icons from 'react-icons/fc';
import { Draggable } from 'react-beautiful-dnd';
import Task from 'types/api/tasks';
import { currentLanguage } from 'components/header/langSlice';

const PRIORITY: Record<string, string> = {
  Urgent: 'FcAlarmClock',
  High: 'FcVlc',
  Medium: 'FcNeutralTrading',
  Low: 'FcLowBattery',
};

const SIZE: Record<string, string> = {
  Xlarge: 'FcGlobe',
  Large: 'FcLandscape',
  Medium: 'FcHome',
  Small: 'FcCloseUpMode',
};

const PRIORITY_RUS: Record<string, string> = {
  Urgent: 'Критичный',
  High: 'Высокий',
  Medium: 'Средний',
  Low: 'Низкий',
};

const SIZE_RUS: Record<string, string> = {
  Xlarge: 'Огромная',
  Large: 'Большая',
  Medium: 'Средняя',
  Small: 'Маленькая',
};

const SIZE_EN: Record<string, string> = {
  Xlarge: 'X-Large',
  Large: 'Large',
  Medium: 'Medium',
  Small: 'Small',
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
  const language = useAppSelector(currentLanguage);

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
              <Tooltip
                title={language === 'EN' ? 'Priority' : 'Приоритет'}
                placement="top"
                followCursor
                arrow
              >
                <Chip
                  label={language === 'EN' ? priority : PRIORITY_RUS[priority]}
                  size="small"
                  icon={getIconComponent(PRIORITY[priority])}
                />
              </Tooltip>
            )}
            {size && (
              <Tooltip
                title={language === 'EN' ? 'Size' : 'Размер'}
                placement="top"
                followCursor
                arrow
              >
                <Chip
                  label={language === 'EN' ? SIZE_EN[size] : SIZE_RUS[size]}
                  size="small"
                  icon={getIconComponent(SIZE[size])}
                />
              </Tooltip>
            )}
          </Stack>
        </Paper>
      )}
    </Draggable>
  );
};
