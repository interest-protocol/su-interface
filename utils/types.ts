import { SuiClient } from '@mysten/sui.js/client';
import { TransactionBlock } from '@mysten/sui.js/transactions';

import { CoinsMap } from '@/components/web3-manager/coins-manager/coins-manager.types';

export type Type = `0x${string}`;

export interface GetCoinsArgs {
  suiClient: SuiClient;
  account: string;
  coinType: string;
  cursor?: string | null;
}

export interface GetCoinOfValueArgs {
  txb: TransactionBlock;
  coinsMap: CoinsMap;
  coinType: Type;
  coinValue: number | bigint | string;
}
