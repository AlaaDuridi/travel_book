import './App.css'
import {Grid2 as Grid, Alert, useTheme} from '@mui/material';
import {toast} from "react-toastify";


function App() {
    const theme = useTheme();
    console.log(theme.palette.primary.light)
    return (
        <>
            <Grid container>
                <Alert title={'hi'} severity={'error'}>Welcome</Alert>
                <button onClick={() => toast.error(
                    'Clicked'
                )}>{'click'} </button>
            </Grid>
        </>
    )
}

export default App
