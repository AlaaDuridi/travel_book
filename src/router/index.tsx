import { lazy, Suspense, useEffect } from 'react';
import Login from '../views/login/Login';
import { useAppSelector } from '../store/hooks';
import Layout from '../components/Layout/Layout.tsx';
import Cities from '../views/cities/cities.tsx';
import ErrorBoundary from '../components/ErrorBoundary.tsx';
import Loader from '../components/Loader.tsx';
import Rooms from '../views/rooms/Rooms.tsx';
import Home from '../views/home/Home.tsx';
import SearchPage from '../views/search/Search.tsx';
import { QueryClient } from '@tanstack/react-query';
import { hotelLoader } from '../loaders/hotel.ts';
import HotelPage from '../views/hotel/Hotel.tsx';
import { createBrowserRouter, RouterProvider, Navigate, useLocation } from 'react-router-dom';
import { DecodedJWTUser } from '../util/getDecodedJWT.ts';
import { USER_TYPE } from '../constants/common.constants.ts';
import Checkout from '../views/checkout/Checkout.tsx';
import Confirmation from '../views/confirmation/Confirmation.tsx';

const Hotels = lazy(() => import('../views/hotels/hotels.tsx'));
const RoutesIndex = ({ queryClient }: { queryClient: QueryClient }) => {
  const { user } = useAppSelector((state) => state.auth);
  // Create the routes with loaders and protection
  const router = createBrowserRouter([
    {
      path: '/login',
      element: (
        <PublicRoute user={user}>
          <Login />
        </PublicRoute>
      ),
    },
    {
      path: '/',
      element: user ? <RedirectBasedOnRole user={user} /> : <Navigate to='/login' replace />,
    },
    {
      path: '/admin',
      element: user?.userType === USER_TYPE.ADMIN ? <Layout /> : <Navigate to='/' replace />,
      children: [
        { path: 'manage-cities', element: <Cities /> },
        { path: 'manage-hotels', element: <Hotels /> },
        { path: 'manage-rooms', element: <Rooms /> },
      ],
    },
    {
      path: '/user',
      element: user?.userType === USER_TYPE.USER ? <Layout /> : <Navigate to='/' replace />,
      children: [
        { path: '', element: <Home /> },
        { path: 'search', element: <SearchPage /> },
        {
          path: 'hotels/:hotelId',
          element: <HotelPage />,
          loader: hotelLoader(queryClient),
        },
        {
          path: 'checkout',
          element: <Checkout />,
        },
        {
          path: 'confirmation',
          element: <Confirmation />,
        },
      ],
    },
    {
      path: '/not-found',
      element: <div>Not found</div>,
    },
    {
      path: '*',
      element: <Navigate to='/not-found' replace />,
    },
  ]);

  return (
    <ErrorBoundary fallback={<h1>Something went wrong. Please try again later.</h1>}>
      <Suspense fallback={<Loader />}>
        <RouterProvider router={router} />
      </Suspense>
    </ErrorBoundary>
  );
};

const RedirectBasedOnRole = ({ user }: { user: DecodedJWTUser }) => {
  if (user?.userType === 'Admin') {
    return <Navigate to='/admin' replace />;
  }
  if (user?.userType === 'User') {
    return <Navigate to='/user' replace />;
  }
  return <Navigate to='/login' replace />;
};

const PublicRoute = ({
  user,
  children,
}: {
  user: DecodedJWTUser | null;
  children: React.ReactNode;
}) => {
  if (user?.userType === 'Admin') {
    return <Navigate to='/admin' replace />;
  }
  if (user?.userType === 'User') {
    return <Navigate to='/user' replace />;
  }
  return <>{children}</>;
};

export default RoutesIndex;
