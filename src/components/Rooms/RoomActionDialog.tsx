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
import { ACTION_TYPES } from '../../constants/common.constants.ts';
import * as Yup from 'yup';
import { IRoom } from '../../types/models/room.model.ts';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from '../../store/hooks.ts';
import { createRoomAsync, updateRoomAsync } from '../../store/rooms/roomSlice.ts';

interface IRoomActionDialogProps {
  open: boolean;
  onClose: () => void;
  room: IRoom;
  actionType: ACTION_TYPES;
}

const validationSchema = Yup.object({
  hotelId: Yup.number()
    .nullable()
    .when([], {
      is: (_: unknown, context: { isAddAction: boolean }) => context?.isAddAction,
      then: (schema) => schema.required('Please select a hotel'),
      otherwise: (schema) => schema.nullable(),
    }),
  roomNumber: Yup.number().required('Room number is required'),
  price: Yup.number().required('Cost is required'),
});

const RoomActionDialog: FC<IRoomActionDialogProps> = ({ open, onClose, room, actionType }) => {
  const isAddAction = actionType === ACTION_TYPES.ADD;
  const dispatch = useAppDispatch();
  const hotels = useAppSelector((state) => state.hotels.hotels);

  const handleActionSubmit = async (
    values: Pick<IRoom, 'hotelId' | 'roomNumber' | 'price'>,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void },
  ) => {
    try {
      if (isAddAction) {
        const resultAction = await dispatch(
          createRoomAsync({
            hotelId: values.hotelId,
            roomNumber: values.roomNumber,
            cost: values.price,
          }),
        );
        if (createRoomAsync.fulfilled.match(resultAction)) {
          toast.success('Room added successfully');
        } else {
          throw new Error('An Error occurred while creating new room');
        }
      } else {
        const resultAction = await dispatch(
          updateRoomAsync({
            ...room,
            hotelId: values.hotelId,
            roomNumber: values.roomNumber,
            price: values.price,
          }),
        );
        if (updateRoomAsync.fulfilled.match(resultAction)) {
          toast.success('Room updated successfully');
        } else {
          throw new Error('An error occurred while updating room');
        }
      }
      onClose();
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>{isAddAction ? 'Add Room' : 'Update Room'}</DialogTitle>

      <DialogContent dividers>
        <Formik
          initialValues={{ ...room }}
          onSubmit={handleActionSubmit}
          validationSchema={validationSchema}
          enableReinitialize
          validateOnBlur
          validateOnChange
          context={{ isAddAction }}
        >
          {({ values, handleChange, handleBlur, touched, errors, isSubmitting }) => (
            <Form>
              <Stack spacing={2}>
                {isAddAction && (
                  <FormControl fullWidth error={touched.hotelId && Boolean(errors.hotelId)}>
                    <InputLabel id='hotel-select-label'>City</InputLabel>
                    <Select
                      name='hotelId'
                      labelId='hotel-select-label'
                      value={values.hotelId || ''}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      <MenuItem value=''>
                        <em>Select a Hotel</em>
                      </MenuItem>
                      {hotels.map((hotel) => (
                        <MenuItem key={hotel.id} value={hotel.id}>
                          {hotel.name}
                        </MenuItem>
                      ))}
                    </Select>
                    {touched.hotelId && errors.hotelId && (
                      <Typography color='error' variant='caption'>
                        {errors.hotelId}
                      </Typography>
                    )}
                  </FormControl>
                )}

                <TextField
                  name='roomNumber'
                  label='Room Number'
                  value={values.roomNumber}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.roomNumber && Boolean(errors.roomNumber)}
                  helperText={touched.roomNumber && errors.roomNumber}
                  fullWidth
                />

                <TextField
                  name='price'
                  label='Cost'
                  value={values.price}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.price && Boolean(errors.price)}
                  helperText={touched.price && errors.price}
                  fullWidth
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

export default RoomActionDialog;
