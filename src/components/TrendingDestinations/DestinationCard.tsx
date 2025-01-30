import { FC } from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import { ITrendingDestination } from '../../types/models/home.model.ts';
import { LocationOn } from '@mui/icons-material';

interface IDestinationCardProps {
  destination: ITrendingDestination;
}

const DestinationCard: FC<IDestinationCardProps> = ({ destination }) => {
  //cityId: number;
  //     cityName: string;
  //     countryName: string;
  //     description: string;
  //     thumbnailUrl: string;

  return (
    <>
      <Card>
        <CardMedia
          component='img'
          height='140'
          image={destination.thumbnailUrl}
          alt={destination.cityName}
        />
        <CardContent>
          <Typography gutterBottom variant='h5' component='div'>
            <LocationOn sx={{ fontSize: '1.2rem', marginRight: 0.5 }} />
            {destination.cityName} - {destination.countryName}
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            {destination.description}
          </Typography>
        </CardContent>
      </Card>
    </>
  );
};

export default DestinationCard;
