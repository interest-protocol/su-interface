import { Global } from '@emotion/react';
import { darkTheme, ThemeProvider } from '@interest-protocol/ui-kit';
import { FC, PropsWithChildren } from 'react';
import { Toaster } from 'react-hot-toast';

import { GlobalStyles } from '@/styles';

const ThemeManager: FC<PropsWithChildren> = ({ children }) => (
  <ThemeProvider theme={darkTheme}>
    <Toaster
      position="bottom-right"
      reverseOrder={false}
      toastOptions={{
        duration: 10000,
        style: {
          border: '1px solid',
          borderRadius: darkTheme.radii.m,
          color: darkTheme.colors.onSurface,
          background: darkTheme.colors.surface,
          borderColor: darkTheme.colors.onPrimaryContainer,
        },
      }}
    />
    <Global styles={GlobalStyles} />
    {children}
  </ThemeProvider>
);

export default ThemeManager;
