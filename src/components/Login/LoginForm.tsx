import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Box, Avatar, Button, Paper, useTheme, Grid, TextField, Typography } from '@mui/material';
import { LockOutlined } from '@mui/icons-material';
import { ILoginCredentials } from '../../types/models/auth.model.ts';

const LoginSchema = Yup.object().shape({
  userName: Yup.string().required('Username is required'),
  password: Yup.string().required('Password is required'),
});

const LoginForm: React.FC = () => {
  const theme = useTheme();
  const handleSubmit = async (values: ILoginCredentials) => {
    console.log('will handle submit here with values:', values);
  };

  return (
    <Grid container component='main' sx={{ height: '100vh' }}>
      <Grid
        item
        sx={{
          display: 'flex',
          alignItems: 'center',
          background:
            'linear-gradient(90deg, rgba(2,0,36,1) 0%, #827a9f 55%, rgba(67,164,187,1) 100%)',
        }}
        xs={false}
        sm={4}
        md={4}
      >
        <Box component={'img'} sx={{ width: '100%', maxHeight: '100vh' }} src={'/logo.png'} />
      </Grid>
      <Grid
        item
        display={'flex'}
        xs={12}
        sm={8}
        md={8}
        alignItems={'center'}
        justifyContent={'center'}
        component={Paper}
        elevation={0}
        px={theme.spacing(5)}
        square
        sx={{
          background: 'linear-gradient(90deg, rgb(99 160 176) 0%, rgba(255, 255, 255, 1) 2%)',
        }}
      >
        <Grid display={'flex'} flexDirection={'column'} alignItems={'center'}>
          <Avatar sx={{ m: theme.spacing(1), bgcolor: 'primary.main' }}>
            <LockOutlined />
          </Avatar>{' '}
          <Typography component='h1' variant='h5'>
            Welcome Again
          </Typography>
          <Formik
            initialValues={{
              userName: '', // Matches ILoginCredentials
              password: '', // Matches ILoginCredentials
            }}
            validationSchema={LoginSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched, handleChange, handleBlur }) => (
              <Form>
                <Box mb={2}>
                  <Field
                    name='userName'
                    as={TextField}
                    label='Username'
                    variant='outlined'
                    fullWidth
                    error={touched.userName && Boolean(errors.userName)}
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
                    error={touched.password && Boolean(errors.password)}
                    helperText={touched.password && errors.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Box>
                <Button type='submit' variant='contained' color='primary' fullWidth>
                  Login
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
