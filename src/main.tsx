import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './views/app/App.tsx';
import { CustomThemeProvider } from './contexts/ThemeContext.tsx';
import CustomToastContainer from './components/CustomToastContainer.tsx';
import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CustomThemeProvider>
      <CustomToastContainer
        position='top-right'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </CustomThemeProvider>
  </StrictMode>,
);
