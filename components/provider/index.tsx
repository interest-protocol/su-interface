import 'react-loading-skeleton/dist/skeleton.css';

import {
  createNetworkConfig,
  SuiClientProvider,
  WalletProvider,
} from '@mysten/dapp-kit';
import { getFullnodeUrl } from '@mysten/sui.js/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { FC, PropsWithChildren } from 'react';

import { SuiNsProvider } from '@/context/suins';

import ThemeManager from '../theme-manager';
import Web3Manager from '../web3-manager';

const queryClient = new QueryClient();

const { networkConfig } = createNetworkConfig({
  testnet: {
    url: process.env.NEXT_PUBLIC_RPC_URL || getFullnodeUrl('testnet'),
  },
});

const Provider: FC<PropsWithChildren> = ({ children }) => (
  <ThemeManager>
    <SuiClientProvider networks={networkConfig} defaultNetwork="testnet">
      <QueryClientProvider client={queryClient}>
        <WalletProvider stashedWallet={{ name: 'Su Protocol' }} autoConnect>
          <SuiNsProvider>
            <Web3Manager />
            {children}
          </SuiNsProvider>
        </WalletProvider>
      </QueryClientProvider>
    </SuiClientProvider>
  </ThemeManager>
);

export default Provider;
