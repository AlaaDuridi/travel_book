import { Form, Formik } from 'formik';
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { IBookingResponse } from '../../types/models/booking.model.ts';
import { useAppDispatch, useAppSelector } from '../../store/hooks.ts';
import { addBooking } from '../../store/booking/bookingSlice.ts';
import { clearCart } from '../../store/cart/cartSlice.ts';

// Form validation schema using Yup
const paymentSchema = Yup.object().shape({
  fullName: Yup.string().required('Full Name is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  paymentMethod: Yup.string().required('Payment Method is required'),
  cardNumber: Yup.string()
    .required('Card Number is required')
    .matches(/^\d{4} \d{4} \d{4} \d{4}$/, 'Invalid card number format'),
  expirationDate: Yup.string()
    .required('Expiration Date is required')
    .matches(/^(0[1-9]|1[0-2])\/?([2-9][0-9])$/, 'Invalid expiration date format'),
  cvv: Yup.string().required('CVV is required').length(3, 'CVV must be 3 digits'),
  billingAddress: Yup.object().shape({
    state: Yup.string().required('State is required'),
    city: Yup.string().required('City is required'),
  }),
});

const paymentMethods = ['Visa', 'MasterCard', 'American Express', 'Discover'];

const PaymentForm = () => {
  const navigate = useNavigate();
  const { bookedRooms } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  const handlePayment = async (values: any) => {
    try {
      const bookings: IBookingResponse[] = bookedRooms.map((item) => {
        return {
          customerName: values.fullName,
          roomNumber: item.room.roomNumber,
          roomType: item.room.roomType,
          totalCost: item.totalPrice,
          paymentMethod: values.paymentMethod,
          hotelName: 'Plaza Hotel',
          bookingDateTime: new Date().toISOString(),
          bookingStatus: 'Confirmed',
        };
      });

      // Dispatch the booking action
      dispatch(addBooking(bookings));
      // Clear the cart
      dispatch(clearCart());
      // Navigate to the confirmation page
      navigate('/user/confirmation');
    } catch (error) {
      console.error('Booking failed', error);
    }
  };

  return (
    <Box sx={{ maxWidth: 600, margin: 'auto', padding: 2 }}>
      <Typography variant='h4' component='h2' gutterBottom align='center'>
        Payment Information
      </Typography>

      <Formik
        initialValues={{
          fullName: '',
          email: '',
          paymentMethod: 'Visa',
          cardNumber: '',
          expirationDate: '',
          cvv: '',
          billingAddress: { state: '', city: '' },
          specialRequests: '',
        }}
        onSubmit={handlePayment}
        validationSchema={paymentSchema}
      >
        {({ values, handleChange, handleBlur, touched, errors }) => (
          <Form>
            {/* Full Name */}
            <TextField
              label='Full Name'
              fullWidth
              name='fullName'
              value={values.fullName}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.fullName && Boolean(errors.fullName)}
              helperText={touched.fullName && errors.fullName}
              margin='normal'
            />

            {/* Email */}
            <TextField
              label='Email'
              fullWidth
              type='email'
              name='email'
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.email && Boolean(errors.email)}
              helperText={touched.email && errors.email}
              margin='normal'
            />

            {/* Payment Method */}
            <FormControl fullWidth margin='normal'>
              <InputLabel>Payment Method</InputLabel>
              <Select
                label='Payment Method'
                name='paymentMethod'
                value={values.paymentMethod}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.paymentMethod && Boolean(errors.paymentMethod)}
              >
                {paymentMethods.map((method) => (
                  <MenuItem key={method} value={method}>
                    {method}
                  </MenuItem>
                ))}
              </Select>
              {touched.paymentMethod && errors.paymentMethod && (
                <FormHelperText error>{errors.paymentMethod}</FormHelperText>
              )}
            </FormControl>

            {/* Card Number */}
            <TextField
              label='Card Number'
              fullWidth
              name='cardNumber'
              value={values.cardNumber}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.cardNumber && Boolean(errors.cardNumber)}
              helperText={touched.cardNumber && errors.cardNumber}
              margin='normal'
              inputProps={{
                maxLength: 19,
                onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                  e.target.value =
                    e.target.value
                      .replace(/\s/g, '')
                      .match(/.{1,4}/g)
                      ?.join(' ') || '';
                  handleChange(e);
                },
              }}
            />

            {/* Expiration Date */}
            <TextField
              label='Expiration Date (MM/YY)'
              fullWidth
              name='expirationDate'
              value={values.expirationDate}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.expirationDate && Boolean(errors.expirationDate)}
              helperText={touched.expirationDate && errors.expirationDate}
              margin='normal'
            />

            {/* CVV */}
            <TextField
              label='CVV'
              fullWidth
              name='cvv'
              value={values.cvv}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.cvv && Boolean(errors.cvv)}
              helperText={touched.cvv && errors.cvv}
              margin='normal'
            />

            {/* Billing Address */}
            <Typography variant='h6' marginTop={2}>
              Billing Address
            </Typography>
            <TextField
              label='State'
              fullWidth
              name='billingAddress.state'
              value={values.billingAddress.state}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.billingAddress?.state && Boolean(errors.billingAddress?.state)}
              helperText={touched.billingAddress?.state && errors.billingAddress?.state}
              margin='normal'
            />
            <TextField
              label='City'
              fullWidth
              name='billingAddress.city'
              value={values.billingAddress.city}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.billingAddress?.city && Boolean(errors.billingAddress?.city)}
              helperText={touched.billingAddress?.city && errors.billingAddress?.city}
              margin='normal'
            />

            {/* Special Requests */}
            <TextField
              label='Special Requests'
              fullWidth
              multiline
              rows={4}
              name='specialRequests'
              value={values.specialRequests}
              onChange={handleChange}
              onBlur={handleBlur}
              margin='normal'
            />

            {/* Submit Button */}
            <Button
              type='submit'
              variant='contained'
              color='primary'
              fullWidth
              sx={{ marginTop: 2 }}
            >
              Confirm and Pay
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default PaymentForm;
