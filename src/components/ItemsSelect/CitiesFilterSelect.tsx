import { MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { ICity } from '../../types/models/city.model.ts';
import { FC } from 'react';
import { IHotel } from '../../types/models/hotel.model.ts';

interface ICitiesFilterSelectProps {
  selectedItemId: number | undefined;
  handleItemChange: (event: SelectChangeEvent<number>) => void;
  items: ICity[] | IHotel[];
  firstItemLabel: string;
  disableAll?: boolean;
}

const CitiesFilterSelect: FC<ICitiesFilterSelectProps> = ({
  selectedItemId,
  handleItemChange,
  items,
  firstItemLabel,
  disableAll,
}) => {
  return (
    <Select
      value={selectedItemId || ''}
      onChange={handleItemChange}
      displayEmpty
      label={'Select city'}
      inputProps={{ 'aria-label': 'Select city' }}
    >
      <MenuItem value='' disabled={disableAll}>
        <em>{firstItemLabel}</em>
      </MenuItem>
      {items.map((item) => (
        <MenuItem key={item.id} value={item.id}>
          {item.name}
        </MenuItem>
      ))}
    </Select>
  );
};

export default CitiesFilterSelect;
