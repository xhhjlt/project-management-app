import { Box } from '@mui/material';
import { useAllBoardsQuery } from 'services/api/boards';
import { Board } from './Board';

const boardGridStyles = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: 3,
  pt: 1,
};

export const BoardsGrid = () => {
  const { data } = useAllBoardsQuery(undefined, { pollingInterval: 3000 });

  return (
    <Box sx={boardGridStyles}>
      {data?.map((board) => (
        <Board key={board._id} id={board._id} title={board.title} description={board.description} />
      ))}
    </Box>
  );
};
