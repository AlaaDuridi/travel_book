import { FC, useState } from 'react';
import { Grid, Box, useTheme } from '@mui/material';
import SearchForm from '../../components/Search/SearchForm.tsx';
import SearchGrid from '../../components/Search/SearchGrid.tsx';
import SideFilters from '../../components/Search/SideFilters.tsx';
import { INITIAL_FILTERS, ISearchProps } from '../../components/Search/Search.types.ts';

const SearchPage: FC = () => {
  const theme = useTheme();
  const [filters, setFilters] = useState<ISearchProps>(INITIAL_FILTERS);
  const handleFilter = (newFilters: ISearchProps) => {
    setFilters(newFilters);
  };

  return (
    <Box sx={{ p: theme.spacing(3) }}>
      {/* Search Form at the top */}
      <Box sx={{ mb: theme.spacing(4) }}>
        <SearchForm isSearchPage={true} />
      </Box>

      {/* Main content area */}
      <Grid container spacing={4} justifyContent={'space-around'}>
        {/* Side Filters on the left */}
        <Grid item xs={12} md={2} ml={2}>
          <SideFilters onFilter={handleFilter} />
        </Grid>

        {/* Search Results Grid in the center */}
        <Grid item xs={12} md={8}>
          <SearchGrid props={filters} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default SearchPage;
