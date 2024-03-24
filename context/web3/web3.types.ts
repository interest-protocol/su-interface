import { CoinMetadata, CoinStruct } from '@mysten/sui.js/client';
import BigNumber from 'bignumber.js';

type Type = `0x${string}`;

interface CoinObject extends Pick<CoinMetadata, 'symbol' | 'decimals'> {
  digest?: string;
  version?: string;
  balance: BigNumber;
  type: Type;
  coinObjectId: string;
  previousTransaction?: string;
  lockedUntilEpoch?: number | null | undefined;
  metadata: Omit<CoinMetadata, 'symbol' | 'decimals'>;
  objects: ReadonlyArray<Omit<CoinStruct, 'coinType'> & { type: string }>;
}

export type CoinsMap = Record<Type, CoinObject>;

export interface CoinMetadataWithType extends CoinMetadata {
  type: Type;
}

export interface Web3Context {
  error: boolean;
  mutate: () => void;
  isFetchingBalance: boolean;
  coinsMap: CoinsMap;
}
