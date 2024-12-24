import { FC, useState } from 'react';
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
  Wifi,
  Tv,
  AcUnit,
  Spa,
  LocalBar,
  BeachAccess,
  KingBed,
  ViewComfy,
  RoomService,
  AttachMoney,
  SingleBed,
  Hotel,
  FreeBreakfast,
  Kitchen,
  SportsHandball,
  BusinessCenter,
  MeetingRoom,
  Delete,
  Edit,
} from '@mui/icons-material';
import { AMENITY } from '../../constants/room.constants.ts';
import RoomActionDialog from './RoomActionDialog.tsx';
import { ACTION_TYPES } from '../../constants/common.constants.ts';
import { deleteAlert } from '../../util/swal.util.ts';
import { deleteRoomAsync } from '../../store/rooms/roomSlice.ts';
import { useAppDispatch } from '../../store/hooks.ts';

interface IRoomCardProps {
  room: IRoom;
}

const RoomCard: FC<IRoomCardProps> = ({ room }) => {
  const theme = useTheme();
  const [isEditRoomDialogOpen, setIsEditRoomDialogOpen] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const amenityIcon = (amenity: AMENITY) => {
    switch (amenity) {
      case AMENITY.FREE_WIFI:
        return <Wifi />;
      case AMENITY.TV:
        return <Tv />;
      case AMENITY.AIR_CONDITIONING:
        return <AcUnit />;
      case AMENITY.JACUZZI:
        return <Spa />;
      case AMENITY.MINI_BAR:
        return <LocalBar />;
      case AMENITY.OCEAN_VIEW:
        return <BeachAccess />;
      case AMENITY.KING_SIZE_BED:
        return <KingBed />;
      case AMENITY.CITY_VIEW:
        return <ViewComfy />;
      case AMENITY.ROOM_SERVICE:
        return <RoomService />;
      case AMENITY.BUDGET_FRIENDLY:
        return <AttachMoney />;
      case AMENITY.SINGLE_BED:
        return <SingleBed />;
      case AMENITY.ADJOINING_ROOMS:
        return <Hotel />;
      case AMENITY.COMPLIMENTARY_BREAKFAST:
        return <FreeBreakfast />;
      case AMENITY.KITCHENETTE:
        return <Kitchen />;
      case AMENITY.PLAY_AREA:
        return <SportsHandball />;
      case AMENITY.BUSINESS_CENTER_ACCESS:
        return <BusinessCenter />;
      case AMENITY.MEETING_ROOM:
        return <MeetingRoom />;
      default:
        return undefined;
    }
  };

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

        <Stack direction='row' spacing={1} alignItems='center'>
          <Badge sx={{ mr: theme.spacing(2) }} badgeContent={room.capacityOfAdults} color='info'>
            <Tooltip title='Adults capacity'>
              <Chip icon={<PeopleAlt />} label='Adults' />
            </Tooltip>
          </Badge>
          <Badge sx={{ mr: theme.spacing(2) }} badgeContent={room.capacityOfAdults} color='info'>
            <Tooltip title='children capacity'>
              <Chip icon={<ChildCare />} label='Cildren' />
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
            <Grid item xs={12} sm={6} key={index}>
              <Tooltip title={`${amenity.name}: ${amenity.description}`} arrow>
                <Chip
                  icon={amenityIcon(
                    AMENITY[amenity.name.toUpperCase().replace(/ /g, '_') as keyof typeof AMENITY],
                  )}
                  label={`${amenity.name}`}
                  variant='filled'
                  color='secondary'
                  sx={{ width: '100%' }}
                />
              </Tooltip>
            </Grid>
          ))}
        </Grid>
      </CardContent>
      <CardActions sx={{ justifyContent: 'space-between', px: theme.spacing(2) }}>
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
