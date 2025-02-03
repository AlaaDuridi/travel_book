import { FC } from 'react';
import {
  Button,
  Card,
  CardActions,
  useTheme,
  CardContent,
  CardMedia,
  Rating,
  Stack,
  Typography,
  Box,
} from '@mui/material';
import { IHomeResult } from '../../types/models/home.model.ts';
import { Room as RoomIcon, Apartment as ApartmentIcon } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import Amenity from '../Rooms/Amenity.tsx';
import Map from '../Map.tsx';

interface ISearchResultProps {
  result: IHomeResult;
}

const SearchResult: FC<ISearchResultProps> = ({ result }) => {
  const theme = useTheme();
  const {
    hotelId,
    hotelName,
    starRating,
    latitude,
    longitude,
    roomPrice,
    roomType,
    cityName,
    roomPhotoUrl,
    discount,
    amenities,
  } = result;
  const renderAmenities = amenities.map((amenity, index) => {
    return <Amenity index={index} amenity={amenity} />;
  });

  return (
    <>
      <Card>
        <CardMedia
          component={'img'}
          alt={'searched room image'}
          height={'250rem'}
          image={roomPhotoUrl}
        />

        <CardContent>
          <Stack direction={'row'} gap={2} alignItems={'center'} mb={theme.spacing(2)}>
            <Typography gutterBottom variant={'h5'} color={'secondary'}>
              {hotelName}
            </Typography>
            <Typography gutterBottom variant={'subtitle2'} color={'secondary'}>
              {roomType}
            </Typography>
          </Stack>

          <Stack direction={'row'} flexWrap={'wrap'} gap={'2'}>
            {renderAmenities}
          </Stack>

          <Stack
            direction={'row'}
            alignItems={'center'}
            justifyContent={'space-between'}
            mt={theme.spacing(1)}
          >
            <Stack direction={'row'} alignItems={'center'} gap={1}>
              <RoomIcon />
              <Typography variant={'h6'} color={'secondary'}>
                {cityName}
              </Typography>
              <Rating name={'Hotel Star Rating'} value={starRating} readOnly />
              <Box
                sx={{
                  mt: theme.spacing(2),
                  borderRadius: theme.spacing(1),
                  overflow: 'hidden',
                  boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)',
                }}
              >
                <Map latitude={latitude} longitude={longitude} />
              </Box>
            </Stack>

            <Stack direction={'row'} alignItems={'center'} gap={'1'}>
              <ApartmentIcon />
              <Typography variant={'h6'} color={'secondary'}>
                {hotelName}
              </Typography>
            </Stack>
            <Typography variant='h6' color='text.secondary'>
              <Typography variant='h6' component='span' color='red' fontSize={14} mr={1}>
                {discount * 100}% OFF
              </Typography>
              {roomPrice}$
            </Typography>
          </Stack>
        </CardContent>

        <CardActions>
          <Button
            size='small'
            variant='contained'
            color='primary'
            component={Link}
            to={`hotels/${hotelId}`}
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

export default SearchResult;
