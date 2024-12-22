import { MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { ICity } from '../../types/models/city.model.ts';
import { FC } from 'react';

interface ICitiesFilterSelectProps {
  selectedCityId: number | undefined;
  handleCityChange: (event: SelectChangeEvent<number>) => void;
  cities: ICity[];
}

const CitiesFilterSelect: FC<ICitiesFilterSelectProps> = ({
  selectedCityId,
  handleCityChange,
  cities,
}) => {
  return (
    <Select
      value={selectedCityId || ''}
      onChange={handleCityChange}
      displayEmpty
      inputProps={{ 'aria-label': 'Select city' }}
    >
      <MenuItem value=''>
        <em>All Cities</em>
      </MenuItem>
      {cities.map((city) => (
        <MenuItem key={city.id} value={city.id}>
          {city.name}
        </MenuItem>
      ))}
    </Select>
  );
};

export default CitiesFilterSelect;
