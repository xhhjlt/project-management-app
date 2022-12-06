import {
  AppBar,
  IconButton,
  Toolbar,
  Typography,
  useTheme,
  Box,
  useMediaQuery,
  Avatar,
} from '@mui/material';
import {
  DashboardRounded,
  PersonRounded,
  LoginRounded,
  LogoutRounded,
  AppRegistrationRounded,
} from '@mui/icons-material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import React, { useEffect, useState } from 'react';
import { ColorModeContext } from 'App';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { currentLanguage, langToggle } from './langSlice';
import { isUserLoggedIn, clearUser } from 'components/signForms/authSlice';
import { AppRoutes } from 'types/routes';
import { useSnackbar } from 'notistack';
import { errorToastFlag, errorToastMessage } from 'components/common/commonSlice';
import { openBoardModal } from 'components/main/mainSlice';
import { BoardModal } from 'components/main/BoardModal';

export default function Header() {
  const language = useAppSelector(currentLanguage);
  const user = useAppSelector(isUserLoggedIn);
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const navigate = useNavigate();
  const colorMode = React.useContext(ColorModeContext);
  const [scrolled, setScrolled] = useState(window.scrollY);
  const { enqueueSnackbar } = useSnackbar();
  const errorMessage = useAppSelector(errorToastMessage);
  const errorFlag = useAppSelector(errorToastFlag);
  const matches1000 = useMediaQuery('(min-width:1000px)');
  const matches680 = useMediaQuery('(min-width:680px)');

  useEffect(() => {
    window.addEventListener('scroll', () => setScrolled(window.scrollY));
  }, []);

  useEffect(() => {
    if (errorMessage) {
      enqueueSnackbar(errorMessage, { variant: 'error' });
    }
  }, [enqueueSnackbar, errorMessage, errorFlag]);

  return (
    <AppBar
      position="sticky"
      sx={{
        ...(scrolled
          ? {
              borderRadius: '0% 0% 30px 30px',
            }
          : {}),
        ...{
          transition: 'all 0.3s',
          padding: matches680 ? '0 24px' : '0 2px',
        },
      }}
    >
      <Toolbar sx={{ padding: 0 }}>
        <Box
          mr="auto"
          onClick={() => navigate(AppRoutes.Welcome)}
          sx={{
            cursor: 'pointer',
            display: 'flex',
            gap: 2,
          }}
        >
          <Avatar alt="logo" src="logo.png" sx={{ width: 50, height: 50 }} />
          {matches680 && (
            <Box>
              <Typography variant="h6">
                {language === 'EN' ? `I'll do it tomorrow!` : `Я сделаю это завтра!`}
              </Typography>
              <Typography variant="body2">
                {language === 'EN' ? `(Not exactly)` : `(Но это не точно)`}
              </Typography>
            </Box>
          )}
        </Box>
        {user ? (
          <>
            <IconButton
              size="small"
              color="inherit"
              onClick={() => navigate(AppRoutes.EditProfile)}
            >
              <PersonRounded sx={{ m: '5px' }} />
              {matches1000 && (language === 'EN' ? 'Edit profile' : 'Редактировать профиль')}
            </IconButton>
            <IconButton
              size="small"
              color="inherit"
              onClick={() => {
                dispatch(clearUser());
              }}
            >
              <LogoutRounded sx={{ m: '5px' }} />
              {matches1000 && (language === 'EN' ? 'Sign Out' : 'Выход')}
            </IconButton>
            <IconButton
              size="small"
              color="inherit"
              onClick={() => {
                dispatch(openBoardModal());
              }}
            >
              <DashboardRounded sx={{ m: '5px' }} />
              {matches1000 && (language === 'EN' ? 'Create new board' : 'Создать доску')}
            </IconButton>
            {<BoardModal />}
          </>
        ) : (
          <>
            <IconButton size="small" color="inherit" onClick={() => navigate(AppRoutes.SignIn)}>
              <LoginRounded sx={{ m: '5px' }} />
              {matches1000 && (language === 'EN' ? 'Sign In' : 'Войти')}
            </IconButton>
            <IconButton size="small" color="inherit" onClick={() => navigate(AppRoutes.SignUp)}>
              <AppRegistrationRounded sx={{ m: '5px' }} />
              {matches1000 && (language === 'EN' ? 'Sign Up' : 'Регистрация')}
            </IconButton>
          </>
        )}
        <IconButton size="small" color="inherit" onClick={() => dispatch(langToggle())}>
          {language === 'EN' ? 'RU' : 'EN'}
        </IconButton>
        <IconButton onClick={colorMode.toggleColorMode} color="inherit">
          {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
