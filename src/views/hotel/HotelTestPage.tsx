import { useParams } from 'react-router-dom';
import { useHotelData } from '../../hooks/useHotelData.tsx';

const HotelTestPage = () => {
  const { hotelId } = useParams<{ hotelId: string }>(); // Get hotelId from URL params
  console.log(hotelId);

  const { data, isLoading, isError } = useHotelData(Number(hotelId));
  console.log('data is', data);
  console.log('isLoading is', isLoading);
  console.log('isError is', isError);
  return (
    <div>
      <h1>Hotel Test Page</h1>
    </div>
  );
};
export default HotelTestPage;
