import { FC } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Container,
  Button,
  useTheme,
  useMediaQuery,
  Hidden,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useAppSelector, useAppDispatch } from '../../store/hooks.ts';
import { signout } from '../../store/auth/authSlice.ts';
import ThemeToggleMenu from './ThemeToggleMenu.tsx';
import { INavbarLinkProps } from './Layout.types.ts';
import Logo from '/logo.png';
import NavbarList from './NavbarList.tsx';
import NavbarMenu from './NavbarMenu.tsx';

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
      href: '/',
      children: (
        <>
          <Box component={'img'} sx={{ width: '60px', height: '60px' }} src={Logo} />
          <Typography mt={-2} ml={1} variant='h6' component='div'>
            GoGo
          </Typography>
        </>
      ),
    },
    ...(isAdmin
      ? [
          {
            href: '/admin/manage-hotels',
            children: <Typography variant={'h6'}>Hotels</Typography>,
          },
          {
            href: '/admin/manage-cities',
            children: <Typography variant={'h6'}>Cities</Typography>,
          },
          {
            href: '/admin/manage-rooms',
            children: <Typography variant={'h6'}>Rooms</Typography>,
          },
        ]
      : [
          {
            scrollTo: 'featured-deals',
            children: <Typography variant={'h6'}>Featured Deals</Typography>,
          },
          {
            scrollTo: 'recently-visited-hotels',
            children: <Typography variant={'h6'}>Recently Visited Hotels</Typography>,
          },
          {
            scrollTo: 'trending-destinations',
            children: <Typography variant={'h6'}>Trending Destinations</Typography>,
          },
        ]),
  ];

  const RIGHT_LINKS: INavbarLinkProps[] = [
    ...(isUser
      ? [
          {
            href: '/user/checkout',
            children: (
              <Typography
                variant='h6'
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 1,
                }}
              >
                <ShoppingCartIcon />
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
        <Typography
          variant='h6'
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 1,
          }}
        >
          <LogoutIcon />
          Logout
        </Typography>
      ),
    },
  ];
  return (
    <>
      {/* AppBar */}
      <AppBar position='sticky'>
        <Container maxWidth='xl'>
          <Toolbar>
            {!isMobile && (
              <>
                <NavbarList links={LEFT_LINKS} sx={{ justifyContent: 'flex-start' }} />
                <Box
                  sx={{
                    display: { xs: 'none', md: 'flex' },
                    alignItems: 'center',
                    gap: 3,
                  }}
                >
                  <ThemeToggleMenu />
                  <NavbarList links={RIGHT_LINKS} sx={{ justifyContent: 'flex-end' }} />
                </Box>
              </>
            )}
            {isMobile && (
              <>
                <NavbarList links={[LEFT_LINKS[0]]} />
                <ThemeToggleMenu />
                <NavbarMenu topLinks={LEFT_LINKS.slice(1)} bottomLinks={RIGHT_LINKS} />
              </>
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
};
export default Layout;
