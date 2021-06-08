import { BrowserRouter } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';

import theme from './styles/theme';
import Toast from './components/Toast';
import AppProvider from './hooks';
import Routes from './routes';
import TabNavigation from './components/TabNavigation';
import { appContainer } from './styles/styles';

const App = () => (
  <>
    <AppProvider>
      <ChakraProvider theme={theme}>
        <BrowserRouter>
          <div style={appContainer}>
            <Routes />
          </div>
          <TabNavigation />
        </BrowserRouter>
      </ChakraProvider>
    </AppProvider>
    <Toast />
  </>
);

export default App;
