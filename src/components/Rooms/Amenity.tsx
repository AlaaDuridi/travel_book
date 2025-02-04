import { FC } from 'react';
import { Chip, Grid, Tooltip } from '@mui/material';
import AmenityIcon from './AmenityIcon.tsx';
import { AMENITY } from '../../constants/room.constants.ts';
import { IRoomAmenity } from '../../types/models/room.model.ts';

interface IAmenityProps {
  amenity: IRoomAmenity;
  index: number;
}

const Amenity: FC<IAmenityProps> = ({ amenity, index }) => {
  return (
    <Grid item xs={12} sm={6} key={index}>
      <Tooltip title={`${amenity.name}: ${amenity.description}`} arrow>
        <Chip
          icon={
            <AmenityIcon
              amenity={
                AMENITY[amenity.name.toUpperCase().replace(/ /g, '_') as keyof typeof AMENITY]
              }
            />
          }
          label={`${amenity.name}`}
          variant='filled'
          color='secondary'
          sx={{ width: '100%' }}
        />
      </Tooltip>
    </Grid>
  );
};

export default Amenity;
