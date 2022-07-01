import { extendTheme } from '@chakra-ui/react';

export const theme = extendTheme({
  components: {
    Text: {
      defaultProps: {
        size: 'md',
        variant: 'bold',
        colors: 'blue.heading',
      },
      sizes: {
        xsm: {
          fontSize: '16px',
        },
        sm: {
          fontSize: '20px',
        },
        md: {
          fontSize: '24px',
        },
        lg: {
          fontSize: '36px',
        },
        xl: {
          fontSize: '48px',
        },
      },
      variants: {
        regular: {
          fontWeight: '400',
        },
        bold: {
          fontWeight: '700',
        },
      },
    },
  },
  colors: {
    blue: {
      bg: '#4B8DB5',
      heading: '#205266',
    },
    green: '#63D391',
  },
  fonts: {
    heading: "'Baloo 2', sans-serif",
    body: "'Baloo 2', sans-serif",
  },
});
