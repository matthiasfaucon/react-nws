import React from 'react';
import CustomThemeProvider from '../styles/themes/theme';
import '../styles/globalStyles.css';

export default function MyApp({ Component, pageProps }) {
  return (
    <CustomThemeProvider>
      <Component {...pageProps} />
    </CustomThemeProvider>
  );
}
