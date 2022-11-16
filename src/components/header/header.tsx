import { AccountCircle } from '@mui/icons-material';
import { AppBar, IconButton, Toolbar, Typography, useTheme } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import React from 'react';
import { ColorModeContext } from 'App';

export default function Header() {
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          PMA
        </Typography>
        <IconButton size="large" aria-label="SignIn" color="inherit">
          <AccountCircle />
        </IconButton>
        <IconButton size="large" aria-label="SignUp" color="inherit">
          <AccountCircle />
        </IconButton>
        <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
          {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
        <IconButton size="large" aria-label="Language switch" color="inherit">
          <AccountCircle />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
