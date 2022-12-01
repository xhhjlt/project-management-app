import {
  AppBar,
  Button,
  IconButton,
  Toolbar,
  Typography,
  useTheme,
  Box,
  useMediaQuery,
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
import { openCreateBoardModal } from 'components/main/mainSlice';
import { CreateBoardModal } from 'components/main/CreateBoardModal';

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
  const matches = useMediaQuery('(min-width:1000px)');

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
      sx={Object.assign(
        scrolled
          ? {
              borderRadius: '0% 0% 30px 30px',
            }
          : {},
        {
          transition: 'all 0.3s',
        }
      )}
    >
      <Toolbar>
        <Box mr="auto">
          <Typography
            variant="h6"
            component="div"
            sx={{ cursor: 'pointer' }}
            onClick={() => navigate(AppRoutes.Welcome)}
          >
            PMA
          </Typography>
        </Box>
        {user ? (
          <>
            <Button
              size="large"
              color="inherit"
              startIcon={<PersonRounded />}
              onClick={() => navigate(AppRoutes.EditProfile)}
            >
              {matches && (language === 'EN' ? ' Edit profile' : ' Редактировать профиль')}
            </Button>
            <Button
              size="large"
              color="inherit"
              startIcon={<LogoutRounded />}
              onClick={() => {
                dispatch(clearUser());
              }}
            >
              {matches && (language === 'EN' ? ' Sign Out' : ' Выход')}
            </Button>
            <Button
              size="large"
              color="inherit"
              startIcon={<DashboardRounded />}
              onClick={() => {
                dispatch(openCreateBoardModal());
              }}
            >
              {matches && (language === 'EN' ? ' Create new board' : ' Создать доску')}
            </Button>
          </>
        ) : (
          <>
            <Button
              size="large"
              color="inherit"
              startIcon={<LoginRounded />}
              onClick={() => navigate(AppRoutes.SignIn)}
            >
              {matches && (language === 'EN' ? ' Sign In' : ' Войти')}
            </Button>
            <Button
              size="large"
              color="inherit"
              startIcon={<AppRegistrationRounded />}
              onClick={() => navigate(AppRoutes.SignUp)}
            >
              {matches && (language === 'EN' ? 'Sign Up' : 'Регистрация')}
            </Button>
          </>
        )}
        <Button size="medium" color="inherit" onClick={() => dispatch(langToggle())}>
          {language === 'EN' ? 'ru' : 'en'}
        </Button>
        <IconButton onClick={colorMode.toggleColorMode} color="inherit">
          {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
      </Toolbar>
      <CreateBoardModal />
    </AppBar>
  );
}
