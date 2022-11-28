import { Button } from '@mui/material';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import { openCreateBoardModal } from './mainSlice';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { currentLanguage } from 'components/header/langSlice';

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
        dispatch(openCreateBoardModal());
      }}
    >
      {language === 'EN' ? 'Create board' : 'Создать доску'}
    </Button>
  );
};
