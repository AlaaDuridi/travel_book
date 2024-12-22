import { Button } from '@mui/material';
import { Add } from '@mui/icons-material';
import { FC, ReactNode } from 'react';

interface IAddButtonProps {
  onClick: () => void;
  label: string;
  endIcon?: ReactNode;
}

const AddButton: FC<IAddButtonProps> = ({ onClick, label, endIcon }) => {
  return (
    <Button variant='contained' onClick={onClick} endIcon={endIcon ?? <Add />} fullWidth>
      {label}
    </Button>
  );
};
export default AddButton;
