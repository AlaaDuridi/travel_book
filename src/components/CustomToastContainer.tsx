import React from 'react';
import {ToastContainer, ToastContainerProps} from 'react-toastify';
import {useTheme} from '@mui/material';
import 'react-toastify/dist/ReactToastify.css';

const CustomToastContainer: React.FC<ToastContainerProps> = (props) => {
    const theme = useTheme();
    return (
        <ToastContainer
            {...props}
            theme={theme.palette.mode}
            toastStyle={{
                fontFamily: theme.typography.fontFamily,
                borderRadius: theme.shape.borderRadius,
                boxShadow: theme.shadows[2],

            }}

        />
    );
};

export default CustomToastContainer;
