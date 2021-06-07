import { BrowserRouter } from 'react-router-dom';
import { Box, ChakraProvider } from '@chakra-ui/react';

import theme from './styles/theme';
import Toast from './components/Toast';
import AppProvider from './hooks';
import Routes from './routes';
import TabNavigation from './components/TabNavigation';

const App = () => (
  <>
    <AppProvider>
      <ChakraProvider theme={theme}>
        <BrowserRouter>
          <Box pb={60}>
            <Routes />
          </Box>
          <TabNavigation />
        </BrowserRouter>
      </ChakraProvider>
    </AppProvider>
    <Toast />
  </>
);

export default App;
