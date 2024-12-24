import { FC, useState, useEffect } from 'react';
import { Container, Grid, SelectChangeEvent, Stack, useTheme, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../store/hooks.ts';
import { ACTION_TYPES } from '../../constants/common.constants.ts';
import { fetchHotelRoomsAsync } from '../../store/rooms/roomSlice.ts';
import {
  DEFAULT_CHECK_IN_DATE,
  DEFAULT_CHECK_OUT_DATE,
  DEFAULT_SELECTED_HOTEL_ID,
  INITIAL_ROOM,
} from '../../constants/room.constants.ts';
import GridsSkeleton from '../Skeleton/GridsSkeleton.tsx';
import { IRoom } from '../../types/models/room.model.ts';
import CitiesFilterSelect from '../ItemsSelect/CitiesFilterSelect.tsx';
import AddButton from '../AddButton.tsx';
import RoomActionDialog from './RoomActionDialog.tsx';

const RoomsGrid: FC = () => {
  const theme = useTheme();
  const dispatch = useAppDispatch();

  const { hotels } = useAppSelector((state) => state.hotels);
  const { rooms } = useAppSelector((state) => state.rooms);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isCreateRoomDialogOpen, setIsCreateRoomDialogOpen] = useState<boolean>(false);
  const [selectedHotelId, setSelectedHotelId] = useState<number>(DEFAULT_SELECTED_HOTEL_ID);
  const [checkInDate, setCheckInDate] = useState<string>(DEFAULT_CHECK_IN_DATE);
  const [checkOutDate, setCheckOutDate] = useState<string>(DEFAULT_CHECK_OUT_DATE);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        setIsLoading(true);
        await dispatch(
          fetchHotelRoomsAsync({ hotelId: selectedHotelId, checkInDate, checkOutDate }),
        );
      } catch (error) {
        console.error('Error fetching rooms:', error);
      } finally {
        setIsLoading(false);
      }
    };
    void fetchRooms();
  }, [dispatch, selectedHotelId]);

  const renderRooms = () => {
    if (isLoading) {
      return <GridsSkeleton />;
    }
    if (!rooms.length) {
      return <Typography variant='h5'>No rooms found</Typography>;
    }
    return rooms.map((room: IRoom) => (
      <Grid item key={room.id} xs={12} sm={6} md={4} lg={3}>
        <>Room card goes here</>
      </Grid>
    ));
  };

  const handleHotelChange = (event: SelectChangeEvent<number>) => {
    setSelectedHotelId(Number(event.target.value));
  };
  return (
    <Container sx={{ pt: theme.spacing(4) }} maxWidth={'lg'}>
      <Stack gap={2} m={2}>
        <Stack direction='row' justifyContent='space-between' alignItems='center'>
          <Typography variant='h4' component='h2'>
            Rooms
          </Typography>
          <Stack direction='row' gap={2}>
            <CitiesFilterSelect
              selectedItemId={selectedHotelId}
              items={hotels}
              handleItemChange={handleHotelChange}
              firstItemLabel={'All hotels'}
            />
            <AddButton
              label='Add Room'
              onClick={() => {
                setIsCreateRoomDialogOpen(true);
              }}
            />
          </Stack>
        </Stack>

        <Grid container spacing={4}>
          {renderRooms()}
        </Grid>
      </Stack>
      {isCreateRoomDialogOpen && (
        <RoomActionDialog
          open={isCreateRoomDialogOpen}
          onClose={() => setIsCreateRoomDialogOpen(false)}
          actionType={ACTION_TYPES.ADD}
          room={INITIAL_ROOM}
        />
      )}
    </Container>
  );
};

export default RoomsGrid;
