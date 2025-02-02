import { FC, useState } from 'react';
import { Box, Button, Typography, useTheme, FormHelperText } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Field, ErrorMessage, FieldProps } from 'formik';
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
      <Box sx={{ display: isDateRangeBarOpen ? 'none' : 'block', mt: theme.spacing(1) }}>
        <Field name='checkInDate'>
          {({ meta }: FieldProps<string>) =>
            meta.touched && meta.error ? <FormHelperText error>{meta.error}</FormHelperText> : null
          }
        </Field>
        <Field name='checkOutDate'>
          {({ meta }: FieldProps<string>) =>
            meta.touched && meta.error ? <FormHelperText error>{meta.error}</FormHelperText> : null
          }
        </Field>
      </Box>
      {isDateRangeBarOpen && (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Box sx={{ display: 'flex', gap: 3 }}>
            <Field name='checkInDate'>
              {({ field, meta }: FieldProps<string>) => (
                <DatePicker
                  label='Check-in Date'
                  value={dayjs(field.value)}
                  onChange={(date) => onCheckInChange(date?.format('YYYY-MM-DD') || '')}
                  minDate={dayjs()}
                  renderInput={(params) => (
                    <>
                      <params.TextField {...params} error={!!meta.error && meta.touched} />
                      <ErrorMessage name='checkInDate' component={FormHelperText} />
                    </>
                  )}
                />
              )}
            </Field>
            <Field name='checkOutDate'>
              {({ field, meta }: FieldProps<string>) => (
                <DatePicker
                  label='Check-out Date'
                  value={dayjs(field.value)}
                  onChange={(date) => onCheckOutChange(date?.format('YYYY-MM-DD') || '')}
                  minDate={dayjs(checkInDate)}
                  renderInput={(params) => (
                    <>
                      <params.TextField {...params} error={!!meta.error && meta.touched} />
                      <ErrorMessage name='checkOutDate' component={FormHelperText} />
                    </>
                  )}
                />
              )}
            </Field>
          </Box>
        </LocalizationProvider>
      )}
    </Box>
  );
};

export default ResponsiveDateFields;
