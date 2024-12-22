import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
} from '@mui/material';
import { Form, Formik } from 'formik';
import { FC } from 'react';
import { IHotel } from '../../types/models/hotel.model.ts';
import { ACTION_TYPES } from '../../constants/common.constants.ts';
import * as Yup from 'yup';
import { IHotelActionDialogProps } from './Hotels.types.ts';
import { addCity, updateCity } from '../../store/cities/citySlice.ts';
import { toast } from 'react-toastify';
import { useAppDispatch } from '../../store/hooks.ts';
import { createHotelAsync } from '../../store/hotels/hotelSlice.ts';

const validationSchema = Yup.object({
  name: Yup.string().required('Hotel name is required').max(100, 'Maximum 100 characters allowed'),
  description: Yup.string().max(500, 'Maximum 500 characters allowed'),
});
const HotelActionDialog: FC<IHotelActionDialogProps> = ({ open, onClose, hotel, actionType }) => {
  const isAddAction = actionType === ACTION_TYPES.ADD;
  const dispatch = useAppDispatch();

  const handleCreateHotelSubmit = async (
    values: any,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void },
  ) => {
    console.log('will submit addition an hotel or update an hotel values', values);
    // try {
    //     if (isAddAction) {
    //         await dispatch(createHotelAsync(hotel)).unwrap();
    //         toast.success('City added successfully');
    //     } else {
    //         await dispatch(updateCity(values)).unwrap();
    //         toast.success('City updated successfully');
    //     }
    //     onClose();
    // } catch (error) {
    //     toast.error('Failed to submit the city.');
    //     console.error(error);
    // } finally {
    //     setSubmitting(false);
    // }
  };
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{isAddAction ? 'Add Hotel' : 'Edit Hotel'}</DialogTitle>
      <DialogContent dividers>
        <Formik
          initialValues={hotel}
          validationSchema={validationSchema}
          onSubmit={handleCreateHotelSubmit}
        >
          {({ values, handleChange, handleBlur, touched, errors, isSubmitting }) => (
            <Form>
              <Stack spacing={2}>
                {/* Name Field */}
                <TextField
                  name='name'
                  label='City Name'
                  fullWidth
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.name && Boolean(errors.name)}
                  helperText={touched.name && errors.name}
                />

                {/* Description Field */}
                <TextField
                  name='description'
                  label='City Description'
                  fullWidth
                  multiline
                  minRows={3}
                  value={values.description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.description && Boolean(errors.description)}
                  helperText={touched.description && errors.description}
                />
              </Stack>

              <DialogActions>
                <Button onClick={onClose} color='secondary' disabled={isSubmitting}>
                  Cancel
                </Button>
                <Button type='submit' variant='contained' color='primary' disabled={isSubmitting}>
                  {isAddAction ? 'Add' : 'Update'}
                </Button>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default HotelActionDialog;
