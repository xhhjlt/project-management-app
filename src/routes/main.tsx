import { Container, Stack } from '@mui/material';
import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles';
import { BackSearchGroup } from 'components/main/BackSearchGroup';
import { BoardsGrid } from 'components/main/BoardsGrid';
import { CreateBoardButton } from 'components/main/CreateBoardButton';
import { RouteTitle } from 'components/main/RouteTitle';

export const Main = () => {
  const mainTheme = useTheme();
  const theme = createTheme(mainTheme, {
    palette: {
      primary: {
        light: '#bef67a',
        main: '#8bc34a',
        dark: '#5a9216',
        contrastText: '#212121',
      },
      secondary: {
        light: '#ff7961',
        main: '#f44336',
        dark: '#ba000d',
        contrastText: '#fff',
      },
    },
  });
  return (
    <ThemeProvider theme={theme}>
      {<Container maxWidth="lg"></Container>}
      <main>
        <Stack spacing={3} padding={2}>
          <BackSearchGroup />
          <RouteTitle />
          <CreateBoardButton />
          <BoardsGrid />
        </Stack>
      </main>
    </ThemeProvider>
  );
};
