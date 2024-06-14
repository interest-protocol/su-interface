import { CoinStruct } from '@mysten/sui/client';
import { TransactionResult } from '@mysten/sui/transactions';
import { normalizeStructTag, SUI_TYPE_ARG } from '@mysten/sui/utils';

import { FixedPointMath } from '@/lib';

import {
  GetCoinOfValueArgs,
  GetCoinsArgs,
  GetSafeValueArgs,
  Type,
} from './types';

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
  tx,
  coinsMap,
}: GetCoinOfValueArgs): TransactionResult {
  let coinOfValue: TransactionResult;
  coinType = removeLeadingZeros(coinType) as Type;
  if (coinType === '0x2::sui::SUI') {
    coinOfValue = tx.splitCoins(tx.gas, [tx.pure.u64(coinValue)]);
  } else {
    // Merge all coins into one
    const [firstCoin, ...otherCoins] = coinsMap[coinType].objects;
    const firstCoinInput = tx.object(firstCoin.coinObjectId);
    if (otherCoins.length > 0) {
      tx.mergeCoins(
        firstCoinInput,
        otherCoins.map((coin) => coin.coinObjectId)
      );
    }
    coinOfValue = tx.splitCoins(firstCoinInput, [tx.pure.u64(coinValue)]);
  }
  return coinOfValue;
}

export const isSameStructTag = (addressA: string, addressB: string) =>
  normalizeStructTag(addressA) === normalizeStructTag(addressB);

export const isSui = (type: string) => isSameStructTag(type, SUI_TYPE_ARG);

export const getSafeValue = ({
  coinValue,
  coinType,
  balance,
  decimals,
}: GetSafeValueArgs) => {
  const amount = FixedPointMath.toBigNumber(coinValue, decimals).decimalPlaces(
    0
  );

  const safeBalance = isSui(coinType) ? balance.minus(1_000_000_000) : balance;

  if (safeBalance.isNegative() || safeBalance.isZero())
    throw new Error('Not enough balance');

  const safeAmount = amount.gt(safeBalance) ? safeBalance : amount;

  if (safeAmount.isNegative() || safeAmount.isZero())
    throw new Error('Not valid amount');

  return safeAmount;
};
