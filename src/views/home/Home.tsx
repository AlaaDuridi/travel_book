import { FC } from 'react';
import Hero from '../../components/Hero/Hero.tsx';
import FeaturedDeals from '../../components/FeaturedDeals';
import RecentlyVisitedHotels from '../../components/RecentHotels';
import TrendingDestinations from '../../components/TrendingDestinations';
import SearchForm from '../../components/Search/SearchForm.tsx';

const Home: FC = () => {
  return (
    <>
      <Hero />
      <SearchForm />
      <FeaturedDeals />
      <TrendingDestinations />
      <RecentlyVisitedHotels />
    </>
  );
};
export default Home;
