import { ChakraProvider, createStandaloneToast } from '@chakra-ui/react';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';

import { TabProvider } from '../hooks/useTab';
import { store } from '../store';
import { theme } from '../styles/theme';

const { ToastContainer } = createStandaloneToast();

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <TabProvider>
          <Component {...pageProps} />
        </TabProvider>
      </ChakraProvider>
      <ToastContainer />
    </Provider>
  );
}
