import { Box } from '@mui/material';
import { useAppSelector } from 'app/hooks';
import { useAllBoardsQuery } from 'services/api/boards';
import { Board } from './Board';
import { searchBoard } from './mainSlice';

const boardGridStyles = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: 3,
  pt: 1,
};

export const BoardsGrid = () => {
  const { data } = useAllBoardsQuery(undefined, { pollingInterval: 3000 });
  const searchValue = useAppSelector(searchBoard);

  return (
    <Box sx={boardGridStyles}>
      {data
        ?.filter((board) => {
          if (searchValue) {
            return (
              board.description.toUpperCase().includes(searchValue.toUpperCase()) ||
              board.title.toUpperCase().includes(searchValue.toUpperCase())
            );
          }
          return true;
        })
        .map((board) => (
          <Board
            key={board._id}
            id={board._id}
            title={board.title}
            description={board.description}
          />
        ))}
    </Box>
  );
};
