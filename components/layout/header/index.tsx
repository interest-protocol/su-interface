import { Box } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import { LogoSVG } from '@/components/svg';

import Wallet from './wallet';

const Header: FC = () => (
  <Box
    as="header"
    width="100%"
    display="flex"
    gridColumn="1/-1"
    py={['unset', 'unset', 'l']}
    justifyContent="space-between"
  >
    <LogoSVG maxWidth="3rem" maxHeight="3rem" width="100%" />
    <Box display="flex">
      <Wallet />
    </Box>
  </Box>
);

export default Header;
