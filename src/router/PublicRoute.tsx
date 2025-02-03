import { useAppSelector } from '../store/hooks.ts';
import { Navigate } from 'react-router-dom';

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
export default PublicRoute;
