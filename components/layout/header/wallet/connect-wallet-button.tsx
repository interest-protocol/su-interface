import '@mysten/dapp-kit/dist/index.css';

import {
  Box,
  Button,
  Modal,
  Motion,
  Typography,
} from '@interest-protocol/ui-kit';
import { ConnectModal, useCurrentAccount } from '@mysten/dapp-kit';
import { useEnokiFlow } from '@mysten/enoki/react';
import { FC, useState } from 'react';

import { EnokiSVG, GoogleSVG } from '@/components/svg';

const ConnectWalletButton: FC = () => {
  const flow = useEnokiFlow();
  const [open, setOpen] = useState(false);
  const currentAccount = useCurrentAccount();
  const [mainModalOpen, setMainModalOpen] = useState(false);

  const signIn = async () => {
    history.pushState({}, '', '/');
    window.location.href = await flow.createAuthorizationURL({
      provider: 'google',
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
      redirectUrl: window.location.href.split('#')[0] + 'loading',
      network: 'testnet',
    });
  };

  return (
    <>
      <Box>
        <Button
          py="s"
          color="black"
          bg="onSurface"
          variant="filled"
          borderRadius="full"
          disabled={!!currentAccount}
          onClick={() => setMainModalOpen((v) => !v)}
        >
          Connect
        </Button>
      </Box>
      <Modal
        custom
        isOpen={mainModalOpen}
        onClose={() => setMainModalOpen(false)}
      >
        <Motion
          inset="0"
          bg="#0004"
          position="absolute"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1] }}
          onClick={() => setMainModalOpen(false)}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        />
        <Motion
          p="l"
          gap="l"
          width="100%"
          display="flex"
          maxWidth="25rem"
          borderRadius="m"
          border="1px solid"
          position="relative"
          bg="lowestContainer"
          flexDirection="column"
          borderColor="lowContainer"
          transition={{ duration: 0.2 }}
          animate={{ opacity: 1, scale: 1 }}
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.9 }}
        >
          <Typography
            size="small"
            color="onSurface"
            variant="headline"
            textAlign="center"
          >
            Connect
          </Typography>
          <Typography variant="body" size="medium" color="onSurface">
            Use your google account to connect to Su Protocol.
          </Typography>
          <Typography
            gap="xs"
            size="small"
            display="flex"
            variant="label"
            color="onSurface"
            textAlign="center"
            alignItems="center"
            justifyContent="center"
          >
            Powered by{' '}
            <a
              target="_blank"
              rel="noreferrer"
              href="https://enoki.mystenlabs.com/"
            >
              <EnokiSVG maxWidth="1rem" maxHeight="1rem" width="100%" />
            </a>
          </Typography>
          <Button
            bg="onSurface"
            variant="filled"
            onClick={signIn}
            borderRadius="full"
            justifyContent="center"
            PrefixIcon={
              <GoogleSVG maxWidth="1rem" maxHeight="1rem" width="100%" />
            }
          >
            Connect with Google
          </Button>
          <Box borderBottom="1px solid" borderColor="highestContainer" />
          <ConnectModal
            trigger={
              <Button
                py="s"
                color="black"
                bg="onSurface"
                variant="filled"
                borderRadius="full"
                justifyContent="center"
                disabled={!!currentAccount}
                onClick={() => setOpen((v) => !v)}
              >
                Connect Wallet
              </Button>
            }
            open={open}
            onOpenChange={(isOpen) => setOpen(isOpen)}
          />
        </Motion>
      </Modal>
    </>
  );
};

export default ConnectWalletButton;
