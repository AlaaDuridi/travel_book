import { FC } from 'react';
import { Box, Card, useTheme, Typography, Grid, Button } from '@mui/material';
import { useAppSelector } from '../../store/hooks.ts';
import { ShoppingCart, SentimentVeryDissatisfied } from '@mui/icons-material';
import RoomCard from '../../components/Rooms/RoomCard.tsx';
import { useNavigate } from 'react-router-dom';
import PaymentForm from '../../components/Payment/PaymentForm.tsx';

const Checkout: FC = () => {
  const { bookedRooms, totalAmount } = useAppSelector((state) => state.cart);
  const navigate = useNavigate();

  const handleRedirectToHome = () => {
    navigate('/');
  };
  const theme = useTheme();
  return (
    <Grid container m={theme.spacing(5)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={bookedRooms.length > 0 ? 6 : 12}>
          <Card sx={{ padding: 2, boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
            <Box sx={{ padding: '1rem' }}>
              <Typography
                variant='h2'
                component='h2'
                gutterBottom
                sx={{
                  color: '#333',
                  fontSize: '1.5rem',
                  textAlign: 'center',
                  fontWeight: 'bold',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 1,
                  marginBottom: 2,
                }}
              >
                <ShoppingCart /> Your Cart
              </Typography>

              {bookedRooms.length === 0 ? (
                <Typography variant='subtitle1' sx={{ display: 'flex', alignItems: 'center' }}>
                  Your cart is empty. <SentimentVeryDissatisfied sx={{ ml: 1 }} />
                </Typography>
              ) : (
                <Grid container gap={2}>
                  {bookedRooms.map((item, index) => (
                    <RoomCard
                      room={item.room}
                      key={index}
                      checkInDate={item.checkInDate}
                      checkOutDate={item.checkOutDate}
                    />
                  ))}
                </Grid>
              )}

              {bookedRooms.length > 0 && (
                <Box sx={{ marginTop: 4 }}>
                  <Typography variant='h6' component='div'>
                    Total cost: ${totalAmount}
                  </Typography>
                </Box>
              )}
            </Box>
          </Card>
        </Grid>

        {/* Payment Information Form Section */}
        {bookedRooms.length > 0 && (
          <Grid item xs={12} md={6}>
            <Card sx={{ padding: 2, boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
              <Typography
                variant='h5'
                sx={{
                  color: '#333',
                  fontWeight: 'bold',
                  textAlign: 'center',
                  marginBottom: 2,
                }}
              >
                Payment Information
              </Typography>
              <PaymentForm />
            </Card>
          </Grid>
        )}
      </Grid>

      {/* If no items in cart, show a button to go back to home */}
      {bookedRooms.length === 0 && (
        <Box sx={{ textAlign: 'center', marginTop: 3 }}>
          <Button variant='contained' color='primary' onClick={handleRedirectToHome}>
            Go Back to Home
          </Button>
        </Box>
      )}
    </Grid>
  );
};

export default Checkout;
