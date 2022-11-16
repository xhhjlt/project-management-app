import { AppBar, Button, IconButton, Toolbar, Typography, useTheme } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import React from 'react';
import { ColorModeContext } from 'App';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { langToggle } from './langSlice';
import { logOut } from './authSlice';

export default function Header() {
  const language = useAppSelector((state) => state.lang.current);
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const navigate = useNavigate();
  const colorMode = React.useContext(ColorModeContext);

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          PMA
        </Typography>
        {user ? (
          <>
            <Button size="large" color="inherit" onClick={() => navigate('/edit')}>
              {language === 'EN' ? 'Edit profile' : 'Редактировать профиль'}
            </Button>
            <Button size="large" color="inherit" onClick={() => dispatch(logOut)}>
              {language === 'EN' ? 'Sign Out' : 'Выход'}
            </Button>
            <Button size="large" color="inherit" onClick={() => alert('модалочка')}>
              {language === 'EN' ? 'Create new board' : 'Создать доску'}
            </Button>
          </>
        ) : (
          <>
            <Button size="large" color="inherit" onClick={() => navigate('/signIn')}>
              {language === 'EN' ? 'Sign In' : 'Войти'}
            </Button>
            <Button size="large" color="inherit" onClick={() => navigate('/signUp')}>
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
