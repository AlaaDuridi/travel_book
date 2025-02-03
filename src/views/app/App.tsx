import './App.css';
import { useEffect } from 'react';
import RoutesIndex from '../../router';
import { useAppDispatch } from '../../store/hooks';
import { fetchCities } from '../../store/cities/citySlice';
import { fetchHotelsAsync } from '../../store/hotels/hotelSlice.ts';
import { QueryClient } from '@tanstack/react-query';

function App({ queryClient }: { queryClient: QueryClient }) {
  // const dispatch = useAppDispatch();
  //
  // useEffect(() => {
  //   dispatch(fetchCities({ searchQuery: '', pageSize: 10, pageNumber: 1 }));
  //   dispatch(fetchHotelsAsync({ searchQuery: '', pageSize: 20, pageNumber: 1 }));
  // }, [dispatch]);

  return (
    <>
      <RoutesIndex queryClient={queryClient} />
    </>
  );
}

export default App;
