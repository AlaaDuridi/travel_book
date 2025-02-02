import * as yup from 'yup';
import { FC, useState, FocusEvent, KeyboardEvent, PointerEvent } from 'react';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  Autocomplete,
  useTheme,
  Stack,
  Rating,
  Grid,
  TextField,
  Button,
  Typography,
  Box,
  CircularProgress,
} from '@mui/material';
import { Form, Formik } from 'formik';
import useSearchResults from '../../hooks/useSearchResults.ts';
import { IHomeSearchRequestParams } from '../../types/models/home.model.ts';
import ResponsiveDateFields from './DateRangeFields.tsx';
import GroupIcon from '@mui/icons-material/Group';
import SearchIcon from '@mui/icons-material/Search';
import { IOption, OPTIONS } from './Search.types.ts';
import NumberInput from './NumberInput.tsx';
import { ISortBy } from '../../types/models/room.model.ts';

const VALIDATION_SCHEMA = yup.object().shape({
  city: yup.string(),
  checkInDate: yup.string().required('Check-in date is required'),
  checkOutDate: yup
    .string()
    .required('Check-out date is required')
    .test('is-after-check-in', 'Check-out date must be after check-in date', function (value) {
      const { checkInDate } = this.parent;
      return dayjs(value).isAfter(dayjs(checkInDate));
    }),
  numberOfRooms: yup.number(),
  adults: yup.number(),
  children: yup.number(),
  starRating: yup.number(),
  sort: yup.string(),
});

interface ISearchFormProps {
  isSearchPage?: boolean;
}

const SearchForm: FC<ISearchFormProps> = ({ isSearchPage = false }) => {
  const theme = useTheme();
  const { searchParams, isLoading, updateSearchParams } = useSearchResults();
  const navigate = useNavigate();

  const [isOptionsOpen, setIsOptionsOpen] = useState<boolean>(false);
  const [isFiltersOpen, setIsFiltersOpen] = useState<boolean>(false);
  return (
    <Card sx={{ p: theme.spacing(3), maxWidth: '100%' }}>
      <Formik
        initialValues={searchParams}
        validationSchema={VALIDATION_SCHEMA}
        onSubmit={async (values: IHomeSearchRequestParams, { setSubmitting }) => {
          try {
            updateSearchParams(values);
            if (!isSearchPage)
              navigate(
                `/user/search?${new URLSearchParams(values as Record<string, string>).toString()}`,
              );
          } catch (error) {
            console.error('Submission error:', error);
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ values, setFieldValue, touched, isValid, handleBlur, isSubmitting }) => (
          <Form>
            <Stack direction={{ md: 'row' }} spacing={2} alignItems='center'>
              <Grid
                container
                direction={{ sm: 'column', md: 'row' }}
                spacing={1}
                alignItems='center'
                justifyContent='space-between'
              >
                {/*city field*/}
                <Grid item xs={12} md={6} lg={3}>
                  <TextField
                    name={'city'}
                    placeholder={'Enter your destination'}
                    value={values.city}
                    onChange={(e) => setFieldValue('city', e.target.value)}
                    onBlur={handleBlur}
                  />
                </Grid>
                {/*check in - check out range*/}
                <Grid item xs={12} md={6} lg={2}>
                  <ResponsiveDateFields
                    checkInDate={values.checkInDate || ''}
                    checkOutDate={values.checkOutDate || ''}
                    onCheckInChange={(date) => setFieldValue('checkInDate', date)}
                    onCheckOutChange={(date) => setFieldValue('checkOutDate', date)}
                  />
                </Grid>
                {/*options: adults, numberOfRooms, children*/}
                <Grid item xs={12} md={6} lg={3}>
                  <Box sx={{ position: 'relative', width: 'fit-content' }}>
                    <Button
                      type={'button'}
                      onClick={() => setIsOptionsOpen((prev) => !prev)}
                      sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                    >
                      <GroupIcon />
                      <Typography>
                        {`${values.adults} ${values.adults! > 1 ? 'adults . ' : 'adult . '}
                                        ${values.children} ${values.children! === 1 ? 'child . ' : 'children . '}
                                        ${values.numberOfRooms} ${values.numberOfRooms! > 1 ? 'rooms' : 'room'}`}
                      </Typography>
                    </Button>

                    {isOptionsOpen && (
                      <Box sx={{ display: 'flex', gap: 2 }}>
                        <Stack gap={2}>
                          {OPTIONS.map((option: IOption) => (
                            <Stack
                              key={option.name}
                              direction={'row'}
                              justifyContent={'space-between'}
                              alignItems={'center'}
                              gap={3}
                            >
                              <Typography variant={'h5'}>{option.label}</Typography>
                              <NumberInput
                                aria-label={option.label}
                                min={option.min}
                                value={values[option.name] as number}
                                onChange={(
                                  _event:
                                    | FocusEvent<HTMLInputElement>
                                    | PointerEvent
                                    | KeyboardEvent,
                                  newValue: number | null,
                                ) => {
                                  setFieldValue(option.name, newValue);
                                }}
                              />
                            </Stack>
                          ))}
                        </Stack>
                      </Box>
                    )}
                  </Box>
                </Grid>

                <Grid item xs={12} md={6} lg={2}>
                  <Box sx={{ position: 'relative', width: 'fit-content' }}>
                    <Button
                      type={'button'}
                      onClick={() => setIsFiltersOpen((prev) => !prev)}
                      sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                    >
                      <GroupIcon />
                      <Typography>{`Sort by ${values.sort} .${values.starRate} Stars`}</Typography>
                    </Button>

                    {isFiltersOpen && (
                      <Box sx={{ display: 'flex', gap: 2 }}>
                        <Stack gap={2}>
                          <Stack
                            direction='row'
                            gap={3}
                            alignItems='center'
                            justifyContent='space-between'
                          >
                            <Typography variant='h5'>Rating</Typography>
                            <Rating
                              name='starRate'
                              value={values.starRate}
                              onChange={(_, newValue) => {
                                setFieldValue('starRate', newValue);
                              }}
                            />
                          </Stack>
                          <Stack
                            direction='row'
                            gap={3}
                            alignItems='center'
                            justifyContent='space-between'
                          >
                            <Typography variant='h5' width={70}>
                              Sort by
                            </Typography>
                            <Autocomplete
                              disablePortal
                              options={Object.values(ISortBy)}
                              sx={{ width: 130 }}
                              value={values.sort}
                              onChange={(_, newValue) => {
                                setFieldValue('sort', newValue ? newValue : '');
                              }}
                              renderInput={(params) => <TextField name='sort' {...params} />}
                            />
                          </Stack>
                        </Stack>
                      </Box>
                    )}
                  </Box>
                </Grid>
              </Grid>
              <Button
                type={'submit'}
                variant={'contained'}
                disabled={isLoading || (touched && !isValid) || isSubmitting}
                endIcon={<SearchIcon />}
                startIcon={(isLoading || isSubmitting) && <CircularProgress />}
              >
                Search
              </Button>
            </Stack>
          </Form>
        )}
      </Formik>
    </Card>
  );
};

export default SearchForm;
