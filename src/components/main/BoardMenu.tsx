import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import Menu, { MenuProps } from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit';
import Divider from '@mui/material/Divider';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { IconButton } from '@mui/material';
import { useAppDispatch } from 'app/hooks';
import { openDeleteConfirmationModal } from 'components/common/commonSlice';
import { useDeleteBoardMutation } from 'services/api/boards';

const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color: theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '&:active': {
        backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
      },
    },
  },
}));

const iconStyles = {
  color: 'text.secondary',
  mr: 1.5,
  fontSize: 18,
};

const iconDeleteStyles = {
  mr: 1.5,
  fontSize: 18,
};

export const BoardMenu = (props: { id: string }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const dispatch = useAppDispatch();
  const [deleteBoard] = useDeleteBoardMutation();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    event.stopPropagation();
  };
  const handleClose = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(null);
    event.stopPropagation();
  };

  const handleDelete = (event: React.MouseEvent<HTMLElement>) => {
    dispatch(
      openDeleteConfirmationModal({
        text: { titleEn: 'board', titleRus: 'доску', bodyEn: 'board', bodyRus: 'эту доску' },
        onDelete: () => deleteBoard(props.id),
      })
    );
    handleClose(event);
  };

  return (
    <div>
      <IconButton onClick={handleClick}>
        <MoreHorizIcon />
      </IconButton>
      <StyledMenu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem onClick={handleClose} disableRipple>
          <EditIcon sx={iconStyles} />
          Edit
        </MenuItem>
        <MenuItem onClick={handleClose} disableRipple>
          <FileCopyIcon sx={iconStyles} />
          Duplicate
        </MenuItem>
        <Divider sx={{ my: 0.5 }} />
        <MenuItem onClick={handleDelete} sx={{ color: '#f44336' }} disableRipple>
          <DeleteRoundedIcon sx={iconDeleteStyles} color="secondary" />
          Delete
        </MenuItem>
      </StyledMenu>
    </div>
  );
};
