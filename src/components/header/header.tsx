import { AppBar, Button, IconButton, Toolbar, Typography, useTheme, Box } from '@mui/material';
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
            <Button size="large" color="inherit" onClick={() => navigate(AppRoutes.EditProfile)}>
              {language === 'EN' ? 'Edit profile' : 'Редактировать профиль'}
            </Button>
            <Button
              size="large"
              color="inherit"
              onClick={() => {
                dispatch(clearUser());
              }}
            >
              {language === 'EN' ? 'Sign Out' : 'Выход'}
            </Button>
            <Button size="large" color="inherit" onClick={() => alert('модалочка')}>
              {language === 'EN' ? 'Create new board' : 'Создать доску'}
            </Button>
          </>
        ) : (
          <>
            <Button size="large" color="inherit" onClick={() => navigate(AppRoutes.SignIn)}>
              {language === 'EN' ? 'Sign In' : 'Войти'}
            </Button>
            <Button size="large" color="inherit" onClick={() => navigate(AppRoutes.SignUp)}>
              {language === 'EN' ? 'Sign Up' : 'Регистрация'}
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
    </AppBar>
  );
}
