import { FC } from 'react';
import { Box, Grid, Typography, useTheme } from '@mui/material';
import { TRENDING_DESTINATIONS } from '../../constants/trending-destinations.ts';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import SlideContent from './SlideContent.tsx';

const TrendingDestinations: FC = () => {
  //TODO:get them from the BE
  const theme = useTheme();
  return (
    <>
      <Grid
        container
        id={'trending-destinations'}
        justifyContent={'center'}
        sx={{ p: { xs: theme.spacing(2), sm: theme.spacing(4) } }}
      >
        <Box
          sx={{
            backgroundColor: theme.palette.grey[100],
            borderRadius: theme.spacing(2),
            textAlign: 'center',
            maxWidth: '80%',
            m: 'auto',
            p: { xs: theme.spacing(2), sm: theme.spacing(4) },
          }}
        >
          <Grid container item justifyContent={'center'} alignItems={'center'}>
            <Typography variant={'h4'} fontWeight={'bold'} id={'landing-title'}>
              Trending Destinations
            </Typography>
          </Grid>
          <Swiper
            modules={[Pagination, EffectFade, Autoplay]}
            loop={true}
            effect={'fade'}
            autoplay={{ delay: 3000 }}
            pagination={{ clickable: true }}
          >
            {TRENDING_DESTINATIONS.map((destination, index) => (
              <SwiperSlide key={index}>
                <SlideContent destination={destination} />
              </SwiperSlide>
            ))}
          </Swiper>
        </Box>
      </Grid>
    </>
  );
};
export default TrendingDestinations;
