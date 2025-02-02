import { FC } from 'react';
import { INITIAL_FILTERS, ISearchProps, STAR_RATING_OPTIONS } from './Search.types.ts';
import { Formik, Form } from 'formik';
import {
  Slider,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Radio,
  RadioGroup,
  Button,
  Typography,
  Box,
  useTheme,
  Grid,
} from '@mui/material';
import { AMENITY } from '../../constants/room.constants.ts';
import AmenityIcon from '../Rooms/AmenityIcon.tsx';
import { ISortBy, ROOM_TYPES } from '../../types/models/room.model.ts';

interface ISideFiltersProps {
  onFilter: (filters: ISearchProps) => void;
}

const SideFilters: FC<ISideFiltersProps> = ({ onFilter }) => {
  const theme = useTheme();

  const handleFormSubmit = (
    values: ISearchProps,
    {
      setSubmitting,
    }: {
      setSubmitting: (isSubmitting: boolean) => void;
    },
  ) => {
    onFilter(values);
    setSubmitting(false);
  };

  return (
    <Formik
      initialValues={INITIAL_FILTERS}
      onSubmit={(values, { setSubmitting }) => handleFormSubmit(values, { setSubmitting })}
    >
      {({ values, handleChange, handleSubmit, resetForm, handleBlur, isSubmitting }) => (
        <Form style={{ display: 'flex', flex: 1 }}>
          <Grid container spacing={2}>
            <FormControl fullWidth sx={{ mb: theme.spacing(2) }} component='fieldset'>
              <FormLabel component='legend'>Price Range:</FormLabel>
              <Slider
                name='priceRange'
                value={values.priceRange}
                onChange={handleChange}
                valueLabelDisplay='auto'
                valueLabelFormat={(value) => `$${value}`}
                min={0}
                max={1000}
                step={10}
              />
              <Typography variant='body2' color='text.primary' sx={{ marginBottom: 1 }}>
                ${values.priceRange[0]} - ${values.priceRange[1]}
              </Typography>
            </FormControl>

            <FormControl fullWidth sx={{ mb: theme.spacing(2) }} component='fieldset'>
              <FormLabel component='legend'>Star Rating:</FormLabel>
              <RadioGroup
                aria-label='star-rating'
                name='star-rating'
                value={values.starRating}
                onChange={handleChange('starRating')}
              >
                {STAR_RATING_OPTIONS.map((rating) => (
                  <FormControlLabel
                    key={rating}
                    value={rating}
                    control={<Radio />}
                    label={`${rating} Stars`}
                  />
                ))}
              </RadioGroup>
            </FormControl>

            <FormControl
              fullWidth
              sx={{ mb: theme.spacing(2), display: 'block' }}
              component='fieldset'
            >
              <FormLabel component='legend'>Amenities:</FormLabel>
              <FormGroup>
                {Object.entries(AMENITY).map(([key, value]) => (
                  <FormControlLabel
                    key={value}
                    label={
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <AmenityIcon amenity={value as AMENITY} />
                        <span style={{ marginLeft: 8 }}>{value}</span>
                      </div>
                    }
                    control={
                      <Checkbox
                        name={value}
                        color={'secondary'}
                        checked={values.amenities?.some((amenity) => amenity.name === value)}
                        onChange={(e) => {
                          const isChecked = e.target.checked;
                          handleChange({
                            target: {
                              name: 'amenities',
                              value: isChecked
                                ? [...values.amenities, { id: key, name: value }]
                                : values.amenities.filter((item) => item.name !== value),
                            },
                          });
                        }}
                      />
                    }
                  />
                ))}
              </FormGroup>
            </FormControl>

            <FormControl
              fullWidth
              sx={{ mb: theme.spacing(2), display: 'block' }}
              component='fieldset'
            >
              <FormLabel component='legend'>Room Type:</FormLabel>
              <RadioGroup
                aria-label='room-type'
                name='room-type'
                value={values.roomType}
                onChange={handleChange('roomType')}
              >
                {Object.values(ROOM_TYPES).map((type) => (
                  <FormControlLabel key={type} value={type} control={<Radio />} label={type} />
                ))}
              </RadioGroup>
            </FormControl>

            <FormControl
              fullWidth
              sx={{ mb: theme.spacing(2), display: 'block' }}
              component='fieldset'
            >
              <FormLabel component='legend'>Sort By</FormLabel>
              <RadioGroup
                aria-label='sort-by'
                name='sort-by'
                value={values.sort}
                onChange={handleChange('sort')}
              >
                {Object.values(ISortBy).map((sort) => (
                  <FormControlLabel key={sort} value={sort} control={<Radio />} label={sort} />
                ))}
              </RadioGroup>
            </FormControl>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                marginBottom: '1rem',
                gap: 1,
              }}
            >
              <Button
                type='submit'
                variant='contained'
                onClick={() => handleSubmit()}
                sx={{ width: 150 }}
              >
                Filter
              </Button>

              <Button
                type='reset'
                variant='outlined'
                disabled={isSubmitting || values === INITIAL_FILTERS}
                onClick={() => {
                  resetForm();
                  onFilter(INITIAL_FILTERS);
                }}
                sx={{ width: 150 }}
              >
                Clear Filters
              </Button>
            </Box>
          </Grid>
        </Form>
      )}
    </Formik>
  );
};

export default SideFilters;
