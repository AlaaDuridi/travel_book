import { Button } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { FC } from 'react';

interface ICardActionsProps {
  onEdit: () => void;
  onDelete: () => void;
}

const GridCardActions: FC<ICardActionsProps> = ({ onEdit, onDelete }) => {
  return (
    <>
      <Button size='small' variant='contained' onClick={onEdit} endIcon={<Edit color='action' />}>
        Edit
      </Button>
      <Button size='small' variant='outlined' onClick={onDelete} endIcon={<Delete color='error' />}>
        Delete
      </Button>
    </>
  );
};
export default GridCardActions;
