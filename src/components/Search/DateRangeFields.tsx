import { FC, useState } from 'react';
import { Box, Button, Typography, useTheme } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import dayjs, {Dayjs} from 'dayjs';
import DateRangeIcon from '@mui/icons-material/DateRange';
import dayjs from 'dayjs';

interface IResponsiveDateFieldsProps {
  checkInDate: string;
  checkOutDate: string;
  onCheckInChange: (date: string) => void;
  onCheckOutChange: (date: string) => void;
}

const ResponsiveDateFields: FC<IResponsiveDateFieldsProps> = ({
  checkInDate,
  checkOutDate,
  onCheckInChange,
  onCheckOutChange,
}) => {
  const [isDateRangeBarOpen, setIsDateRangeBarOpen] = useState(false);

  const toggleDateSelection = () => {
    setIsDateRangeBarOpen((prev) => !prev);
  };
  const theme = useTheme();
  return (
    <Box sx={{ position: 'relative', width: 'fit-content' }}>
      <Button
        type='button'
        onClick={toggleDateSelection}
        sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: theme.spacing(4) }}
      >
        <DateRangeIcon />
        <Typography fontWeight={500}>{`${checkInDate} - ${checkOutDate}`}</Typography>
      </Button>
      {isDateRangeBarOpen && (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Box sx={{ display: 'flex', gap: 3 }}>
            <DatePicker
              label='Check-in Date'
              value={dayjs(checkInDate)}
              onChange={(date) => onCheckInChange(date?.format('YYYY-MM-DD') || '')}
              minDate={dayjs()} // Prevents selecting past dates
            />
            <DatePicker
              label='Check-out Date'
              value={dayjs(checkOutDate)}
              onChange={(date) => onCheckOutChange(date?.format('YYYY-MM-DD') || '')}
              minDate={dayjs(checkInDate)} // Prevents selecting dates before check-in
            />
          </Box>
        </LocalizationProvider>
      )}
    </Box>
  );
};

export default ResponsiveDateFields;
