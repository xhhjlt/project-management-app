import { Typography } from '@mui/material';
import { useAppSelector } from 'app/hooks';
import { currentLanguage } from 'components/header/langSlice';

export const RouteTitle = () => {
  const language = useAppSelector(currentLanguage);
  return (
    <Typography
      variant="h4"
      sx={{
        color: '#212121',
        cursor: 'pointer',
        p: '0.5rem 1rem',
      }}
    >
      {language === 'EN' ? 'Boards' : 'Доски'}
    </Typography>
  );
};
