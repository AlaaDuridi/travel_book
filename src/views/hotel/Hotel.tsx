import { useParams } from 'react-router-dom';
import { useLoaderData } from 'react-router-dom';
import { IHotelData } from '../../types/models/hotel.model.ts';
import {
  Container,
  Stack,
  useTheme,
  useMediaQuery,
  Paper,
  Typography,
  Rating,
  Divider,
  Grid,
} from '@mui/material';
import { LocationOn } from '@mui/icons-material';
import Map from '../../components/Map.tsx';
import HotelGallery from '../../components/Gallery';
import Reviews from '../../components/Reviews';
import RoomCard from '../../components/Rooms/RoomCard.tsx';
import Amenity from '../../components/Rooms/Amenity.tsx';

const HotelPage = () => {
  const { hotelId } = useParams<{ hotelId: string }>(); // Get hotelId from URL params
  const { details, reviews, rooms } = useLoaderData() as IHotelData;
  const theme = useTheme();
  const isXSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  if (!hotelId) {
    return <div>Hotel ID is required</div>;
  }
  if (!details) {
    return <div>Error loading hotel details</div>;
  }

  return (
    <>
      <Container maxWidth={'lg'} sx={{ my: theme.spacing(4) }}>
        <Stack
          spacing={1}
          justifyContent='space-between'
          alignItems={{ xs: 'flex-start', sm: 'center' }}
          direction={{ xs: 'column-reverse', sm: 'row' }}
        >
          <Stack spacing={1}>
            <Typography variant={isXSmallScreen ? 'h4' : 'h2'}>{details.hotelName}</Typography>
            <Stack direction='row' alignItems='center' gap={1}>
              <>
                <LocationOn />
                <Typography variant='subtitle1'>{details.location}</Typography>
              </>
            </Stack>
          </Stack>
          <Rating name={'hotel rating'} value={details.starRating} readOnly />
        </Stack>
        <Divider sx={{ my: theme.spacing(2) }} />
        <Grid container spacing={theme.spacing(2)}>
          <Grid item xs={12} container direction='row' spacing={theme.spacing(2)}>
            <Grid item container gap={2} xs={12} md={6.5} lg={8}>
              <Grid item xs={12}>
                <HotelGallery hotelId={Number(hotelId)} />
              </Grid>
              <Grid item xs={12}>
                <Typography variant='h5' gutterBottom>
                  Amenities
                </Typography>
                <Stack gap={1} justifyContent='center' flexDirection='row' flexWrap='wrap'>
                  {details.amenities.map((amenity, index) => (
                    <Amenity amenity={amenity} index={index} />
                  ))}
                </Stack>
              </Grid>
              <Grid component={Paper} elevation={3} item p={theme.spacing(5)} xs={12}>
                <Typography variant='h5' gutterBottom>
                  Overview
                </Typography>
                <Typography>{details.description}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant='h5' gutterBottom>
                  Available Rooms
                </Typography>
                <Grid container item spacing={2}>
                  {rooms &&
                    rooms.map((room) => (
                      <Grid item key={room.id} xs={12} lg={6}>
                        <RoomCard room={room} />
                      </Grid>
                    ))}
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} md={5.5} lg={4}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  {reviews && <Reviews reviews={reviews} />}
                </Grid>
                <Grid item xs={12} mb={theme.spacing(4)}>
                  <Map latitude={details.latitude} longitude={details.longitude} />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default HotelPage;
