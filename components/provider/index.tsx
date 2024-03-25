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
import { Web3Provider } from '@/context/web3';

import ThemeManager from '../theme-manager';

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
        <WalletProvider autoConnect>
          <SuiNsProvider>
            <Web3Provider>{children}</Web3Provider>
          </SuiNsProvider>
        </WalletProvider>
      </QueryClientProvider>
    </SuiClientProvider>
  </ThemeManager>
);

export default Provider;
