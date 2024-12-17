import { FC } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Container,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAppSelector, useAppDispatch } from '../../store/hooks.ts';
import { signout } from '../../store/auth/authSlice.ts';
import ThemeToggleMenu from './ThemeToggleMenu.tsx';
import { INavbarLinkProps } from './Layout.types.ts';
import NavbarList from './NavbarList.tsx';
import NavbarMenu from './NavbarMenu.tsx';
import CheckoutBadge from './CheckoutBadge.tsx';
import Logo from '/logo.png';

const Layout: FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { user } = useAppSelector((state) => state.auth);
  const handleLogout = () => {
    dispatch(signout());
    navigate('/login');
  };

  const isUser = user?.userType === 'User';
  const isAdmin = user?.userType === 'Admin';

  const LEFT_LINKS: INavbarLinkProps[] = [
    {
      children: (
        <>
          <Box component={'img'} sx={{ width: '60px', height: '60px' }} src={Logo} />
          <Typography mt={-2} ml={1} variant='h6'>
            TripEase
          </Typography>
        </>
      ),
    },
    ...((isAdmin
      ? [
          { href: '/admin/manage-hotels', children: 'Hotels' },
          { href: '/admin/manage-cities', children: 'Cities' },
          { href: '/admin/manage-rooms', children: 'Rooms' },
        ]
      : [
          { scrollTo: 'featured-deals', children: 'Featured Deals' },
          { scrollTo: 'recently-visited-hotels', children: 'Recently Visited Hotels' },
          { scrollTo: 'trending-destinations', children: 'Trending Destinations' },
        ]) as INavbarLinkProps[]),
  ];

  const RIGHT_LINKS: INavbarLinkProps[] = [
    ...(isUser
      ? [
          {
            href: '/user/checkout',
            children: (
              <Typography variant='h6' sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <CheckoutBadge numberOfBookedRooms={5} />
                Checkout
              </Typography>
            ),
          },
        ]
      : []),
    {
      onClick: handleLogout,
      href: '/login',
      children: (
        <Typography variant='h6' sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <LogoutIcon />
          Logout
        </Typography>
      ),
    },
  ];

  return (
    <AppBar position='sticky'>
      <Container maxWidth='xl'>
        <Toolbar>
          {!isMobile ? (
            <>
              <NavbarList links={LEFT_LINKS} sx={{ justifyContent: 'flex-start' }} />
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, marginLeft: 'auto' }}>
                <ThemeToggleMenu />
                <NavbarList links={RIGHT_LINKS} sx={{ justifyContent: 'flex-end' }} />
              </Box>
            </>
          ) : (
            <>
              <NavbarList links={[LEFT_LINKS[0]]} />
              <ThemeToggleMenu />
              <NavbarMenu topLinks={LEFT_LINKS.slice(1)} bottomLinks={RIGHT_LINKS} />
            </>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Layout;
