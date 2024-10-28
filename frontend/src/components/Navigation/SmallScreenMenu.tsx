import { Box, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import React, { useCallback, useMemo } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import { MAIN_PAGES } from './constants';

interface SmallScreenMenuProps {
  anchorElement: null | HTMLElement;
  setAnchorElement: (anchorElement: HTMLElement | null) => void;
}

export default function SmallScreenMenu({ anchorElement, setAnchorElement }: SmallScreenMenuProps) {
  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElement(event.currentTarget);
  };

  const handleCloseNavMenu = useCallback(() => {
    setAnchorElement(null);
  }, [setAnchorElement]);

  const menuPages = useMemo(
    () =>
      MAIN_PAGES.map((page) => (
        <MenuItem key={page} onClick={handleCloseNavMenu}>
          <Typography sx={{ textAlign: 'center' }}>{page}</Typography>
        </MenuItem>
      )),
    [handleCloseNavMenu]
  );

  return (
    <>
      <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
        <IconButton size="large" onClick={handleOpenNavMenu} color="inherit">
          <MenuIcon />
        </IconButton>
        <Menu
          anchorEl={anchorElement}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left'
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left'
          }}
          open={Boolean(anchorElement)}
          onClose={handleCloseNavMenu}
          sx={{ display: { xs: 'block', md: 'none' } }}>
          {menuPages}
        </Menu>
      </Box>
    </>
  );
}
