import { Button } from '@mui/material';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { currentLanguage } from 'components/header/langSlice';
import { openBoardModal } from './mainSlice';

export const CreateBoardButton = () => {
  const language = useAppSelector(currentLanguage);
  const dispatch = useAppDispatch();

  return (
    <Button
      variant="contained"
      size={'large'}
      startIcon={<DashboardRoundedIcon />}
      sx={{
        boxSizing: 'border-box',
        width: 300,
        height: 45,
        userSelect: 'none',
      }}
      onClick={() => {
        dispatch(openBoardModal());
      }}
    >
      {language === 'EN' ? 'Create board' : 'Создать доску'}
    </Button>
  );
};
