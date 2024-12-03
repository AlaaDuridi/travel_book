import './App.css';
import { Grid2 as Grid, Alert, useTheme, Button, Paper } from '@mui/material';
import { toast } from 'react-toastify';

function App() {
  const theme = useTheme();
  console.log(theme.palette.primary.light);
  return (
    <>
      <Grid container>
        <Alert title={'hi'} severity={'error'}>
          Welcome
        </Alert>
        <button onClick={() => toast.error('Clicked')}>{'click'} </button>
        <Button variant='contained' sx={{ backgroundColor: theme.palette.primary.light }}>
          Click me
        </Button>
        <Button variant='contained' sx={{ backgroundColor: theme.palette.primary.main }}>
          Click me
        </Button>
        <Button variant='contained' sx={{ backgroundColor: theme.palette.primary.dark }}>
          Click me
        </Button>
        <Button variant='contained' sx={{ backgroundColor: theme.palette.secondary.light }}>
          Click me
        </Button>
        <Button variant='contained' sx={{ backgroundColor: theme.palette.secondary.main }}>
          Click me
        </Button>
        <Button variant='contained' sx={{ backgroundColor: theme.palette.secondary.dark }}>
          Click me
        </Button>
        <Paper>Hi helllo</Paper>
      </Grid>
    </>
  );
}

export default App;
