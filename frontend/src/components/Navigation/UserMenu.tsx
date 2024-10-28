import { Tooltip, IconButton, Avatar, Menu, MenuItem, Typography } from '@mui/material';
import React, { useCallback } from 'react';
import { USER_MENU_OPTIONS } from './constants';

export function UserMenu() {
  const [anchorElement, setAnchorElement] = React.useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElement(event.currentTarget);
  };

  const handleCloseUserMenu = useCallback(() => {
    setAnchorElement(null);
  }, []);

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
        {USER_MENU_OPTIONS.map((setting) => (
          <MenuItem key={setting} onClick={handleCloseUserMenu}>
            <Typography sx={{ textAlign: 'center' }}>{setting}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
