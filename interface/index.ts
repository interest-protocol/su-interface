import BigNumber from 'bignumber.js';

export type BigNumberish = BigNumber | bigint | string | number;

export interface EMA {
  lastEMAValue: BigNumber;
  lastTimestamp: BigNumber;
  lastValue: BigNumber;
  sampleInterface: BigNumber;
}

export interface Fees {
  rebalance: BigNumber;
  reserve: BigNumber;
}

export interface SuState {
  adminBalance: BigNumber;
  baseBalance: BigNumber;
  baseBalanceCap: BigNumber;
  bonusRate: BigNumber;
  ema: EMA;
  fees: Fees;
  genesisPrice: BigNumber;
  lastFNav: BigNumber;
  rebalanceBalance: BigNumber;
  reserveBalance: BigNumber;
  dSupply: BigNumber;
  fSupply: BigNumber;
  xSupply: BigNumber;
  dNav: BigNumber;
  xNav: BigNumber;
  fNav: BigNumber;
  stabilityCollateralRatio: BigNumber;
  rebalanceCollateralRatio: BigNumber;
}

export type QuoteFunctionName =
  | 'mint_d_coin'
  | 'mint_f_coin'
  | 'mint_x_coin'
  | 'redeem_d_coin'
  | 'redeem_f_coin'
  | 'redeem_x_coin';
