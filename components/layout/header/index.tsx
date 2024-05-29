import { Box, Button, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import { LogoSVG } from '@/components/svg';

import Wallet from './wallet';

const Header: FC = () => (
  <Box variant="container" width={['unset', 'unset', '100%']}>
    <Box
      as="header"
      width="100%"
      display="flex"
      gridColumn="1/-1"
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
            variant="filled"
            borderRadius="s"
            bg="errorContainer"
            color="onErrorContainer"
          >
            Testnet
          </Button>
        </Box>
      </Box>
      <Box display="flex">
        <Wallet />
      </Box>
    </Box>
  </Box>
);

export default Header;
