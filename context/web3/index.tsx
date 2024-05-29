import { useCurrentAccount, useSuiClient } from '@mysten/dapp-kit';
import { CoinMetadata } from '@mysten/sui.js/client';
import { normalizeStructTag } from '@mysten/sui.js/utils';
import BigNumber from 'bignumber.js';
import { createContext, FC, PropsWithChildren, useContext } from 'react';
import useSWR from 'swr';

import { FSUI_TYPE, ISUI_TYPE, SUI_DOLLAR_TYPE, XSUI_TYPE } from '@/constants';
import { ZERO_BIG_NUMBER } from '@/utils';

import { CoinsMap, Web3Context } from './web3.types';

const web3Context = createContext<Web3Context>({} as Web3Context);

export const Web3Provider: FC<PropsWithChildren> = ({ children }) => {
  const suiClient = useSuiClient();
  const currentAccount = useCurrentAccount();
  const { Provider } = web3Context;

  const { data, isLoading, error, mutate } = useSWR<CoinsMap>(
    `${currentAccount?.address}`,
    async () => {
      if (!currentAccount?.address) return {};

      const [iSuiRaw, xSuiRaw, fSuiRaw, suiDRaw] = await Promise.all([
        suiClient
          .getCoins({
            owner: currentAccount?.address,
            coinType: ISUI_TYPE,
            limit: 50,
          })
          .then(({ data }) => data),
        suiClient
          .getCoins({
            owner: currentAccount?.address,
            coinType: XSUI_TYPE,
            limit: 50,
          })
          .then(({ data }) => data),
        suiClient
          .getCoins({
            owner: currentAccount?.address,
            coinType: FSUI_TYPE,
            limit: 50,
          })
          .then(({ data }) => data),
        suiClient
          .getCoins({
            owner: currentAccount?.address,
            coinType: SUI_DOLLAR_TYPE,
            limit: 50,
          })
          .then(({ data }) => data),
      ]);

      const coinsRaw = [...iSuiRaw, ...xSuiRaw, ...fSuiRaw, ...suiDRaw];

      const coinsMetadata = await Promise.all(
        coinsRaw.map((coin) =>
          suiClient.getCoinMetadata({ coinType: coin.coinType })
        )
      );

      const coinsMetadataMap: Record<string, CoinMetadata> =
        coinsMetadata.reduce((acc, metadata, index) => {
          if (!metadata) return acc;

          return {
            ...acc,
            [coinsRaw[index].coinType]: metadata,
          };
        }, {});

      return coinsRaw.reduce((acc, { coinType, ...coinRaw }) => {
        const type = normalizeStructTag(coinType) as `0x${string}`;
        const { symbol, decimals, ...metadata } = coinsMetadataMap[coinType];

        return {
          ...acc,
          [type]: {
            ...acc[type],
            ...coinRaw,
            type,
            symbol,
            decimals,
            metadata,
            balance: BigNumber(coinRaw.balance).plus(
              acc[type]?.balance ?? ZERO_BIG_NUMBER
            ),
            objects: (acc[type]?.objects ?? []).concat([{ ...coinRaw, type }]),
          },
        };
      }, {} as CoinsMap);
    }
  );

  const value: Web3Context = {
    error: error,
    coinsMap: data ?? {},
    isFetchingBalance: isLoading,
    mutate: () => {
      mutate();
    },
  };

  return <Provider value={value}>{children}</Provider>;
};

export const useWeb3 = () => useContext(web3Context);

export default web3Context;
