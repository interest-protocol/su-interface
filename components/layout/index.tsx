import { Box } from '@interest-protocol/ui-kit';
import { FC, PropsWithChildren } from 'react';

import Header from './header';

const Layout: FC<PropsWithChildren> = ({ children }) => (
  <Box
    as="main"
    bg="black"
    minHeight="100vh"
    display="flex"
    flexDirection="column"
  >
    <Box variant="container">
      <Header />
      {children}
    </Box>
  </Box>
);

export default Layout;
