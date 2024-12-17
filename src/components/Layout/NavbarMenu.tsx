import { FC, useState, MouseEvent } from 'react';
import { IconButton, Divider, MenuItem, Menu, Fade } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import NavbarLink from './NavbarLink.tsx';
import { INavbarLinkProps, INavbarProps } from './Layout.types.ts';

const NavbarMenu: FC<INavbarProps> = ({ topLinks, bottomLinks }) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleMenuOpen = (event: MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const renderMenuItems = (links: INavbarLinkProps[]) =>
    links.map((link, index) => (
      <MenuItem key={index} onClick={handleMenuClose}>
        <NavbarLink {...link} />
      </MenuItem>
    ));

  return (
    <>
      <IconButton
        aria-controls={anchorEl ? 'navbar-menu' : undefined}
        aria-haspopup='true'
        aria-expanded={Boolean(anchorEl)}
        onClick={handleMenuOpen}
        color='inherit'
      >
        <MenuIcon />
      </IconButton>

      <Menu
        id='navbar-menu'
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        TransitionComponent={Fade}
      >
        {topLinks.length > 0 && renderMenuItems(topLinks)}
        {topLinks.length > 0 && topLinks.length > 0 && <Divider />}
        {bottomLinks.length > 0 && renderMenuItems(bottomLinks)}
      </Menu>
    </>
  );
};

export default NavbarMenu;
