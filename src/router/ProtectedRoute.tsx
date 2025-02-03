import { useAppSelector } from '../store/hooks.ts';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ role, children }: { role: string; children: React.ReactElement }) => {
  const { user } = useAppSelector((state) => state.auth);

  if (!user) return <Navigate to='/login' replace />;
  if (user.userType !== role) return <Navigate to='/' replace />;
  return children;
};
export default ProtectedRoute;
