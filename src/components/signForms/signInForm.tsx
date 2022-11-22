import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { useNavigate } from 'react-router-dom';
import { useSignInMutation } from 'services/api/auth';
import { setUser } from './authSlice';
import { SignInResp } from 'types/api/user';
import { currentLanguage } from 'components/header/langSlice';
import { AppRoutes } from 'types/routes';

export default function SignInForm() {
  const language = useAppSelector(currentLanguage);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [signIn] = useSignInMutation();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const login = data.get('login')?.toString() || '';
    const password = data.get('password')?.toString() || '';
    try {
      const result = (await signIn({ login, password })) as { data: SignInResp };
      if (result.data) {
        dispatch(setUser(result.data));
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 4,
          marginButton: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {language === 'EN' ? 'Sign In' : 'Вход'}
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="login"
            label={language === 'EN' ? 'Login' : 'Логин'}
            type="text"
            name="login"
            autoComplete="username"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label={language === 'EN' ? 'Password' : 'Пароль'}
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            {language === 'EN' ? 'Sign In' : 'Войти'}
          </Button>
          <Grid container>
            <Grid item xs></Grid>
            <Grid item>
              <Link
                href={AppRoutes.SignUp}
                onClick={(e) => {
                  e.preventDefault();
                  navigate(AppRoutes.SignUp);
                }}
                variant="body2"
              >
                {language === 'EN'
                  ? `Don't have an account? Sign Up`
                  : 'Нет аккаунта? Зарегестрируйтесь'}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
