import '@mysten/dapp-kit/dist/index.css';

import { Button, Typography } from '@interest-protocol/ui-kit';
import { ConnectModal, useCurrentAccount } from '@mysten/dapp-kit';
import { FC, useState } from 'react';

const ConnectWalletButton: FC = () => {
  const [open, setOpen] = useState(false);
  const currentAccount = useCurrentAccount();

  return (
    <ConnectModal
      trigger={
        <Button
          py="s"
          color="black"
          bg="onSurface"
          variant="filled"
          borderRadius="full"
          disabled={!!currentAccount}
          onClick={() => setOpen((v) => !v)}
        >
          Connect{' '}
          <Typography
            as="span"
            size="large"
            variant="label"
            display={['none', 'none', 'inline']}
          >
            Wallet
          </Typography>
        </Button>
      }
      open={open}
      onOpenChange={(isOpen) => setOpen(isOpen)}
    />
  );
};

export default ConnectWalletButton;
