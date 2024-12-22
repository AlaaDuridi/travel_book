import { FC, useState } from 'react';
import { IHotel } from '../../types/models/hotel.model.ts';
import { Card, CardActions, Rating, Stack, Typography, useTheme } from '@mui/material';
import Map from '../Map.tsx';
import GridCardActions from '../GridCardActions.tsx';
import HotelActionDialog from './HotelActionDialog.tsx';
import { ACTION_TYPES } from '../../constants/common.constants.ts';
import { deleteHotelAsync } from '../../store/hotels/hotelSlice.ts';
import { deleteAlert } from '../../util/swal.util.ts';
import { useAppDispatch } from '../../store/hooks.ts';

interface IHotelCardProps {
  hotel: IHotel;
  selectedCityId?: number;
}

const HotelCard: FC<IHotelCardProps> = ({ hotel, selectedCityId }) => {
  const theme = useTheme();
  const [isEditHotelDialogOpen, setIsEditHotelDialogOpen] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const handleOpenUpdateDialog = () => {
    setIsEditHotelDialogOpen(true);
  };
  const handleOpenDeleteAlert = async () => {
    await deleteAlert(
      theme,
      async () => {
        const resultAction = await dispatch(
          deleteHotelAsync({ hotelId: hotel.id, cityId: selectedCityId }),
        );
        if (deleteHotelAsync.fulfilled.match(resultAction)) {
          console.log('City deleted successfully:', hotel.id);
        } else if (deleteHotelAsync.rejected.match(resultAction)) {
          const errorMessage = resultAction.payload as string;
          throw new Error(errorMessage);
        }
      },
      'Are you sure you want to delete this city?',
      `The city "${hotel.name}" will be permanently deleted.`,
    );
  };
  return (
    <>
      <Card sx={{ p: theme.spacing(2) }}>
        <Stack direction='row' justifyContent='space-between' gap={3}>
          <Stack gap={2}>
            <Typography variant='h5' component='h3'>
              {hotel.name}
            </Typography>
            <Typography sx={{ display: 'flex', alignItems: 'center' }} gap={2}>
              <Typography variant='body2' component='span'>
                Type:
              </Typography>
              {hotel.hotelType}
            </Typography>
            <Rating value={hotel.starRating} readOnly />
            <Typography sx={{ display: 'flex', alignItems: 'center' }} gap={2}>
              <Typography variant='body2' component='span'>
                Description:
              </Typography>
              {hotel.description}
            </Typography>
          </Stack>
        </Stack>
        <CardActions>
          <GridCardActions onEdit={handleOpenUpdateDialog} onDelete={handleOpenDeleteAlert} />
        </CardActions>
        {hotel.latitude && hotel.longitude ? (
          <>
            <Map latitude={hotel.latitude} longitude={hotel.longitude} />
          </>
        ) : (
          <Typography variant='body2' color='textSecondary'>
            Location not available
          </Typography>
        )}
      </Card>
      {isEditHotelDialogOpen && (
        <HotelActionDialog
          open={isEditHotelDialogOpen}
          onClose={() => {
            setIsEditHotelDialogOpen(false);
          }}
          hotel={hotel}
          actionType={ACTION_TYPES.EDIT}
        />
      )}
    </>
  );
};

export default HotelCard;
