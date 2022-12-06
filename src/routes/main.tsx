import { Container, Stack } from '@mui/material';
import { BackSearchGroup } from 'components/main/BackSearchGroup';
import { BoardsGrid } from 'components/main/BoardsGrid';
import { CreateBoardButton } from 'components/main/CreateBoardButton';
import { RouteTitle } from 'components/main/RouteTitle';

export const Main = () => {
  return (
    <>
      {<Container maxWidth="lg"></Container>}
      <main>
        <Stack spacing={3} padding={2}>
          <BackSearchGroup />
          <RouteTitle />
          <CreateBoardButton />
          <BoardsGrid />
        </Stack>
      </main>
    </>
  );
};
