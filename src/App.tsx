import { BrowserRouter } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';

import theme from './styles/theme';
import Toast from './components/Toast';
import AppProvider from './hooks';
import Routes from './routes';

const App = () => (
  <>
    <AppProvider>
      <ChakraProvider theme={theme}>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </ChakraProvider>
    </AppProvider>
    <Toast />
  </>
);

export default App;
