import { FC } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import {
  Box,
  Avatar,
  Button,
  Paper,
  useTheme,
  Grid,
  TextField,
  Typography,
  CircularProgress,
} from '@mui/material';
import { LockOutlined, Send } from '@mui/icons-material';
import { ILoginCredentials } from '../../types/models/auth.model';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { loginAsync } from '../../store/auth/authSlice';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const LoginSchema = Yup.object().shape({
  userName: Yup.string().required('Username is required'),
  password: Yup.string().required('Password is required'),
});

const LoginForm: FC = () => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { status } = useAppSelector((state) => state.auth);
  const isLoading = status === 'loading';

  const handleSubmit = async (values: ILoginCredentials) => {
    const result = await dispatch(loginAsync(values));
    if (loginAsync.fulfilled.match(result)) {
      // Redirect to the home/dashboard page or handle successful login
      console.log('Login successful', result.payload);
      toast.success('Welcome!');

      navigate('/');
    } else if (loginAsync.rejected.match(result)) {
      // Handle login failure (show error message)
      console.error('Login failed');
      toast.error('An error occured!');
    }
  };

  return (
    <Grid container component='main' sx={{ height: '100vh' }}>
      {/* Left Section with Logo */}
      <Grid
        item
        xs={false}
        sm={4}
        md={4}
        sx={{
          display: { xs: 'none', sm: 'flex' },
          alignItems: 'center',
          background:
            'linear-gradient(90deg, rgba(2,0,36,1) 0%, #827a9f 55%, rgba(67,164,187,1) 100%)',
          // theme.palette.mode === 'dark'
          // ? 'linear-gradient(90deg, #121212 0%, #333333 55%, #444444 100%)'
          // : 'linear-gradient(90deg, rgba(2,0,36,1) 0%, #827a9f 55%, rgba(67,164,187,1) 100%)',
        }}
      >
        <Box component='img' sx={{ width: '95%', maxHeight: '100vh' }} src='/logo.png' />
      </Grid>

      {/* Right Section with Form */}
      <Grid
        item
        xs={12}
        sm={8}
        md={8}
        component={Paper}
        elevation={0}
        container
        alignItems='center'
        justifyContent='center'
        square
        flexDirection='column'
        px={theme.spacing(5)}
        sx={{
          // background: `linear-gradient(90deg, ${theme.palette.mode === 'dark' ? '#444444' : '#63A0B0'} 0%, ${theme.palette.background.default} 40%)`,

          background: `linear-gradient(90deg, rgb(99 160 176) 0%, ${theme.palette.background.default} 2%)`,
        }}
      >
        <Grid
          spacing={2}
          px={theme.spacing(8)}
          container
          item
          flexDirection='column'
          alignItems='center'
        >
          <Avatar sx={{ m: theme.spacing(1), backgroundColor: 'primary.main' }}>
            <LockOutlined />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Welcome Again
          </Typography>

          <Formik
            initialValues={{
              userName: '',
              password: '',
            }}
            validationSchema={LoginSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched, dirty, handleChange, handleBlur, isValid, isSubmitting }) => (
              <Form noValidate style={{ width: '100%' }}>
                <hr style={{ width: '100%' }} />

                <Box mb={2}>
                  <Field
                    name='userName'
                    as={TextField}
                    label='Username'
                    variant='outlined'
                    fullWidth
                    autoFocus
                    error={touched.userName && !!errors.userName}
                    helperText={touched.userName && errors.userName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Box>
                <Box mb={2}>
                  <Field
                    name='password'
                    as={TextField}
                    label='Password'
                    variant='outlined'
                    type='password'
                    fullWidth
                    error={touched.password && !!errors.password}
                    helperText={touched.password && errors.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Box>
                <Button
                  disabled={isLoading || !isValid || isSubmitting || !dirty} // Button disabled if loading, form invalid, or submitting
                  startIcon={isLoading ? <CircularProgress size={20} /> : <Send />} // Add spinner
                  type='submit'
                  variant='contained'
                  color='primary'
                  fullWidth
                >
                  {isLoading ? 'Signing in...' : 'Sign in'}
                </Button>
              </Form>
            )}
          </Formik>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default LoginForm;
