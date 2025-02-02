import { Route, Navigate, Routes } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Login from '../views/login/Login';
import { useAppSelector } from '../store/hooks';
import Layout from '../components/Layout/Layout.tsx';
import Cities from '../views/cities/cities.tsx';
import ErrorBoundary from '../components/ErrorBoundary.tsx';
import Loader from '../components/Loader.tsx';
import Rooms from '../views/rooms/Rooms.tsx';
import Home from '../views/home/Home.tsx';
import SearchPage from '../views/search/Search.tsx';

const Hotels = lazy(() => import('../views/hotels/hotels.tsx'));

const ProtectedRoute = ({ role, children }: { role: string; children: React.ReactElement }) => {
  const { user } = useAppSelector((state) => state.auth);

  if (!user) return <Navigate to='/login' replace />;
  if (user.userType !== role) return <Navigate to='/' replace />;
  return children;
};

const RedirectBasedOnRole = () => {
  const { user } = useAppSelector((state) => state.auth);
  if (user?.userType === 'Admin') {
    return <Navigate to='/admin' replace />;
  }
  if (user?.userType === 'User') {
    return <Navigate to='/user' replace />;
  }
  return <Navigate to='/login' replace />;
};

const PublicRoute = ({ children }: { children: React.ReactElement }) => {
  const { user } = useAppSelector((state) => state.auth);

  // Redirect authenticated users to their appropriate page
  if (user?.userType === 'Admin') {
    return <Navigate to='/admin' replace />;
  }
  if (user?.userType === 'User') {
    return <Navigate to='/user' replace />;
  }

  // Allow unauthenticated users to access the route
  return children;
};

export default function RoutesIndex() {
  return (
    <ErrorBoundary fallback={<h1>Something went wrong. Please try again later.</h1>}>
      <Suspense fallback={<Loader />}>
        <Routes>
          {/* Public Routes */}
          <Route
            path='/login'
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route path='/not-found' element={<>Not found</>} />

          {/* Authenticated Routes */}
          <Route path='/' element={<RedirectBasedOnRole />} />

          {/* Admin Routes */}
          <Route
            path='/admin'
            element={
              <ProtectedRoute role='Admin'>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route index element={<>Admin Home Page</>} />
            <Route path='manage-cities' element={<Cities />} />
            <Route path='manage-hotels' element={<Hotels />} />
            <Route path='manage-rooms' element={<Rooms />} />
          </Route>

          {/* User Routes */}
          <Route
            path='/user'
            element={
              <ProtectedRoute role='User'>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Home />} />
            <Route path='search' element={<SearchPage />} />
            <Route path='hotel/:hotelId' element={<>Trending Destinations</>} />
          </Route>

          {/* Fallback Route */}
          <Route path='*' element={<Navigate to='/not-found' replace />} />
        </Routes>
      </Suspense>
    </ErrorBoundary>
  );
}
