import { CoinStruct } from '@mysten/sui.js/client';
import { TransactionResult } from '@mysten/sui.js/transactions';
import { SUI_TYPE_ARG } from '@mysten/sui.js/utils';

import { Type } from '@/context/web3/web3.types';

import { GetCoinOfValueArgs, GetCoinsArgs } from './types';
export const normalizeSuiType = (x: string) => {
  if (x === SUI_TYPE_ARG) return x;
  const splitType = x.split('::');

  const packageType = splitType[0];

  if (packageType.length === 66) return x;

  if (!packageType.includes('0x')) return x;

  const postOx = packageType.split('0x')[1];

  const paddedType = '0x' + postOx.padStart(64, '0');

  return [paddedType, ...splitType.slice(1)].join('::');
};

export const getCoins = async ({
  suiClient,
  coinType,
  cursor,
  account,
}: GetCoinsArgs): Promise<CoinStruct[]> => {
  const { data, nextCursor, hasNextPage } = await suiClient.getCoins({
    owner: account,
    cursor,
    coinType,
  });

  if (!hasNextPage) return data;

  const newData = await getCoins({
    suiClient,
    coinType,
    account,
    cursor: nextCursor,
  });

  return [...data, ...newData];
};

export function removeLeadingZeros(address: string): string {
  return address.replaceAll(/0x0+/g, '0x');
}

export function getCoinOfValue({
  coinValue,
  coinType,
  txb,
  coinsMap,
}: GetCoinOfValueArgs): TransactionResult {
  let coinOfValue: TransactionResult;
  coinType = removeLeadingZeros(coinType) as Type;
  if (coinType === '0x2::sui::SUI') {
    coinOfValue = txb.splitCoins(txb.gas, [txb.pure(coinValue)]);
  } else {
    // Merge all coins into one
    const [firstCoin, ...otherCoins] = coinsMap[coinType].objects;
    const firstCoinInput = txb.object(firstCoin.coinObjectId);
    if (otherCoins.length > 0) {
      txb.mergeCoins(
        firstCoinInput,
        otherCoins.map((coin) => coin.coinObjectId)
      );
    }
    coinOfValue = txb.splitCoins(firstCoinInput, [txb.pure(coinValue)]);
  }
  return coinOfValue;
}
