import { Button, InputBase, Link, Stack } from '@mui/material';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import { alpha, styled } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import { Link as RouterLink } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { searchBoard, setSearchBoard } from './mainSlice';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  border: `1px solid ${theme.palette.primary.main}`,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  right: 0,
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transform: 'rotate(90deg)',
  color: theme.palette.primary.main,
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: theme.palette.mode === 'dark' ? theme.palette.common.white : theme.palette.grey[900],
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 0, 1, 1),
    paddingRight: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '15ch',
      '&:focus': {
        width: '30ch',
      },
    },
    '&::placeholder': {
      textOverflow: 'ellipsis !important',
      color:
        theme.palette.mode === 'dark' ? theme.palette.primary.light : theme.palette.primary.dark,
    },
  },
}));

export const BackSearchGroup = () => {
  const searchValue = useAppSelector(searchBoard);
  const dispatch = useAppDispatch();

  return (
    <Stack direction="row" spacing={2}>
      <Link component={RouterLink} to="/">
        <Button variant="contained" sx={{ height: '98%' }}>
          <HomeRoundedIcon />
        </Button>
      </Link>
      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          type="text"
          value={searchValue}
          onChange={(e) => dispatch(setSearchBoard(e.target.value))}
          placeholder="Search…"
          inputProps={{ 'aria-label': 'search' }}
        />
      </Search>
    </Stack>
  );
};
