import { SuiClient } from '@mysten/sui.js/client';
import { TransactionBlock } from '@mysten/sui.js/transactions';

import { CoinsMap, Type } from '@/context/web3/web3.types';

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
