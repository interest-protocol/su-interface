import { Box } from '@interest-protocol/ui-kit';
import { FC, PropsWithChildren } from 'react';

import Footer from './footer';
import Header from './header';

const Layout: FC<PropsWithChildren> = ({ children }) => (
  <Box
    bg="black"
    display="flex"
    color="onSurface"
    minHeight="100vh"
    flexDirection="column"
  >
    <Header />
    <Box flex="1" variant="container" width="100%">
      {children}
    </Box>
    <Footer />
  </Box>
);

export default Layout;
