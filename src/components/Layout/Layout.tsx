import { FC } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Container,
  useTheme,
  GlobalStyles,
  useMediaQuery,
  Grid,
  IconButton,
  Link as MuiLink,
} from '@mui/material';
import { useNavigate, Outlet } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAppSelector, useAppDispatch } from '../../store/hooks.ts';
import { signout } from '../../store/auth/authSlice.ts';
import ThemeToggleMenu from './ThemeToggleMenu.tsx';
import { INavbarLinkProps } from './Layout.types.ts';
import NavbarList from './NavbarList.tsx';
import NavbarMenu from './NavbarMenu.tsx';
import CheckoutBadge from './CheckoutBadge.tsx';
import Logo from '/logo.png';
import { Link } from 'react-router-dom';
import { GitHub, LinkedIn, Code } from '@mui/icons-material';

const Layout: FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { user } = useAppSelector((state) => state.auth);
  const { bookedRooms } = useAppSelector((state) => state.cart);

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
                <CheckoutBadge numberOfBookedRooms={bookedRooms.length} />
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
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      <GlobalStyles
        styles={{
          body: {
            background: theme.palette.background.default,
            color: theme.palette.text.primary,
            margin: 0,
            padding: 0,
          },
        }}
      />
      <AppBar position='sticky' sx={{ background: theme.palette.primary.main }}>
        <Container maxWidth='xl'>
          <Toolbar>
            {!isMobile ? (
              <>
                <Grid container item xs={10}>
                  <NavbarList links={LEFT_LINKS} sx={{ justifyContent: 'flex-start' }} />
                </Grid>
                <Grid
                  container
                  item
                  xs={3}
                  justifyContent={'center'}
                  alignItems={'center'}
                  direction={'row'}
                >
                  <Grid item justifyContent={'center'}>
                    <ThemeToggleMenu />
                  </Grid>
                  <Grid item justifyContent={'center'}>
                    <NavbarList links={RIGHT_LINKS} sx={{ justifyContent: 'center' }} />
                  </Grid>
                </Grid>
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
      <Box sx={{ flex: 1 }}>
        <Outlet />
      </Box>
      <footer>
        <Container
          sx={(theme) => ({
            background: theme.palette.primary.main,
            color: theme.palette.secondary.main,
            minWidth: '100%',
          })}
          maxWidth='xl'
        >
          <Grid container alignItems='center' justifyContent='space-around' spacing={3} p={3}>
            <Grid container item xs={12} sm={6} direction='column' gap={2}>
              <Grid
                item
                container
                alignItems={'center'}
                justifyContent={isMobile ? 'center' : 'start'}
                direction={'row'}
              >
                <Box component={'img'} sx={{ width: '60px', height: '60px' }} src={Logo} />
                <Typography variant={'h5'} textAlign={isMobile ? 'center' : 'start'}>
                  TripEase
                </Typography>
              </Grid>
              <Typography
                variant='body2'
                color='text.secondary'
                textAlign={isMobile ? 'center' : 'start'}
              >
                {'Copyright © '}
                <MuiLink
                  color={theme.palette.bright.main}
                  component={Link}
                  to={'https://www.linkedin.com/in/alaa-duridi-91743a203/'}
                  target='_blank'
                >
                  Alaa Duridi&nbsp;
                </MuiLink>
                {new Date().getFullYear()}
              </Typography>
            </Grid>
            <Grid
              item
              container
              justifyContent={isMobile ? 'center' : 'flex-end'}
              spacing={1}
              xs={12}
              sm={5}
            >
              <IconButton
                href='https://github.com/AlaaDuridi'
                target='_blank'
                aria-label='X'
                sx={{ alignSelf: 'center' }}
                color={'secondary'}
              >
                <GitHub />
              </IconButton>
              <IconButton
                href='https://www.linkedin.com/in/alaa-duridi-91743a203/'
                target='_blank'
                aria-label='LinkedIn'
                sx={{ alignSelf: 'center' }}
                color={'secondary'}
              >
                <LinkedIn />
              </IconButton>
              <IconButton
                href='https://leetcode.com/u/alaa_duridi/'
                target='_blank'
                aria-label='Facebook'
                sx={{ alignSelf: 'center' }}
                color={'secondary'}
              >
                <Code />
              </IconButton>
            </Grid>
          </Grid>
        </Container>
      </footer>
    </Box>
  );
};

export default Layout;
