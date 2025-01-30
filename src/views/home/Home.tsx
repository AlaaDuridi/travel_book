import { FC } from 'react';
import Hero from '../../components/Hero/Hero.tsx';
import FeaturedDeals from '../../components/FeaturedDeals';
import RecentlyVisitedHotels from '../../components/RecentHotels';
import TrendingDestinations from '../../components/TrendingDestinations';

const Home: FC = () => {
  return (
    <>
      <Hero />
      <FeaturedDeals />
      <TrendingDestinations />
      <RecentlyVisitedHotels />
    </>
  );
};
export default Home;
