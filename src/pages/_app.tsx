import { ChakraProvider } from '@chakra-ui/react';
import type { AppProps } from 'next/app';

import { TabProvider } from '../hooks/useTab';
import { theme } from '../styles/theme';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <TabProvider>
        <Component {...pageProps} />
      </TabProvider>
    </ChakraProvider>
  );
}
