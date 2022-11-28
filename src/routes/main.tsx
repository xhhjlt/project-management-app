import { Container, Stack } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { BackSearchGroup } from 'components/main/BackSearchGroup';
import { BoardsGrid } from 'components/main/BoardsGrid';
import { CreateBoardButton } from 'components/main/CreateBoardButton';
import { RouteTitle } from 'components/main/RouteTitle';

const theme = createTheme({
  palette: {
    primary: {
      light: '#ffff6e',
      main: '#cddc39',
      dark: '#99aa00',
      contrastText: '#212121',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#fff',
    },
    neutral: {
      main: '#64748B',
      contrastText: '#fff',
    },
  },
});

declare module '@mui/material/styles' {
  interface Palette {
    neutral: Palette['primary'];
  }

  // allow configuration using `createTheme`
  interface PaletteOptions {
    neutral?: PaletteOptions['primary'];
  }
}

// Update the Button's color prop options
declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    neutral: true;
  }
}

export const Main = () => {
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
