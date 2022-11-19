import { ItemType } from './boardSlice';
import { Button, Divider, IconButton, Paper, Stack, Typography } from '@mui/material';

const paperStyles = {
  p: 1,
  cursor: 'pointer',
};

export const Item = ({ id, title, description }: ItemType) => {
  return (
    <Paper sx={paperStyles} onClick={() => console.log('sdf')}>
      <Typography variant="body2" gutterBottom sx={{ wordBreak: 'break-word' }}>
        {title}
      </Typography>
    </Paper>
  );
};
