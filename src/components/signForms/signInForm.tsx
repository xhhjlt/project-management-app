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
import { currentLanguage } from 'components/header/langSlice';
import { AppRoutes } from 'types/routes';
import { useForm, SubmitHandler } from 'react-hook-form';

interface SignInFormData {
  login: string;
  password: string;
}

export default function SignInForm() {
  const language = useAppSelector(currentLanguage);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [signIn] = useSignInMutation();
  const { register, handleSubmit } = useForm<SignInFormData>();

  const onSubmit: SubmitHandler<SignInFormData> = async (formData) => {
    try {
      const result = await signIn(formData);
      if ('data' in result) {
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
        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            fullWidth
            {...register('login', { required: true })}
            label={language === 'EN' ? 'Login' : 'Логин'}
            type="text"
            autoComplete="username"
            autoFocus
          />
          <TextField
            margin="normal"
            fullWidth
            {...register('password', { required: true })}
            label={language === 'EN' ? 'Password' : 'Пароль'}
            type="password"
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
