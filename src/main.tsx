import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './views/app/App.tsx';
import { CustomThemeProvider } from './contexts/ThemeContext.tsx';
import CustomToastContainer from './components/CustomToastContainer.tsx';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';

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
        <Provider store={store}>
          <App />
        </Provider>
      </BrowserRouter>
    </CustomThemeProvider>
  </StrictMode>,
);
