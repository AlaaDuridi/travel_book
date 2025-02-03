import { FC } from 'react';
import {
  Card,
  CardMedia,
  CardActions,
  Rating,
  Stack,
  Typography,
  CardContent,
  Button,
  useTheme,
} from '@mui/material';
import { IFeaturedDeal } from '../../types/models/home.model.ts';
import { truncateText } from '../../util/common.utils.ts';
import RoomIcon from '@mui/icons-material/Room';
import ApartmentIcon from '@mui/icons-material/Apartment';
import { Link } from 'react-router-dom';

interface IFeaturedDealCardProps {
  deal: IFeaturedDeal;
}

const FeaturedDealCard: FC<IFeaturedDealCardProps> = ({ deal }) => {
  const theme = useTheme();
  return (
    <>
      <Card sx={{ mb: theme.spacing(7), mx: theme.spacing(4) }}>
        <CardMedia
          component={'img'}
          alt={'featured deal image'}
          height={'250rem'}
          image={deal.roomPhotoUrl}
          sx={{ objectFit: 'cover' }}
        />

        <CardContent>
          <Typography gutterBottom variant={'h5'}>
            {deal.title}
          </Typography>

          <Typography variant={'body2'}>{truncateText(deal.description, 100)}</Typography>

          <Stack
            direction='row'
            mt={theme.spacing(1)}
            alignItems='center'
            justifyContent='space-between'
            sx={{ flexWrap: 'wrap' }}
          >
            <Stack direction={'row'} alignItems={'center'} gap={theme.spacing(1)}>
              <RoomIcon />
              <Typography variant={'h6'} color={'secondary'}>
                {deal.cityName}
              </Typography>
            </Stack>
            <Rating name={'feature deal star rating'} value={deal.hotelStarRating} readOnly />
          </Stack>

          <Stack
            direction={'row'}
            alignItems={'center'}
            justifyContent={'space-between'}
            mt={theme.spacing(1)}
          >
            <Stack direction={'row'} alignItems={'center'} gap={theme.spacing(1)}>
              <ApartmentIcon />
              <Typography variant={'h6'} color={'secondary'}>
                {deal.hotelName}
              </Typography>
            </Stack>

            <Typography variant='h6' color='red'>
              <Typography
                variant='h6'
                component='span'
                color='text.secondary'
                fontSize={14}
                mr={1}
                sx={{ textDecoration: 'line-through' }}
              >
                {deal.originalRoomPrice}$
              </Typography>
              {deal.finalPrice}$
            </Typography>
          </Stack>
        </CardContent>
        <CardActions>
          <Button
            size='small'
            variant='contained'
            color='primary'
            component={Link}
            to={`hotels/${deal.hotelId}`}
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

export default FeaturedDealCard;
