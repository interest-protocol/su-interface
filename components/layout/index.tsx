import { Box } from '@interest-protocol/ui-kit';
import { FC, PropsWithChildren } from 'react';

import Footer from './footer';
import Header from './header';
import { LayoutProps } from './layout.types';

const Layout: FC<PropsWithChildren<LayoutProps>> = ({ children, noWallet }) => (
  <Box
    display="flex"
    color="onSurface"
    minHeight="100vh"
    flexDirection="column"
  >
    <Header noWallet={noWallet} />
    <Box
      flex="1"
      alignItems="start"
      variant="container"
      width={['unset', 'unset', '100%']}
      my={['4xl', '4xl', '4xl', '4xl', '4xl']}
      gap={['xs', 'xs', 'xs', 'xs', 'xs', 'xs']}
    >
      {children}
    </Box>
    <Footer />
  </Box>
);

export default Layout;
