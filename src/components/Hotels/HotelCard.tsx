import { FC, useState } from 'react';
import { IHotel } from '../../types/models/hotel.model.ts';
import {
  Card,
  CardActions,
  CardContent,
  Rating,
  Stack,
  Typography,
  useTheme,
  Box,
  Button,
} from '@mui/material';
import Map from '../Map.tsx';
import HotelActionDialog from './HotelActionDialog.tsx';
import { ACTION_TYPES } from '../../constants/common.constants.ts';

interface IHotelCardProps {
  hotel: IHotel;
}

const HotelCard: FC<IHotelCardProps> = ({ hotel }) => {
  const theme = useTheme();
  const [isEditHotelDialogOpen, setIsEditHotelDialogOpen] = useState<boolean>(false);

  const handleOpenUpdateDialog = () => {
    setIsEditHotelDialogOpen(true);
  };

  return (
    <>
      <Card
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          height: '100%',
          backgroundColor: theme.palette.background.paper,
          borderRadius: theme.spacing(2),
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
        }}
      >
        <CardContent>
          <Stack spacing={2}>
            <Typography
              variant='h6'
              component='h2'
              sx={{
                fontWeight: 'bold',
                textTransform: 'capitalize',
                color: theme.palette.text.primary,
              }}
            >
              {hotel.name}
            </Typography>

            <Box>
              <Typography
                variant='body2'
                component='span'
                sx={{
                  fontWeight: 'bold',
                  color: theme.palette.text.secondary,
                }}
              >
                Type:
              </Typography>{' '}
              <Typography
                variant='body2'
                component='span'
                sx={{ color: theme.palette.text.primary }}
              >
                {hotel.hotelType}
              </Typography>
            </Box>

            <Rating value={hotel.starRating} readOnly size='small' />

            <Box>
              <Typography
                variant='body2'
                component='span'
                sx={{
                  fontWeight: 'bold',
                  color: theme.palette.text.secondary,
                }}
              >
                Description:
              </Typography>{' '}
              <Typography
                variant='body2'
                component='span'
                sx={{ color: theme.palette.text.primary }}
              >
                {hotel.description}
              </Typography>
            </Box>

            {hotel.latitude && hotel.longitude ? (
              <Box
                sx={{
                  mt: theme.spacing(2),
                  borderRadius: theme.spacing(1),
                  overflow: 'hidden',
                  boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)',
                }}
              >
                <Map latitude={hotel.latitude} longitude={hotel.longitude} />
              </Box>
            ) : (
              <Typography variant='body2' color='textSecondary'>
                Location not available
              </Typography>
            )}
          </Stack>
        </CardContent>

        <CardActions sx={{ justifyContent: 'space-between', px: theme.spacing(2) }}>
          <Button size='small' variant='contained' color='primary' onClick={handleOpenUpdateDialog}>
            Edit
          </Button>
        </CardActions>
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
