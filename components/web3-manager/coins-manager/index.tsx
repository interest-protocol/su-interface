import { useCurrentAccount, useSuiClient } from '@mysten/dapp-kit';
import { CoinMetadata } from '@mysten/sui.js/client';
import { SUI_TYPE_ARG } from '@mysten/sui.js/utils';
import { normalizeStructTag } from '@mysten/sui.js/utils';
import BigNumber from 'bignumber.js';
import { FC } from 'react';
import useSWR from 'swr';

import { FSUI_TYPE, ISUI_TYPE, SUI_DOLLAR_TYPE, XSUI_TYPE } from '@/constants';
import { useCoins } from '@/hooks/use-coins';
import { isSui, ZERO_BIG_NUMBER } from '@/utils';

import { CoinsMap, TGetCoins } from './coins-manager.types';

const COINS_TYPE = [ISUI_TYPE, XSUI_TYPE, FSUI_TYPE, SUI_DOLLAR_TYPE];

const getCoins: TGetCoins = async (
  provider,
  account,
  coinType,
  cursor = null
) => {
  const { data, nextCursor, hasNextPage } = await provider.getCoins({
    cursor,
    coinType,
    limit: 50,
    owner: account,
  });
  if (!hasNextPage) return data;

  const newData = await getCoins(provider, account, coinType, nextCursor);

  return [...data, ...newData];
};

const CoinsManager: FC = () => {
  const suiClient = useSuiClient();
  const currentAccount = useCurrentAccount();
  const { id, delay, updateCoins, updateLoading, updateError } = useCoins();

  useSWR(
    `${[id, currentAccount?.address, CoinsManager.name]}`,
    async () => {
      try {
        updateError(false);
        updateLoading(true);
        if (!currentAccount?.address) {
          updateCoins({} as CoinsMap);
          return;
        }

        const rawData = await Promise.all(
          COINS_TYPE.flatMap((coinTYpe) =>
            getCoins(suiClient, currentAccount.address, coinTYpe)
          )
        );

        const coinsRaw = rawData.flatMap((raw) => raw);

        if (!coinsRaw.length) {
          updateCoins({} as CoinsMap);
          return;
        }

        const coinsMetadata: ReadonlyArray<CoinMetadata | null> =
          await Promise.all(
            COINS_TYPE.map((coinType) =>
              suiClient.getCoinMetadata({ coinType })
            )
          );

        const coinsMetadataMap = coinsMetadata.reduce(
          (acc, metadata, index) => ({
            ...acc,
            [COINS_TYPE[index]]: metadata,
          }),
          {} as Record<string, CoinMetadata | null>
        );

        const filteredCoinsRaw = coinsRaw.filter(
          ({ coinType }) => coinsMetadataMap[normalizeStructTag(coinType)]
        );

        if (!filteredCoinsRaw.length) {
          updateCoins({} as CoinsMap);
          return;
        }

        const coins = filteredCoinsRaw.reduce(
          (acc, { coinType, ...coinRaw }) => {
            const type = normalizeStructTag(coinType) as `0x${string}`;

            const { symbol, decimals, ...metadata } = coinsMetadataMap[type]!;

            if (isSui(type))
              return {
                ...acc,
                [SUI_TYPE_ARG as `0x${string}`]: {
                  ...acc[SUI_TYPE_ARG as `0x${string}`],
                  ...coinRaw,
                  type: SUI_TYPE_ARG as `0x${string}`,
                  symbol,
                  decimals,
                  metadata,
                  balance: BigNumber(coinRaw.balance).plus(
                    acc[SUI_TYPE_ARG as `0x${string}`]?.balance ??
                      ZERO_BIG_NUMBER
                  ),
                  objects: (acc[SUI_TYPE_ARG as string]?.objects ?? []).concat([
                    { ...coinRaw, type: SUI_TYPE_ARG as `0x${string}` },
                  ]),
                },
              };

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
                objects: (acc[type]?.objects ?? []).concat([
                  { ...coinRaw, type },
                ]),
              },
            };
          },
          {} as CoinsMap
        ) as unknown as CoinsMap;

        updateCoins(coins);
      } catch {
        updateError(true);
      } finally {
        updateLoading(false);
      }
    },
    {
      revalidateOnFocus: false,
      revalidateOnMount: true,
      refreshWhenHidden: false,
      refreshInterval: delay,
    }
  );

  return null;
};

export default CoinsManager;
