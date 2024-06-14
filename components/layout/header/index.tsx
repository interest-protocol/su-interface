import { Box, Button, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import Checkpoint from '@/components/checkpoint';
import Mint from '@/components/mint';
import { LogoSVG } from '@/components/svg';

import Wallet from './wallet';

const Header: FC = () => (
  <Box variant="container" width={['unset', 'unset', '100%']}>
    <Box
      zIndex="1"
      as="header"
      width="100%"
      display="flex"
      gridColumn="1/-1"
      position="relative"
      py={['unset', 'unset', 'l']}
      justifyContent="space-between"
    >
      <Box display="flex" alignItems="center" gap="m">
        <LogoSVG maxWidth="4rem" maxHeight="4rem" width="100%" />
        <Box>
          <Typography
            size="large"
            variant="title"
            fontWeight="700"
            fontSize={['l', 'l', '2xl']}
          >
            Su{' '}
            <Typography
              as="span"
              size="large"
              variant="title"
              fontWeight="700"
              display={['none', 'inline']}
              fontSize={['l', 'l', '2xl']}
            >
              Protocol
            </Typography>
          </Typography>
          <Button
            p="2xs"
            fontSize="2xs"
            borderRadius="s"
            variant="outline"
            display={['none', 'none', 'flex']}
          >
            Testnet
            <Checkpoint />
          </Button>
        </Box>
      </Box>
      <Box display="flex">
        <Wallet />
      </Box>
    </Box>
    <Box
      width="100%"
      gridColumn="1/-1"
      alignItems="center"
      justifyContent="space-between"
      display={['flex', 'flex', 'none']}
    >
      <Button p="2xs" fontSize="2xs" borderRadius="s" variant="outline">
        Testnet
        <Checkpoint />
      </Button>
      <Mint />
    </Box>
  </Box>
);

export default Header;
