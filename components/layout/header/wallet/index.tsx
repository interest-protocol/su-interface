import { Box } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import Mint from '@/components/mint';
import { useAccount } from '@/hooks/use-account';

import ConnectWalletButton from './connect-wallet-button';
import Profile from './profile';

const Wallet: FC = () => {
  const { address, isEnoki } = useAccount();

  if (address && isEnoki) return null;

  return (
    <Box gap="m" display="flex" alignItems="center" justifyContent="flex-end">
      {address && !isEnoki ? (
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
