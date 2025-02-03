import { FC } from 'react';
import { Grid, Typography, Stack, Avatar, useTheme } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { IHotelReview } from '../../types/models/hotel.model.ts';
import { truncateText } from '../../util/common.utils.ts';
import { Star } from '@mui/icons-material';
import { stringToColor } from '../../util/stringToColor.ts';

interface IReviewsProps {
  reviews: IHotelReview[];
}

const Reviews: FC<IReviewsProps> = ({ reviews }) => {
  const theme = useTheme();
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
        Customers Reviews
      </Typography>
      <Swiper
        modules={[Pagination, Navigation, Autoplay]}
        slidesPerView={1}
        loop={true}
        autoplay={{ delay: 3000 }}
        pagination={{ clickable: true }}
      >
        {reviews.map((review, index) => (
          <SwiperSlide
            key={index}
            style={{
              display: 'flex',
              justifyContent: 'center',
              height: 'auto',
            }}
          >
            <Stack
              p={2}
              gap={2}
              justifyContent='space-between'
              height='fit-content'
              maxHeight='160px'
            >
              <Typography variant='body1'>“{truncateText(review.description, 100)}”</Typography>
              <Stack direction='row' justifyContent='space-between' alignItems='center'>
                <Typography>
                  <Stack direction='row' justifyContent='space-between' alignItems='center' gap={1}>
                    <Avatar
                      sx={{
                        width: 32,
                        height: 32,
                        fontSize: '1rem',
                        backgroundColor: stringToColor(review.customerName),
                      }}
                      children={`${review.customerName[0]}${review.customerName.split(' ')[1][0]}`}
                    />
                    {review.customerName}
                  </Stack>
                </Typography>
                <Stack direction='row' justifyContent='space-between' alignItems='center'>
                  {Array.from({ length: review.rating }).map((_, index) => (
                    <Star key={index} color='secondary' />
                  ))}
                  {review.rating}
                </Stack>
              </Stack>
            </Stack>
          </SwiperSlide>
        ))}
      </Swiper>
    </Grid>
  );
};
export default Reviews;
