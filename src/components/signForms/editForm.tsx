import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import PersonIcon from '@mui/icons-material/Person';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { currentLanguage } from 'components/header/langSlice';
import { useForm, SubmitHandler } from 'react-hook-form';
import { loginRegisterOptions, nameRegisterOptions, passwordRegisterOptions } from './utils';
import { DeleteConfirmationModal } from 'components/common/DeleteConfirmationModal';
import { changeLogin, clearUser, CurrentUserId } from './authSlice';
import { useDeleteUserMutation, useUpdateUserMutation } from 'services/api/users';
import { openDeleteConfirmationModal } from 'components/common/commonSlice';

interface EditProfileData {
  name: string;
  login: string;
  password: string;
}

export default function EditProfileForm() {
  const language = useAppSelector(currentLanguage);
  const userId = useAppSelector(CurrentUserId);
  const [deleteUser] = useDeleteUserMutation();
  const [updateUser] = useUpdateUserMutation();
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditProfileData>();

  const onSubmit: SubmitHandler<EditProfileData> = async (formData) => {
    const resp = await updateUser({ _id: userId, ...formData });
    if ('data' in resp) {
      dispatch(changeLogin(resp.data));
    }
  };

  const onDelete = () => {
    dispatch(openDeleteConfirmationModal(userId));
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
          <PersonIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {language === 'EN' ? 'Edit Profile' : 'Редактировать профиль'}
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                {...register('name', nameRegisterOptions(language))}
                label={language === 'EN' ? 'New Name' : 'Новое Имя'}
                type="text"
                autoFocus
                error={!!errors.name}
                helperText={errors.name?.message || ''}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                {...register('login', loginRegisterOptions(language))}
                label={language === 'EN' ? 'New Login' : 'Новый Логин'}
                type="text"
                error={!!errors.login}
                helperText={errors.login?.message || ''}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                {...register('password', passwordRegisterOptions(language))}
                label={language === 'EN' ? 'New Password' : 'Новый Пароль'}
                type="password"
                error={!!errors.password}
                helperText={errors.password?.message || ''}
              />
            </Grid>
          </Grid>
          <Box
            sx={{
              marginTop: 3,
              marginButton: 2,
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Button type="button" color="error" variant="contained" onClick={onDelete}>
              {language === 'EN' ? 'Delete' : 'Удалить'}
            </Button>
            <Button type="submit" color="success" variant="contained">
              {language === 'EN' ? 'Save' : 'Сохранить'}
            </Button>
          </Box>
        </Box>
      </Box>
      <DeleteConfirmationModal
        text={{ title: 'user', body: 'user' }}
        onDelete={(id) => {
          deleteUser(id).then(() => dispatch(clearUser()));
        }}
        id={userId}
      />
    </Container>
  );
}
