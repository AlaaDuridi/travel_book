import { Link as MuiLink } from '@mui/material';
import { FC } from 'react';
import { Link } from 'react-scroll';
import { NavLink } from 'react-router-dom';
import { INavbarLinkProps } from './Layout.types.ts';

const linkStyle = {
  color: 'inherit',
  textDecoration: 'none',
  cursor: 'pointer',
};
const NavbarLink: FC<INavbarLinkProps> = ({ onClick, href = '/', sx, scrollTo, children }) => {
  // Conditionally use react-scroll or react-router-dom's Link
  return scrollTo ? (
    <Link to={scrollTo} smooth duration={500} offset={-70} style={linkStyle}>
      <MuiLink component='span' variant='h6' sx={{ ...linkStyle, ...sx }} onClick={onClick}>
        {children}
      </MuiLink>
    </Link>
  ) : (
    <NavLink to={href} style={linkStyle}>
      <MuiLink
        component='a'
        variant='h6'
        sx={{ ...linkStyle, ...sx }}
        onClick={onClick}
        href={href}
        underline='none'
      >
        {children}
      </MuiLink>
    </NavLink>
  );
};
export default NavbarLink;
