import { Route, Routes } from 'react-router-dom';
import Login from '../views/login/Login.tsx';

export default function RoutesIndex() {
  return (
    <Routes>
      <Route path='/login' element={<Login />} />
    </Routes>
  );
}
