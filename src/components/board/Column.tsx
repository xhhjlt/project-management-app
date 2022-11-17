import { Button, Divider, IconButton, Paper, Stack, Typography } from '@mui/material';
import { ColumnType, deleteBoardColumn } from './boardSlice';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import { useAppDispatch } from 'app/hooks';

const paperStyles = {
  boxSizing: 'border-box',
  minWidth: 300,
  p: 1,
  backgroundColor: '#f9fbe7', // '#f0f4c3',
};

const titleStyles = {
  pl: 1,
  fontWeight: 600,
  color: '#212121',
};

export const Column = ({ id, title }: ColumnType) => {
  const dispatch = useAppDispatch();

  return (
    <Paper sx={paperStyles}>
      <Stack direction="row" justifyContent={'space-between'} sx={{ p: 0.5, mb: 0.5 }}>
        <Typography sx={titleStyles}>{title}</Typography>
        <IconButton
          sx={{ p: 0 }}
          onClick={() => {
            dispatch(deleteBoardColumn({ id }));
          }}
        >
          <ClearOutlinedIcon
            sx={{
              color: '#616161',
              width: 20,
            }}
          />
        </IconButton>
      </Stack>
      <Divider variant="middle" />
      <Button
        variant="text"
        startIcon={<AddRoundedIcon />}
        sx={{
          color: '#616161',
          display: 'flex',
          margin: 'auto',
          width: '80%',
        }}
        // onClick={() => {
        //   dispatch(openColumnModal());
        // }}
      >
        Add item
      </Button>
    </Paper>
  );
};
