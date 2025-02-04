import { FC, useEffect, useState } from 'react';
import { IRoom } from '../../types/models/room.model.ts';
import {
  Button,
  Card,
  CardActions,
  Grid,
  CardContent,
  Tooltip,
  CardMedia,
  Stack,
  Typography,
  Badge,
  Chip,
  useTheme,
} from '@mui/material';

import {
  ChildCare,
  PeopleAlt,
  Delete,
  Edit,
  AddShoppingCart,
  RemoveShoppingCart,
} from '@mui/icons-material';
import RoomActionDialog from './RoomActionDialog.tsx';
import { ACTION_TYPES, USER_TYPE } from '../../constants/common.constants.ts';
import { confirmAlert, deleteAlert } from '../../util/swal.util.ts';
import { deleteRoomAsync } from '../../store/rooms/roomSlice.ts';
import { useAppDispatch, useAppSelector } from '../../store/hooks.ts';
import Amenity from './Amenity.tsx';
import { addToCart, updateRoomDates, removeFromCart } from '../../store/cart/cartSlice.ts';
import ResponsiveDateFields from '../Search/DateRangeFields.tsx';
import { Formik, Form } from 'formik';
import { DEFAULT_CHECK_IN_DATE, DEFAULT_CHECK_OUT_DATE } from '../../constants/room.constants.ts';

interface IRoomCardProps {
  room: IRoom;
  checkInDate?: string;
  checkOutDate?: string;
}

const RoomCard: FC<IRoomCardProps> = ({
  room,
  checkInDate: bookedCheckIn,
  checkOutDate: bookedCheckout,
}) => {
  const theme = useTheme();
  const [isEditRoomDialogOpen, setIsEditRoomDialogOpen] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { bookedRooms } = useAppSelector((state) => state.cart);

  const [checkInDate, setCheckInDate] = useState<string>(bookedCheckIn || DEFAULT_CHECK_IN_DATE);
  const [checkOutDate, setCheckOutDate] = useState<string>(
    bookedCheckout || DEFAULT_CHECK_OUT_DATE,
  );

  const isBookedRoom = bookedRooms.some((item) => item.room.roomNumber === room.roomNumber);

  const handleOpenDeleteDialog = async () => {
    await deleteAlert(
      theme,
      async () => {
        const resultAction = await dispatch(
          deleteRoomAsync({ hotelId: room.hotelId, roomId: room.id }),
        );
        if (deleteRoomAsync.rejected.match(resultAction)) {
          const errorMessage = resultAction.payload as string;
          throw new Error(errorMessage);
        }
      },
      'Are you sure you want to delete this room?',
      `The room "${room.roomType}-#${room.roomNumber}" will be permanently deleted.`,
    );
  };

  const handleOpenUpdateDialog = () => {
    setIsEditRoomDialogOpen(true);
  };

  const handleAddToCart = async () => {
    await confirmAlert(
      theme,
      async () => {
        dispatch(
          addToCart({
            room,
            checkInDate,
            checkOutDate,
          }),
        );
      },
      `Are you sure you want to add this room to cart from ${checkInDate} to ${checkOutDate}`,
    );
  };

  const handleRemoveFromCart = async () => {
    await confirmAlert(theme, async () => {
      dispatch(removeFromCart({ room }));
    });
  };

  useEffect(() => {
    // Dispatch action when checkInDate or checkOutDate is changed
    dispatch(updateRoomDates({ room, checkInDate, checkOutDate }));
  }, [checkOutDate, checkInDate]);

  return (
    <Card>
      <CardMedia
        component='img'
        height='140'
        image={room.roomPhotoUrl}
        alt={room.roomType}
        sx={{ objectFit: 'cover', borderRadius: theme.spacing(1) }}
      />
      <CardContent>
        <Stack
          direction='row'
          justifyContent='space-between'
          alignItems='center'
          mb={theme.spacing(2)}
        >
          <Typography gutterBottom variant='h5' component='div'>
            {room.roomType} - Room #{room.roomNumber}
          </Typography>
          <Typography variant='body1' component='span' color='red'>
            {room.price}$/night
          </Typography>
        </Stack>
        <Formik
          initialValues={{ checkInDate: checkInDate, checkOutDate: checkOutDate }}
          onSubmit={() => {}}
        >
          <Form>
            <ResponsiveDateFields
              checkInDate={checkInDate}
              checkOutDate={checkOutDate}
              onCheckInChange={(date) => setCheckInDate(date)}
              onCheckOutChange={(date) => setCheckOutDate(date)}
            />
          </Form>
        </Formik>
        <Stack direction='row' spacing={1} alignItems='center'>
          <Badge sx={{ mr: theme.spacing(2) }} badgeContent={room.capacityOfAdults} color='info'>
            <Tooltip title='Adults capacity'>
              <Chip icon={<PeopleAlt />} label='Adults' />
            </Tooltip>
          </Badge>
          <Badge sx={{ mr: theme.spacing(2) }} badgeContent={room.capacityOfAdults} color='info'>
            <Tooltip title='children capacity'>
              <Chip icon={<ChildCare />} label='Children' />
            </Tooltip>
          </Badge>
        </Stack>
        <Typography
          variant='body2'
          color='text.secondary'
          sx={{ mt: theme.spacing(2), mb: theme.spacing(2) }}
        >
          {room.availability ? (
            <Chip label='Available' color='success' size='small' />
          ) : (
            <Chip label='Not Available' color='error' size='small' />
          )}
        </Typography>

        <Typography variant='subtitle1' sx={{ mb: 1 }}>
          Amenities:
        </Typography>
        <Grid container spacing={2}>
          {room.roomAmenities.map((amenity, index) => (
            <Amenity amenity={amenity} index={index} />
          ))}
        </Grid>
      </CardContent>
      <CardActions sx={{ justifyContent: 'space-between', px: theme.spacing(2) }}>
        {user?.userType === USER_TYPE.ADMIN ? (
          <>
            <Button
              size='small'
              startIcon={<Edit />}
              variant='contained'
              color='primary'
              onClick={handleOpenUpdateDialog}
            >
              Edit
            </Button>
            <Button
              size='small'
              color='error'
              startIcon={<Delete />}
              variant='outlined'
              onClick={handleOpenDeleteDialog}
            >
              Delete
            </Button>
          </>
        ) : (
          <Button
            size='small'
            variant='contained'
            color={isBookedRoom ? 'error' : 'primary'}
            sx={{ m: 'auto' }}
            endIcon={isBookedRoom ? <RemoveShoppingCart /> : <AddShoppingCart />}
            onClick={isBookedRoom ? handleRemoveFromCart : handleAddToCart}
          >
            {isBookedRoom ? 'Remove from Cart' : 'Add to Cart'}
          </Button>
        )}
      </CardActions>
      {isEditRoomDialogOpen && (
        <RoomActionDialog
          room={room}
          open={isEditRoomDialogOpen}
          onClose={() => setIsEditRoomDialogOpen(false)}
          actionType={ACTION_TYPES.EDIT}
        />
      )}
    </Card>
  );
};

export default RoomCard;
