import {
  Card,
  CardContent,
  Stack,
  Tooltip,
  Button,
  CardActions,
  Typography,
  IconButton,
} from '@mui/material';
import { Edit, Visibility, VisibilityOff, Delete } from '@mui/icons-material';
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
    <Card>
      <CardContent>
        <Typography variant='h5' component='h2' mb={2}>
          {city.name}
        </Typography>
        <Typography variant='body1' color='text.secondary'>
          {isViewFullDescription ? city.description : truncateText(city.description, 170)}
        </Typography>
      </CardContent>

      <CardActions>
        <Tooltip
          title={isViewFullDescription ? 'View less' : 'View more'}
          onClick={() => setIsViewFullDescription((prev) => !prev)}
        >
          <IconButton>{isViewFullDescription ? <VisibilityOff /> : <Visibility />}</IconButton>
        </Tooltip>
        <Stack direction='row' width={'100%'} gap={2} justifyContent='flex-end' mt={1}>
          <Button
            size='small'
            variant='contained'
            onClick={() => onEdit(city)}
            endIcon={<Edit color='action' />}
          >
            Edit
          </Button>
          <Button
            size='small'
            variant='outlined'
            onClick={() => onDelete(city)}
            endIcon={<Delete color='error' />}
          >
            Delete
          </Button>
        </Stack>
      </CardActions>
    </Card>
  );
};
export default CityCard;
