import { ItemType, openItemDescriptionModal } from './boardSlice';
import { Paper, Typography, Chip, Stack } from '@mui/material';
import { useAppDispatch } from 'app/hooks';
import * as Icons from 'react-icons/fc';

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

export const Item = ({ id, title, description, priority, size }: ItemType) => {
  const dispatch = useAppDispatch();

  return (
    <Paper
      sx={paperStyles}
      onClick={() => {
        dispatch(openItemDescriptionModal({ id, title, description, priority, size }));
      }}
    >
      <Typography
        variant="body2"
        gutterBottom
        sx={{ wordBreak: 'break-word', pb: 0.5, verticalAlign: 'center' }}
      >
        {title}
      </Typography>
      <Stack direction="row" spacing={1}>
        {priority.value && (
          <Chip
            label={priority.value}
            size="small"
            icon={getIconComponent(priority.icon)}
            sx={{ backgroundColor: '#f5f5f5' }}
          />
        )}
        {size.value && (
          <Chip
            label={size.value}
            size="small"
            icon={getIconComponent(size.icon)}
            sx={{ backgroundColor: '#f5f5f5' }}
          />
        )}
      </Stack>
    </Paper>
  );
};
