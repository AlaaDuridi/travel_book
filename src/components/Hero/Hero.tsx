import { FC } from 'react';
import { Grid, Typography, Box, useTheme } from '@mui/material';
import heroImage from '../../assets/hero-image.jpg';

const Hero: FC = () => {
  const theme = useTheme();
  return (
    <>
      <Grid
        container
        justifyContent={'center'}
        alignItems={'center'}
        sx={{ position: 'relative', maxHeight: '450px', width: '100%', overflow: 'hidden' }}
      >
        <Typography
          sx={{
            position: 'absolute',
            left: 0,
            top: '40%',
            transform: 'translateY(-50%)',
            color: 'secondary.main',
            ml: theme.spacing(2),
            fontWeight: 'bold',
            p: theme.spacing(5, 2),
            fontSize: { xs: '1.5rem', sm: '2.5rem', md: '3rem' },
            fontStyle: 'normal',
            fontFamily: '"Edu AU VIC WA NT Pre", serif',
          }}
          variant='h1'
          align='center'
          gutterBottom
        >
          Find your next destination with us
        </Typography>
        <Box
          sx={{
            objectFit: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            width: '100%',
          }}
          component={'img'}
          src={heroImage}
          alt={'hero background image'}
        />
      </Grid>
    </>
  );
};
export default Hero;
