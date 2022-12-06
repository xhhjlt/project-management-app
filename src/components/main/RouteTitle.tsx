import { useTheme } from '@mui/material';
import { Typography } from '@mui/material';
import { useAppSelector } from 'app/hooks';
import { currentLanguage } from 'components/header/langSlice';

export const RouteTitle = () => {
  const language = useAppSelector(currentLanguage);
  const theme = useTheme();
  return (
    <Typography
      variant="h4"
      sx={{
        color:
          theme.palette.mode === 'dark' ? theme.palette.primary.light : theme.palette.grey[900],
        cursor: 'pointer',
        p: '0.5rem 1rem',
      }}
    >
      {language === 'EN' ? 'Boards' : 'Доски'}
    </Typography>
  );
};
