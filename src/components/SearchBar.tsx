import { FC, ChangeEvent } from 'react';
import { TextField, InputAdornment } from '@mui/material';
import { Search } from '@mui/icons-material';

interface ISearchBarProps {
  placeholder: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const SearchBar: FC<ISearchBarProps> = ({ placeholder, value, onChange }) => {
  // const theme = useTheme();
  return (
    <TextField
      placeholder={placeholder}
      value={value}
      fullWidth
      onChange={onChange}
      sx={{
        flexGrow: 1,
        maxWidth: '100%',
      }}
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position='start'>
              <Search />
            </InputAdornment>
          ),
        },
      }}
    />
  );
};

export default SearchBar;
