import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';

import theme from './styles/theme';
import AppProvider from './hooks';
import Routes from './routes';

const App: React.FC = () => (
  <>
    <AppProvider>
      <ChakraProvider theme={theme}>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </ChakraProvider>
    </AppProvider>
  </>
);

export default App;
