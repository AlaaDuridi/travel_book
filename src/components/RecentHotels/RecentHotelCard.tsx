import { FC } from 'react';
import {
  Button,
  useTheme,
  Card,
  CardActions,
  Stack,
  Typography,
  CardMedia,
  CardContent,
  Rating,
} from '@mui/material';
import { Room, Apartment } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { IRecentlyVisitedHotel } from '../../types/models/home.model.ts';

interface IRecentlyVisitedHotelCardProps {
  hotel: IRecentlyVisitedHotel;
}

const RecentlyVisitedHotelCard: FC<IRecentlyVisitedHotelCardProps> = ({ hotel }) => {
  const theme = useTheme();
  return (
    <>
      <Card sx={{ mb: theme.spacing(7), mx: theme.spacing(4) }}>
        <CardMedia
          component={'img'}
          alt={'recently visited hotel image'}
          sx={{ objectFit: 'cover' }}
          height={'250rem'}
          image={hotel.thumbnailUrl}
        />

        <CardContent>
          <Stack direction='row' mb={theme.spacing(2)} gap={theme.spacing(2)} alignItems='center'>
            <Typography gutterBottom variant='h5' m={0}>
              {hotel.hotelName}
            </Typography>
            <Typography variant='subtitle2' color='secondary'>
              {hotel.visitDate}
            </Typography>
          </Stack>

          <Stack
            direction={'row'}
            alignItems={'center'}
            justifyContent={'space-between'}
            m={theme.spacing(2)}
          >
            <Stack direction={'row'} alignItems={'center'} gap={1}>
              <Room />
              <Typography variant={'h6'} color={'secondary'}>
                {hotel.cityName}
              </Typography>
            </Stack>
            <Rating name={'recently visited hotel star rating'} value={hotel.starRating} readOnly />
          </Stack>

          <Stack
            direction='row'
            alignItems='center'
            justifyContent='space-between'
            mt={theme.spacing(1)}
          >
            <Stack direction={'row'} alignItems={'center'} gap={1}>
              <Apartment />
              <Typography variant={'h6'} color={'secondary'}>
                {hotel.hotelName}
              </Typography>
            </Stack>
            <Typography variant='h6' color='red'>
              <Typography
                variant='h6'
                component='span'
                fontSize={14}
                color='secondary'
                mr={theme.spacing(1)}
              >
                {hotel.priceUpperBound}$ -
              </Typography>
              {hotel.priceLowerBound}$
            </Typography>
          </Stack>
        </CardContent>

        <CardActions>
          <Button
            size='small'
            variant='contained'
            color='primary'
            component={Link}
            to={`hotel/${hotel.hotelId}`}
            sx={{
              m: 'auto',
              mb: theme.spacing(2),
            }}
          >
            Show more details
          </Button>
        </CardActions>
      </Card>
    </>
  );
};
export default RecentlyVisitedHotelCard;
