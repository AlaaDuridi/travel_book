import { FC } from 'react';
import { MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { PAGE_SIZES } from '../constants/common.constants.ts';

interface IPaginationLimitBoxProps {
  limit: number;
  onChange: (event: SelectChangeEvent) => void;
}

const PaginationLimitSelect: FC<IPaginationLimitBoxProps> = ({ limit, onChange }) => {
  return (
    <Select value={String(limit)} onChange={onChange}>
      {PAGE_SIZES.map((size) => (
        <MenuItem key={size} value={size}>
          {size} per page
        </MenuItem>
      ))}
    </Select>
  );
};
export default PaginationLimitSelect;
