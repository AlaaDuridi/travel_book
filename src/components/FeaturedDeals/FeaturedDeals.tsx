import { FC } from 'react';
import { Grid, Typography, useTheme } from '@mui/material';
import { FEATURED_DEALS } from '../../constants/featured-deals.ts';
import FeaturedDealCard from './FeaturedDealCard.tsx';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const FeaturedDeals: FC = () => {
  const theme = useTheme();
  //get feature deals from the api, use skeleton loading

  return (
    <Grid
      container
      id='featured-deals'
      sx={{ p: { xs: 2, sm: 4 } }}
      justifyContent={'center'}
      gap={1}
    >
      <Typography
        component='h2'
        variant='h4'
        fontWeight={600}
        color='text.primary'
        sx={{ my: theme.spacing(2) }}
        id={'landing-title'}
      >
        Featured Deals
      </Typography>
      <Swiper
        modules={[Pagination, Navigation, Autoplay]}
        navigation
        slidesPerView={4}
        loop={true}
        autoplay={{ delay: 3000 }}
        pagination={{ clickable: true }}
        breakpoints={{
          2048: { slidesPerView: 4 },
          1024: { slidesPerView: 3 },
          768: { slidesPerView: 2 },
          480: { slidesPerView: 1 },
        }}
      >
        {FEATURED_DEALS.map((deal, index) => (
          <SwiperSlide
            key={index}
            style={{
              display: 'flex',
              justifyContent: 'center',
              height: 'auto',
            }}
          >
            <FeaturedDealCard key={deal.hotelId} deal={deal} />
          </SwiperSlide>
        ))}
      </Swiper>
    </Grid>
  );
};
export default FeaturedDeals;
