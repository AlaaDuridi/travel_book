import './App.css';
import { useEffect } from 'react';
import RoutesIndex from '../../router';
import { useAppDispatch } from '../../store/hooks';
import { fetchCities } from '../../store/cities/citySlice';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCities({ searchQuery: '', pageSize: 10, pageNumber: 1 }));
  }, [dispatch]);

  return (
    <>
      <RoutesIndex />
    </>
  );
}

export default App;
