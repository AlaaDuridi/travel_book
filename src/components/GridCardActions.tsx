import { Button, Stack } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { FC } from 'react';

interface ICardActionsProps {
  onEdit: () => void;
  onDelete?: () => void;
}

const GridCardActions: FC<ICardActionsProps> = ({ onEdit, onDelete }) => {
  return (
    <Stack direction='row' gap={2} justifyContent='flex-end' width='100%'>
      <Button size='small' variant='contained' onClick={onEdit} endIcon={<Edit color='action' />}>
        Edit
      </Button>
      {onDelete && (
        <Button
          size='small'
          variant='outlined'
          onClick={onDelete}
          endIcon={<Delete color='error' />}
        >
          Delete
        </Button>
      )}
    </Stack>
  );
};
export default GridCardActions;
