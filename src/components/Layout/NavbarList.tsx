import { INavbarListProps } from './Layout.types.ts';
import { FC } from 'react';
import { Grid } from '@mui/material';
import NavbarLink from './NavbarLink.tsx';

const NavbarList: FC<INavbarListProps> = ({ links, sx }) => {
  return (
    <Grid container item gap={3} sx={sx} alignItems='center'>
      {links.map((link, index) => {
        return (
          <Grid item key={index}>
            <NavbarLink {...link} />
          </Grid>
        );
      })}
    </Grid>
  );
};
export default NavbarList;
