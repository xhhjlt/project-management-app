import { Paper, Typography, Stack, Divider, useTheme } from '@mui/material';
import { useDeleteBoardMutation } from 'services/api/boards';
import { BoardMenu } from './BoardMenu';
import { useNavigate } from 'react-router-dom';
import { BoardModal } from './BoardModal';

const paperStyles = {
  boxSizing: 'border-box',
  width: 300,
  height: 150,
  p: '12px',
  display: 'flex',
  flexDirection: 'column',
  cursor: 'pointer',
};

const titleStyles = {
  fontWeight: 600,
  wordBreak: 'break-word',
};

const descriptionStyles = {
  maxHeight: '80px',
  wordBreak: 'break-word',
  overflow: 'auto',
};

export type BoardType = {
  id: string;
  title: string;
  description?: string;
};

export const Board = ({ id, title, description }: BoardType) => {
  const theme = useTheme();
  const navigate = useNavigate();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    if ((event.target as HTMLElement).tagName !== 'button') {
      navigate(`/board/${id}`);
    }
  };

  return (
    <Paper
      elevation={10}
      sx={{
        ...paperStyles,
        backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[900] : '#dcedc8',
      }}
    >
      <Stack spacing={1} onClick={handleClick}>
        <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
          <Typography variant="h6" sx={titleStyles}>
            {title}
          </Typography>
          <BoardMenu id={id} />
        </Stack>
        <Stack direction={'row'}>
          <Divider orientation="vertical" sx={{ mx: 1 }} flexItem />
          <Typography variant="body2" sx={descriptionStyles}>
            {description}
          </Typography>
        </Stack>
      </Stack>
      <BoardModal boardId={id} />
    </Paper>
  );
};
