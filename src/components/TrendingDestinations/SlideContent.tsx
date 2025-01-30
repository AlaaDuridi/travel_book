import { FC } from 'react';
import { Grid, Typography, useMediaQuery, useTheme } from '@mui/material';
import { ITrendingDestination } from '../../types/models/home.model.ts';

interface IDestinationCardProps {
  destination: ITrendingDestination;
}

const SlideContent: FC<IDestinationCardProps> = ({ destination }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  return (
    <Grid container xs={12} justifyContent={'center'} alignItems={'center'} p={5}>
      <Grid
        gap={2}
        item
        container
        justifyContent={'center'}
        alignItems={'center'}
        md={6}
        sm={12}
        direction='column'
      >
        <Grid
          item
          justifyContent={'center'}
          alignItems={'center'}
          container
          sm={12}
          display={isMobile ? 'flex' : 'none'}
        >
          <img
            src={destination.thumbnailUrl}
            alt={destination.cityName}
            style={{ width: '50%', borderRadius: '30%', height: 'auto' }}
          />
        </Grid>
        <Typography variant={'h3'} fontWeight={'bold'} color={'primary'}>
          {destination.cityName}
        </Typography>
        <Typography variant={'h4'} fontWeight={'bold'} color={'secondary'}>
          {destination.countryName}
        </Typography>
        <Typography variant={'h5'}>{destination.description}</Typography>
      </Grid>
      <Grid
        item
        justifyContent={'center'}
        alignItems={'center'}
        container
        md={6}
        display={isMobile ? 'none' : 'flex'}
      >
        <img
          src={destination.thumbnailUrl}
          alt={destination.cityName}
          style={{ width: '70%', borderRadius: '10%', height: 'auto' }}
        />
      </Grid>
    </Grid>
  );
};

export default SlideContent;
