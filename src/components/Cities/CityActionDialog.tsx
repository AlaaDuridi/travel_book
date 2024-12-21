import { FC } from 'react';
import {
  Dialog,
  DialogActions,
  Button,
  Stack,
  TextField,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import { ICity } from '../../types/models/city.model.ts';
import { ACTION_TYPES } from '../../constants/common.constants.ts';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { useAppDispatch } from '../../store/hooks.ts';
import { addCity, updateCity } from '../../store/cities/citySlice.ts';

interface ICityActionDialog {
  open: boolean;
  city: ICity;
  onClose: () => void;
  actionType: ACTION_TYPES;
}

const validationSchema = Yup.object({
  name: Yup.string().required('City name is required').max(100, 'Maximum 100 characters allowed'),
  description: Yup.string().max(500, 'Maximum 500 characters allowed'),
});

const CityActionDialog: FC<ICityActionDialog> = ({ open, onClose, actionType, city }) => {
  const dispatch = useAppDispatch();
  const isAddAction = actionType === ACTION_TYPES.ADD;

  const handleSubmitForm = async (
    values: ICity,
    {
      setSubmitting,
    }: {
      setSubmitting: (isSubmitting: boolean) => void;
    },
  ) => {
    setSubmitting(true);

    try {
      if (isAddAction) {
        await dispatch(addCity(values)).unwrap();
        toast.success('City added successfully');
      } else {
        await dispatch(updateCity(values)).unwrap();
        toast.success('City updated successfully');
      }
      onClose();
    } catch (error) {
      toast.error('Failed to submit the city.');
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{isAddAction ? 'Add City' : 'Edit City'}</DialogTitle>

      <DialogContent dividers>
        <Formik
          initialValues={city}
          validationSchema={validationSchema}
          onSubmit={handleSubmitForm}
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

export default CityActionDialog;
