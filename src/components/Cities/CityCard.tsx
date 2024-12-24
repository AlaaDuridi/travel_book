import {
  Card,
  CardContent,
  Tooltip,
  CardActions,
  Typography,
  IconButton,
  Button,
  Box,
} from '@mui/material';
import { Visibility, VisibilityOff, Edit, Delete } from '@mui/icons-material';
import { FC, useState } from 'react';
import { ICity } from '../../types/models/city.model.ts';
import { truncateText } from '../../constants/common.constants.ts';

interface ICityCardProps {
  city: ICity;
  onEdit: (city: ICity) => void;
  onDelete: (city: ICity) => void;
}

const CityCard: FC<ICityCardProps> = ({ city, onEdit, onDelete }) => {
  const [isViewFullDescription, setIsViewFullDescription] = useState<boolean>(false);

  return (
    <Card
      sx={{
        backgroundColor: 'background.paper',
        borderRadius: 2,
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%',
      }}
    >
      <CardContent>
        <Typography
          variant='h6'
          component='h2'
          sx={{ fontWeight: 'bold', color: 'text.primary', mb: 2 }}
        >
          {city.name}
        </Typography>
        <Typography variant='body2' color='text.secondary' sx={{ mb: 2, lineHeight: 1.6 }}>
          {isViewFullDescription ? city.description : truncateText(city.description, 170)}
        </Typography>
        <Tooltip
          title={isViewFullDescription ? 'View less' : 'View more'}
          onClick={() => setIsViewFullDescription((prev) => !prev)}
        >
          <IconButton size='small' sx={{ color: 'primary.main' }}>
            {isViewFullDescription ? <VisibilityOff /> : <Visibility />}
          </IconButton>
        </Tooltip>
      </CardContent>

      <CardActions
        sx={{
          padding: 2,
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Box>
          <Button
            variant='contained'
            size='small'
            color='primary'
            startIcon={<Edit />}
            onClick={() => onEdit(city)}
          >
            Edit
          </Button>
        </Box>
        <Button
          variant='outlined'
          size='small'
          color='error'
          startIcon={<Delete />}
          onClick={() => onDelete(city)}
        >
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};

export default CityCard;
