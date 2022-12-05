import { Stack, Box } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { BackButtonGroup } from 'components/board/BackButtonGroup';
import { TasksGrid } from 'components/board/TasksGrid';
import { TitleGroup } from 'components/board/TitleGroup';

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

export const Board = () => {
  return (
    <ThemeProvider theme={theme}>
      <Box component="main" sx={{ height: 'calc(100% - 125px)', overflow: 'hidden' }}>
        <Stack spacing={3} padding={2} sx={{ height: '100%' }}>
          <BackButtonGroup />
          <TitleGroup />
          <TasksGrid />
        </Stack>
      </Box>
    </ThemeProvider>
  );
};
