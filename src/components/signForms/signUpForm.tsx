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
import { currentLanguage } from 'components/header/langSlice';
import { AppRoutes } from 'types/routes';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useSignInMutation, useSignUpMutation } from 'services/api/auth';
import { setUser } from './authSlice';

interface SignUpFormData {
  name: string;
  login: string;
  password: string;
}

export default function SignUpForm() {
  const language = useAppSelector(currentLanguage);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [signUp] = useSignUpMutation();
  const [signIn] = useSignInMutation();
  const { register, handleSubmit } = useForm<SignUpFormData>();

  const onSubmit: SubmitHandler<SignUpFormData> = async (formData) => {
    try {
      const resp = await signUp(formData);
      if ('data' in resp) {
        const { login, password } = formData;
        const result = await signIn({ login, password });
        if ('data' in result) {
          dispatch(setUser(result.data));
        }
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
          {language === 'EN' ? 'Sign Up' : 'Регистрация'}
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="given-name"
                fullWidth
                {...register('name', { required: true })}
                label={language === 'EN' ? 'Name' : 'Имя'}
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                {...register('login', { required: true })}
                label={language === 'EN' ? 'Login' : 'Логин'}
                type="text"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                {...register('password', { required: true })}
                label={language === 'EN' ? 'Password' : 'Пароль'}
                type="password"
                autoComplete="new-password"
              />
            </Grid>
          </Grid>
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            {language === 'EN' ? 'Sign Up' : 'Зарегестрироваться'}
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link
                href={AppRoutes.SignIn}
                onClick={(e) => {
                  e.preventDefault();
                  navigate(AppRoutes.SignIn);
                }}
                variant="body2"
              >
                {language === 'EN'
                  ? 'Already have an account? Sign in'
                  : 'Уже есть аккаунт? Войдите'}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
