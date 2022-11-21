import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Board from 'routes/board';
import EditProfile from 'routes/editProfile';
import ErrorPage from 'routes/errorPage';
import Main from 'routes/main';
import Root from 'routes/root';
import SignIn from 'routes/signIn';
import Welcome from 'routes/welcome';
import SignUp from 'routes/signUp';
import { AppRoutes } from 'types/routes';

export const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

const router = createBrowserRouter([
  {
    path: AppRoutes.Welcome,
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Welcome />,
      },
      {
        path: AppRoutes.SignIn,
        element: <SignIn />,
      },
      {
        path: AppRoutes.SignUp,
        element: <SignUp />,
      },
      {
        path: AppRoutes.EditProfile,
        element: <EditProfile />,
      },
      {
        path: AppRoutes.Main,
        element: <Main />,
      },
      {
        path: AppRoutes.Board,
        element: <Board />,
      },
    ],
  },
]);

export default function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [mode, setMode] = React.useState<'light' | 'dark'>(prefersDarkMode ? 'dark' : 'light');
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    []
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
