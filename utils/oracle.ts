import { TransactionBlock } from '@mysten/sui.js/transactions';
import { SUI_CLOCK_OBJECT_ID } from '@mysten/sui.js/utils';

import { OBJECT_IDS } from '@/constants';

interface Price {
  index: number;
  resultIndex: number;
  kind: 'NestedResult';
}

export const requestPriceOracle = (
  txb: TransactionBlock
): [TransactionBlock, Price] => {
  const request = txb.moveCall({
    typeArguments: [`${OBJECT_IDS.SU}::oracle::SuOracle`],
    target: `${OBJECT_IDS.SUITEARS}::oracle::request`,
    arguments: [txb.object(OBJECT_IDS.SU_ORACLE)],
  });

  txb.moveCall({
    typeArguments: [`${OBJECT_IDS.SU}::oracle::SuOracle`],
    target: `${OBJECT_IDS.COIN_X_ORACLE}::switchboard_oracle::report`,
    arguments: [
      txb.object(OBJECT_IDS.SU_ORACLE),
      request,
      txb.object(OBJECT_IDS.SWITCHBOARD_AGGREGATOR),
    ],
  });

  const [price] = txb.moveCall({
    typeArguments: [`${OBJECT_IDS.SU}::oracle::SuOracle`],
    target: `${OBJECT_IDS.SUITEARS}::oracle::destroy_request`,
    arguments: [
      txb.object(OBJECT_IDS.SU_ORACLE),
      request,
      txb.object(SUI_CLOCK_OBJECT_ID),
    ],
  });

  return [txb, price];
};
