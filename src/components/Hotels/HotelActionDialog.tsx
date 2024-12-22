import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Typography,
} from '@mui/material';
import { Form, Formik } from 'formik';
import { FC } from 'react';
import { IHotel } from '../../types/models/hotel.model.ts';
import { ACTION_TYPES } from '../../constants/common.constants.ts';
import * as Yup from 'yup';
import { IHotelActionDialogProps } from './Hotels.types.ts';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from '../../store/hooks.ts';
import { createHotelAsync, updateHotelAsync } from '../../store/hotels/hotelSlice.ts';

const validationSchema = Yup.object({
  name: Yup.string().required('Please specify the hotel name'),
  description: Yup.string().required('Please add the hotel description'),
  hotelType: Yup.string().required('Please enter the hotel type'),
  starRating: Yup.number()
    .min(0, 'Rating must be between 0 and 5')
    .max(5, 'Rating must be between 0 and 5')
    .required('Please specify the hotel Rating'),
  latitude: Yup.number()
    .min(-90, 'Latitude must be between -90 and 90')
    .max(90, 'Latitude must be between -90 and 90')
    .required('Latitude is required'),
  longitude: Yup.number()
    .min(-180, 'Longitude must be between -180 and 180')
    .max(180, 'Longitude is required'),
  cityId: Yup.number()
    .nullable()
    .when([], {
      is: (_: unknown, context: { isAddAction: boolean }) => context?.isAddAction,
      then: (schema) => schema.required('Please select a city'),
      otherwise: (schema) => schema.nullable(),
    }),
});

const HotelActionDialog: FC<IHotelActionDialogProps> = ({ open, onClose, hotel, actionType }) => {
  const isAddAction = actionType === ACTION_TYPES.ADD;
  const dispatch = useAppDispatch();
  const { cities } = useAppSelector((state) => state.cities);

  const handleCreateHotelSubmit = async (
    values: IHotel & { cityId?: number },
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void },
  ) => {
    console.log('Submit values:', values);
    try {
      if (isAddAction) {
        await dispatch(createHotelAsync({ cityId: values.cityId!, hotel: values })).unwrap();
        toast.success('Hotel added successfully');
      } else {
        await dispatch(updateHotelAsync(values)).unwrap();
        toast.success('Hotel updated successfully');
      }
      onClose();
    } catch (error) {
      toast.error('Failed to submit the hotel.');
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>{isAddAction ? 'Add Hotel' : 'Edit Hotel'}</DialogTitle>
      <DialogContent dividers>
        <Formik
          initialValues={{ ...hotel, cityId: isAddAction ? '' : undefined }}
          validationSchema={validationSchema}
          onSubmit={handleCreateHotelSubmit}
          enableReinitialize
          validateOnBlur
          validateOnChange
          context={{ isAddAction }}
        >
          {({ values, handleChange, handleBlur, touched, errors, isSubmitting }) => (
            <Form>
              <Stack spacing={2}>
                {/* Name Field */}
                <TextField
                  name='name'
                  label='Hotel Name'
                  fullWidth
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.name && Boolean(errors.name)}
                  helperText={touched.name && errors.name}
                />

                {/* Hotel Type Field */}
                <TextField
                  name='hotelType'
                  label='Hotel Type'
                  fullWidth
                  value={values.hotelType}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.hotelType && Boolean(errors.hotelType)}
                  helperText={touched.hotelType && errors.hotelType}
                />

                {/* Latitude Field */}
                <TextField
                  name='latitude'
                  label='Latitude'
                  fullWidth
                  value={values.latitude}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type='number'
                  error={touched.latitude && Boolean(errors.latitude)}
                  helperText={touched.latitude && errors.latitude}
                />

                {/* Longitude Field */}
                <TextField
                  name='longitude'
                  label='Longitude'
                  fullWidth
                  value={values.longitude}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type='number'
                  error={touched.longitude && Boolean(errors.longitude)}
                  helperText={touched.longitude && errors.longitude}
                />

                {/* Star Rating Field */}
                <TextField
                  name='starRating'
                  label='Star Rating'
                  fullWidth
                  value={values.starRating}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type='number'
                  error={touched.starRating && Boolean(errors.starRating)}
                  helperText={touched.starRating && errors.starRating}
                />

                {/* Description Field */}
                <TextField
                  name='description'
                  label='Hotel Description'
                  fullWidth
                  multiline
                  minRows={3}
                  value={values.description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.description && Boolean(errors.description)}
                  helperText={touched.description && errors.description}
                />

                {/* City Selection Field (Only for Add Action) */}
                {isAddAction && (
                  <FormControl fullWidth error={touched.cityId && Boolean(errors.cityId)}>
                    <InputLabel id='city-select-label'>City</InputLabel>
                    <Select
                      name='cityId'
                      labelId='city-select-label'
                      value={values.cityId || ''}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      <MenuItem value=''>
                        <em>Select a City</em>
                      </MenuItem>
                      {cities.map((city) => (
                        <MenuItem key={city.id} value={city.id}>
                          {city.name}
                        </MenuItem>
                      ))}
                    </Select>
                    {touched.cityId && errors.cityId && (
                      <Typography color='error' variant='caption'>
                        {errors.cityId}
                      </Typography>
                    )}
                  </FormControl>
                )}
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
