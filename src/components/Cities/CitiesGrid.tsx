import React, {useEffect} from 'react';
import {
    Box,
    Container,
    Grid,
    Pagination,
    SelectChangeEvent,
    Stack,
    Typography,
    useTheme,
} from '@mui/material';
import CitiesCard from './CityCard';
import SearchBar from '../SearchBar.tsx';
import CityActionDialog from './CityActionDialog.tsx';
import {useAppDispatch, useAppSelector} from '../../store/hooks.ts';
import {fetchCities, deleteCity} from '../../store/cities/citySlice.ts';
import {
    ACTION_TYPES,
    DEBOUNCE_SEARCH_DELAY,
    INITIAL_PAGE_NUMBER,
    INITIAL_PAGE_SIZE,
} from '../../constants/common.constants.ts';
import useDebounce from '../../hooks/useDebounce.ts';
import {ICity} from '../../types/models/city.model.ts';
import {INITIAL_CITY} from '../../constants/city.constants.ts';
import axios, {CancelTokenSource} from 'axios';
import {deleteAlert} from '../../util/swal.util.ts';
import AddButton from '../AddButton.tsx';
import PaginationLimitSelect from '../PaginationLimitSelect.tsx';
import GridsSkeleton from '../Skeleton/GridsSkeleton.tsx';

let cancelTokenSource: CancelTokenSource | undefined;
const CitiesGrid: React.FC = () => {
    const dispatch = useAppDispatch();
    const {cities, loading} = useAppSelector((state) => state.cities);
    const [page, setPage] = React.useState<number>(INITIAL_PAGE_NUMBER);
    const [pageSize, setPageSize] = React.useState(INITIAL_PAGE_SIZE);
    const [searchTerm, setSearchTerm] = React.useState<string>('');
    const debouncedSearchTerm = useDebounce(searchTerm, DEBOUNCE_SEARCH_DELAY);

    const [isCityActionDialogOpen, setIsCityActionDialogOpen] = React.useState<boolean>(false);
    const [actionType, setActionType] = React.useState<ACTION_TYPES>(ACTION_TYPES.ADD);
    const [selectedCity, setSelectedCity] = React.useState<ICity>(INITIAL_CITY);

    const theme = useTheme();
    const fetchCitiesWithCancelToken = async () => {
        if (cancelTokenSource) {
            cancelTokenSource.cancel('Cancelling previous request');
        }
        cancelTokenSource = axios.CancelToken.source();

        try {
            await dispatch(
                fetchCities({
                    searchQuery: debouncedSearchTerm,
                    pageSize: pageSize,
                    pageNumber: page,
                    cancelToken: cancelTokenSource.token,
                }),
            );
        } catch (error) {
            if (!axios.isCancel(error)) {
                console.error('Failed to fetch cities:', error);
            }
        }
    };

    useEffect(() => {
        void fetchCitiesWithCancelToken();
        return () => {
            if (cancelTokenSource) {
                cancelTokenSource.cancel('Component unmounted, cancelling request');
            }
        };
    }, [page, pageSize, debouncedSearchTerm]);
    const handleEditCity = (city: ICity) => {
        setActionType(ACTION_TYPES.EDIT);
        setSelectedCity(city);
        setIsCityActionDialogOpen(true);
    };

    const handleDeleteCity = async (city: ICity) => {
        await deleteAlert(
            theme,
            async () => {
                const resultAction = await dispatch(deleteCity(city.id));
                if (deleteCity.fulfilled.match(resultAction)) {
                } else if (deleteCity.rejected.match(resultAction)) {
                    const errorMessage = resultAction.payload as string;
                    throw new Error(errorMessage);
                }
            },
            'Are you sure you want to delete this city?',
            `The city "${city.name}" will be permanently deleted.`,
        );
    };

    const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    const handlePageSizeChange = (event: SelectChangeEvent) => {
        setPageSize(Number(event.target.value));
        setPage(INITIAL_PAGE_NUMBER);
    };

    const handleSearchTermChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
        setPage(INITIAL_PAGE_NUMBER);
    };

    return (
        <>
            <Container sx={{pt: theme.spacing(4)}} maxWidth={'lg'}>
                <Stack gap={2} m={2}>
                    <Stack direction='row' justifyContent='space-between' alignItems='center' spacing={2}>
                        <Typography variant='h4' gutterBottom>
                            Cities
                        </Typography>
                        <Stack direction='row' justifyContent='right' my={2} gap={2}>
                            <SearchBar
                                placeholder={'Search for cities ...'}
                                value={searchTerm}
                                onChange={handleSearchTermChange}
                            />
                            <AddButton
                                label={'Add City'}
                                onClick={() => {
                                    setIsCityActionDialogOpen(true);
                                    setActionType(ACTION_TYPES.ADD);
                                    setSelectedCity(INITIAL_CITY);
                                }}
                            />
                        </Stack>
                    </Stack>
                    <Box display='flex' justifyContent='space-between' alignItems='center' marginBottom={3}>
                        <Typography variant='subtitle1'>Showing {cities.length} cities</Typography>
                        <PaginationLimitSelect limit={pageSize} onChange={handlePageSizeChange}/>
                    </Box>
                    {loading ? (
                        <GridsSkeleton/>
                    ) : (
                        <Grid container spacing={3}>
                            {cities.map((city) => (
                                <Grid item xs={12} sm={6} md={4} lg={3} key={city.id}>
                                    <CitiesCard city={city} onEdit={handleEditCity} onDelete={handleDeleteCity}/>
                                </Grid>
                            ))}
                        </Grid>
                    )}
                    <Box display='flex' justifyContent='center' marginTop={3}>
                        <Pagination
                            count={Math.ceil(cities.length / pageSize)}
                            page={page}
                            onChange={handlePageChange}
                            color='primary'
                        />
                    </Box>
                </Stack>
            </Container>

            {isCityActionDialogOpen && (
                <CityActionDialog
                    open={isCityActionDialogOpen}
                    city={selectedCity}
                    actionType={actionType}
                    onClose={() => setIsCityActionDialogOpen(false)}
                />
            )}
        </>
    );
};

export default CitiesGrid;
