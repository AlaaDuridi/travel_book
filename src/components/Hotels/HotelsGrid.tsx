import React, { FC, useState, useEffect } from 'react';
import axios, { CancelTokenSource } from 'axios';
import {
  Container,
  Grid,
  Pagination,
  SelectChangeEvent,
  Stack,
  useTheme,
  Typography,
} from '@mui/material';

let cancelTokenSource: CancelTokenSource;

import { useAppDispatch, useAppSelector } from '../../store/hooks.ts';
import {
  ACTION_TYPES,
  DEBOUNCE_SEARCH_DELAY,
  INITIAL_PAGE_NUMBER,
  INITIAL_PAGE_SIZE,
} from '../../constants/common.constants.ts';
import useDebounce from '../../hooks/useDebounce.ts';
import {
  fetchHotelsAsync,
  setSelectedCityId,
  fetchHotelsByCityAsync,
} from '../../store/hotels/hotelSlice.ts';
import SearchBar from '../SearchBar.tsx';
import AddButton from '../AddButton.tsx';
import PaginationLimitSelect from '../PaginationLimitSelect.tsx';
import HotelCard from './HotelCard.tsx';
import GridsSkeleton from '../Skeleton/GridsSkeleton.tsx';
import HotelActionDialog from './HotelActionDialog.tsx';
import { INITIAL_HOTEL } from '../../constants/hotel.constants.ts';
import CitiesFilterSelect from '../ItemsSelect/CitiesFilterSelect.tsx';

const HotelsGrid: FC = () => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const { hotels, selectedCityId, totalItems } = useAppSelector((state) => state.hotels);
  const { cities } = useAppSelector((state) => state.cities);
  const [page, setPage] = useState<number>(INITIAL_PAGE_NUMBER);
  const [rowsPerPage, setRowsPerPage] = useState<number>(INITIAL_PAGE_SIZE);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const debouncedSearchTerm = useDebounce(searchTerm, DEBOUNCE_SEARCH_DELAY);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isCreatHotelDialogOpen, setIsCreateHotelDialogOpen] = useState<boolean>(false);

  useEffect(() => {
    const fetchHotels = async () => {
      if (cancelTokenSource) {
        cancelTokenSource.cancel('Cancelling previous request');
      }
      cancelTokenSource = axios.CancelToken.source();
      try {
        setIsLoading(true);
        if (selectedCityId) {
          await dispatch(
            fetchHotelsByCityAsync({
              cityId: selectedCityId,
              searchQuery: debouncedSearchTerm,
              pageSize: rowsPerPage,
              pageNumber: page,
              cancelToken: cancelTokenSource.token,
            }),
          ).unwrap();
        } else {
          await dispatch(
            fetchHotelsAsync({
              searchQuery: debouncedSearchTerm,
              pageSize: rowsPerPage,
              pageNumber: page,
              cancelToken: cancelTokenSource.token,
            }),
          ).unwrap();
        }
      } catch (error) {
        console.error('Failed to fetch hotels:', error);
      } finally {
        setIsLoading(false);
      }
    };
    void fetchHotels();
  }, [page, rowsPerPage, selectedCityId, debouncedSearchTerm]);

  const handleSearchTermChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setPage(INITIAL_PAGE_NUMBER);
  };

  const handleCityChange = (event: SelectChangeEvent<number>) => {
    const cityId = Number(event.target.value);
    dispatch(setSelectedCityId(cityId));
    setPage(INITIAL_PAGE_NUMBER);
  };

  const renderHotels = () => {
    if (isLoading) {
      return <GridsSkeleton />;
    }

    if (!hotels.length) {
      return (
        <Typography color='textSecondary' textAlign='center' mt={2}>
          No hotels found.
        </Typography>
      );
    }
    return hotels.map((hotel) => (
      <Grid item xs={12} sm={6} key={hotel.id}>
        <HotelCard hotel={hotel} />
      </Grid>
    ));
  };

  return (
    <Container sx={{ pt: theme.spacing(4) }} maxWidth={'lg'}>
      <Stack gap={2} m={2}>
        <Stack direction='row' justifyContent='space-between' alignItems='center'>
          <Typography variant='h4' component='h2'>
            Hotels
          </Typography>
          <Stack direction='row' gap={2}>
            <SearchBar
              placeholder={'Search for hotels...'}
              value={searchTerm}
              onChange={handleSearchTermChange}
            />

            <CitiesFilterSelect
              selectedItemId={selectedCityId}
              items={cities}
              handleItemChange={handleCityChange}
              firstItemLabel={'All Cities'}
            />
            <AddButton
              label='Add Hotel'
              onClick={() => {
                setIsCreateHotelDialogOpen(true);
              }}
            />
            <PaginationLimitSelect
              limit={rowsPerPage}
              onChange={(event) => {
                setRowsPerPage(Number(event.target.value));
                setPage(INITIAL_PAGE_NUMBER);
              }}
            />
          </Stack>
        </Stack>

        <Grid container spacing={4}>
          {renderHotels()}
        </Grid>

        <Stack direction='row' justifyContent='center' mt={3}>
          <Pagination
            count={Math.ceil(totalItems / rowsPerPage)}
            page={page}
            onChange={(_, value) => setPage(value)}
            color='primary'
          />
        </Stack>
      </Stack>
      {isCreatHotelDialogOpen && (
        <HotelActionDialog
          open={isCreatHotelDialogOpen}
          onClose={() => setIsCreateHotelDialogOpen(false)}
          hotel={INITIAL_HOTEL}
          actionType={ACTION_TYPES.ADD}
        />
      )}
    </Container>
  );
};

export default HotelsGrid;
