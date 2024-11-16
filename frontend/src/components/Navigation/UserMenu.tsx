import { Tooltip, IconButton, Avatar, Menu, MenuItem, Typography } from '@mui/material';
import React, { useCallback } from 'react';
import { ANONYMOUS_USER_MENU_OPTIONS, LOGGED_IN_USER_MENU_OPTIONS, MENU_OPTION } from './constants';
import { useAuth } from '../../providers/AuthProvider';
import { useNavigate } from 'react-router-dom';

export function UserMenu() {
  const { auth } = useAuth();
  const [anchorElement, setAnchorElement] = React.useState<null | HTMLElement>(null);
  const navigate = useNavigate();

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElement(event.currentTarget);
  };

  const handleCloseUserMenu = useCallback(() => {
    setAnchorElement(null);
  }, []);

  const handleMenuOptionClicked = useCallback(
    (option: MENU_OPTION) => {
      handleCloseUserMenu();
      navigate(option.route);
    },
    [handleCloseUserMenu, navigate]
  );

  const MENU_OPTIONS: MENU_OPTION[] = auth.token
    ? LOGGED_IN_USER_MENU_OPTIONS
    : ANONYMOUS_USER_MENU_OPTIONS;

  return (
    <>
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar alt="User" />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: '45px' }}
        anchorEl={anchorElement}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        open={Boolean(anchorElement)}
        onClose={handleCloseUserMenu}>
        {MENU_OPTIONS.map((menuOption) => (
          <MenuItem key={menuOption.route} onClick={() => handleMenuOptionClicked(menuOption)}>
            <Typography sx={{ textAlign: 'center' }}>{menuOption.label}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
