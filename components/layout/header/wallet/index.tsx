import { Box } from '@interest-protocol/ui-kit';
import { useCurrentAccount } from '@mysten/dapp-kit';
import { FC } from 'react';

import Mint from '@/components/mint';

import ConnectWalletButton from './connect-wallet-button';
import Profile from './profile';

const Wallet: FC = () => {
  const currentAccount = useCurrentAccount();

  return (
    <Box gap="m" display="flex" alignItems="center" justifyContent="flex-end">
      {currentAccount ? (
        <>
          <Box display={['none', 'none', 'block']}>
            <Mint />
          </Box>
          <Profile />
        </>
      ) : (
        <ConnectWalletButton />
      )}
    </Box>
  );
};

export default Wallet;
