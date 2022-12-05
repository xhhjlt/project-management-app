import { Paper, Typography, Stack, Divider } from '@mui/material';
import { BoardMenu } from './BoardMenu';
import { useNavigate } from 'react-router-dom';
import { BoardModal } from './BoardModal';
import { DeleteConfirmationModal } from 'components/common/DeleteConfirmationModal';

const paperStyles = {
  boxSizing: 'border-box',
  width: 300,
  height: 150,
  p: '12px',
  backgroundColor: '#dcedc8',
  display: 'flex',
  flexDirection: 'column',
  cursor: 'pointer',
};

const titleStyles = {
  fontWeight: 600,
  color: '#212121',
  wordBreak: 'break-word',
};

const descriptionStyles = {
  maxHeight: '80px',
  color: '#424242',
  wordBreak: 'break-word',
  overflow: 'auto',
};

export type BoardType = {
  id: string;
  title: string;
  description?: string;
};

export const Board = ({ id, title, description }: BoardType) => {
  const navigate = useNavigate();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    if ((event.target as HTMLElement).tagName !== 'button') {
      navigate(`/board/${id}`);
    }
  };

  return (
    <Paper sx={paperStyles}>
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
      <DeleteConfirmationModal
        text={{ title: 'board', body: 'board' }}
        onDelete={deleteBoard}
        id={id}
      />
      <BoardModal boardId={id} />
    </Paper>
  );
};
