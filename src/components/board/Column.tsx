import { Button, Divider, IconButton, Paper, Stack, Typography, Badge, Box } from '@mui/material';
import { ColumnType, openDeleteColumnModal, openItemModal, selectBoardColumns } from './boardSlice';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { Item } from './Item';

const paperStyles = {
  boxSizing: 'border-box',
  width: 340,
  p: '12px',
  backgroundColor: '#f9fbe7', // '#f0f4c3',
  display: 'flex',
  flexDirection: 'column',
};

const titleStyles = {
  fontWeight: 600,
  color: '#212121',
  cursor: 'pointer',
  '&:focus': {
    outline: `2px solid #bdbdbd`,
    backgroundColor: '#fff',
    borderRadius: '4px',
    p: '0 0.5rem',
  },
};

export const Column = ({ id, title }: ColumnType) => {
  const dispatch = useAppDispatch();
  const boardColumns = useAppSelector(selectBoardColumns);
  const column = boardColumns.find((el) => el.id === id);

  return (
    <Paper sx={paperStyles}>
      <Stack direction="row" justifyContent={'space-between'} sx={{ p: 1, mb: 1 }}>
        <Stack direction="row" spacing={3}>
          <Typography sx={titleStyles} contentEditable={true}>
            {title}
          </Typography>
          <Badge
            badgeContent={column?.items?.length}
            color="primary"
            sx={{
              top: 12,
            }}
          ></Badge>
        </Stack>
        <IconButton
          sx={{ p: 0 }}
          onClick={() => {
            dispatch(openDeleteColumnModal({ id }));
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
      <Stack gap={1} mt={1} mb={1}>
        {column!.items!.length > 0 &&
          column?.items?.map((item) => {
            return (
              <Item key={item.id} id={item.id} title={item.title} description={item.description} />
            );
          })}
      </Stack>
      <Button
        variant="text"
        startIcon={<AddRoundedIcon />}
        sx={{
          color: '#616161',
          display: 'flex',
          m: '0 auto',
          width: '80%',
          mt: 'auto',
        }}
        onClick={() => {
          dispatch(openItemModal({ id }));
        }}
      >
        Add item
      </Button>
    </Paper>
  );
};
