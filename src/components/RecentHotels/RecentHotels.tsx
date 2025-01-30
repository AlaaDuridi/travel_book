import { FC } from 'react';
import { Grid, useTheme, Typography } from '@mui/material';
import { RECENT_HOTELS } from '../../constants/recent-hotels.ts';
import RecentlyVisitedHotelCard from './RecentHotelCard.tsx';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';

const RecentlyVisitedHotels: FC = () => {
  //TODO: get the real data from the BE, skeleton loading while fetching

  const theme = useTheme();
  return (
    <Grid
      container
      id='recently-visited-hotels'
      justifyContent={'center'}
      sx={{ p: { xs: theme.spacing(2), sm: theme.spacing(4) } }}
      gap={1}
    >
      <Typography
        id={'landing-title'}
        component='h2'
        variant='h4'
        fontWeight={600}
        color='text.primary'
        sx={{ my: theme.spacing(2) }}
      >
        Recently Visited Hotels
      </Typography>
      <Swiper
        modules={[Pagination, Navigation, Autoplay]}
        navigation
        slidesPerView={3} // Number of slides visible
        loop={true}
        autoplay={{ delay: 3000 }}
        pagination={{ clickable: true }}
        breakpoints={{
          1024: { slidesPerView: 3 },
          768: { slidesPerView: 2 },
          480: { slidesPerView: 1 },
        }}
      >
        {RECENT_HOTELS.map((hotel, index) => (
          <SwiperSlide
            key={index}
            style={{
              display: 'flex',
              justifyContent: 'center',
              height: 'auto',
            }}
          >
            <RecentlyVisitedHotelCard hotel={hotel} />
          </SwiperSlide>
        ))}
      </Swiper>
    </Grid>
  );
};
export default RecentlyVisitedHotels;
