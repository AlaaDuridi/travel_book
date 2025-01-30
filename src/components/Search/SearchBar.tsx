import { FC, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { SingleBed, PersonOutline } from '@mui/icons-material';
import { useFormik } from 'formik';
import dayjs from 'dayjs';
import useSearchResults from '../../hooks/useSearchResults.ts';
import { OptionItem, DateCheck } from './components'; // Adjust imports based on your structure
import { Box, Button, OutlinedInput, useTheme } from '@mui/material';
import SearchContainer from './SearchContainer.tsx';

const SearchBar: FC = () => {
  const theme = useTheme();
  const [searchParams, setSearchParams] = useSearchParams();
  const { updateSearchParams } = useSearchResults(); // Custom hook for search logic
  const [searchState, setSearchState] = useState({
    isOptionsOpened: false,
    isDateOpened: false,
  });
  const { isOptionsOpened, isDateOpened } = searchState;
  const navigate = useNavigate();

  // Handle date logic
  const handleDateLogic = (newDate, currentDate) => {
    const formattedCheckInDate = dayjs(newDate.startDate).format('YYYY-MM-DD');
    const formattedCheckOutDate = dayjs(newDate.endDate).format('YYYY-MM-DD');

    if (formattedCheckInDate < currentDate || formattedCheckOutDate < currentDate) {
      console.error('Check-in or check-out date cannot be in the past.');
    }

    const newCheckInDate = formattedCheckInDate < currentDate ? currentDate : formattedCheckInDate;

    const newCheckOutDate =
      formattedCheckOutDate <= currentDate
        ? dayjs(currentDate).add(1, 'day').format('YYYY-MM-DD')
        : formattedCheckOutDate === formattedCheckInDate
          ? dayjs(formattedCheckInDate).add(1, 'day').format('YYYY-MM-DD')
          : formattedCheckOutDate;

    return { newCheckInDate, newCheckOutDate };
  };

  // Handle setting dates
  const handleSetDate = (newDate) => {
    const currentDate = dayjs().format('YYYY-MM-DD');
    const { newCheckInDate, newCheckOutDate } = handleDateLogic(newDate, currentDate);

    formik.setFieldValue('checkInDate', newCheckInDate);
    formik.setFieldValue('checkOutDate', newCheckOutDate);
  };

  // Toggle options/date states
  const handleToggleState = (stateKey) => {
    setSearchState((prevState) => ({
      ...prevState,
      [stateKey]: !prevState[stateKey],
    }));
  };

  // Close all search states
  const handleCloseSearchState = () => {
    setSearchState({
      isOptionsOpened: false,
      isDateOpened: false,
    });
  };

  // Adjust values for adults, children, and rooms
  const adjustValue = (option, increment) => {
    const oldValue = formik.values[option];
    const newValue = increment ? oldValue + 1 : oldValue - 1;
    formik.setFieldValue(option, newValue);
  };

  // Formik initialization
  const formik = useFormik({
    initialValues: {
      city: searchParams.get('city') || '',
      checkInDate: searchParams.get('checkInDate') || dayjs().format('YYYY-MM-DD'),
      checkOutDate: searchParams.get('checkOutDate') || dayjs().add(1, 'day').format('YYYY-MM-DD'),
      adults: parseInt(searchParams.get('adults'), 10) || 2,
      children: parseInt(searchParams.get('children'), 10) || 0,
      numberOfRooms: parseInt(searchParams.get('numberOfRooms'), 10) || 1,
    },
    onSubmit: (values) => {
      const newSearchParams = new URLSearchParams(values);
      setSearchParams(newSearchParams);
      updateSearchParams(values); // Update Redux store or context
      navigate('/search?' + newSearchParams.toString()); // Navigate to search results
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
      <Box sx={{ display: 'flex', justifyContent: 'center', position: 'relative' }}>
        <SearchContainer position='absolute' topXs='80px' topLg='80px'>
          {/* City Input */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: theme.spacing(5) }}>
            <SingleBed sx={{ mr: theme.spacing(5) }} />
            <OutlinedInput
              id='city'
              name='city'
              onChange={formik.handleChange}
              value={formik.values.city}
              type='text'
              placeholder='Where are you going?'
            />
          </Box>

          {/* Date Picker */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: theme.spacing(5) }}>
            <DateCheck
              dateValues={{
                checkInDate: formik.values.checkInDate,
                checkOutDate: formik.values.checkOutDate,
              }}
              handleSetDate={handleSetDate}
              isDateOpened={isDateOpened}
              toggleDate={() => handleToggleState('isDateOpened')}
            />
          </Box>

          {/* Guests and Rooms */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: theme.spacing(5) }}>
            <Button
              type='button'
              variant={'text'}
              onClick={() => handleToggleState('isOptionsOpened')}
            >
              <PersonOutline sx={{ mr: theme.spacing(5) }} />
              <span>
                {`${formik.values.adults} ${formik.values.adults > 1 ? 'adults . ' : 'adult . '}
                 ${formik.values.children} ${formik.values.children === 1 ? 'child . ' : 'children . '}
                 ${formik.values.numberOfRooms} ${formik.values.numberOfRooms > 1 ? 'rooms' : 'room'}`}
              </span>
            </Button>

            {isOptionsOpened && (
              <div className={styles.options}>
                {[
                  { label: 'Adults', option: 'adults', min: 1 },
                  { label: 'Children', option: 'children', min: 0 },
                  { label: 'Rooms', option: 'numberOfRooms', min: 1 },
                ].map(({ label, option, min }) => (
                  <OptionItem
                    key={option}
                    label={label}
                    count={formik.values[option]}
                    min={min}
                    onIncrement={() => adjustValue(option, true)}
                    onDecrement={() => adjustValue(option, false)}
                  />
                ))}
              </div>
            )}
          </Box>

          {/* Search Button */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: theme.spacing(5) }}>
            <Button type='submit' onClick={handleCloseSearchState}>
              Search
            </Button>
          </Box>
        </SearchContainer>
      </Box>
    </form>
  );
};

export default SearchBar;
