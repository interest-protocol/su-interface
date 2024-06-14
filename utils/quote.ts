import { bcs } from '@mysten/sui/bcs';
import { SuiClient } from '@mysten/sui/client';
import { Transaction } from '@mysten/sui/transactions';
import { devInspectAndGetResults } from '@polymedia/suitcase-core';
import BigNumber from 'bignumber.js';

import { OBJECT_IDS } from '@/constants';
import { QuoteFunctionName } from '@/interface';
import { FixedPointMath } from '@/lib';
import { ZERO_BIG_NUMBER } from '@/utils/bignumber';

interface MakeQuoterArgs {
  suiPrice: number | undefined;
  value: string;
  functionName: QuoteFunctionName;
  suiClient: SuiClient;
}

interface MakeQuoteCallReturn {
  valueOut: BigNumber;
  bonus: BigNumber;
  feeAmount: BigNumber;
  feePercent: BigNumber;
}

export const makeQuoteCall = async ({
  suiPrice,
  functionName,
  suiClient,
  value,
}: MakeQuoterArgs): Promise<MakeQuoteCallReturn> => {
  if (!suiPrice) throw new Error('No Sui Price');

  const price = FixedPointMath.toBigNumber(suiPrice);

  const tx = new Transaction();

  tx.moveCall({
    target: `${OBJECT_IDS.SU}::quote::${functionName}`,
    arguments: [
      tx.object(OBJECT_IDS.VAULT),
      tx.object(OBJECT_IDS.TREASURY),
      tx.pure.u64(
        FixedPointMath.toBigNumber(value).decimalPlaces(0).toString()
      ),
      tx.pure.u64(price.toString()),
    ],
  });

  const values = await devInspectAndGetResults(suiClient, tx);

  if (!values.length || !values[0]?.returnValues?.length)
    return {
      valueOut: ZERO_BIG_NUMBER,
      bonus: ZERO_BIG_NUMBER,
      feeAmount: ZERO_BIG_NUMBER,
      feePercent: ZERO_BIG_NUMBER,
    };

  const data = values[0].returnValues.map((elem) => {
    const [x] = elem;
    return bcs.U64.parse(new Uint8Array(x));
  });

  return data.length === 3
    ? {
        valueOut: BigNumber(data[0]),
        bonus: ZERO_BIG_NUMBER,
        feeAmount: BigNumber(data[1]),
        feePercent: BigNumber(data[2]),
      }
    : {
        valueOut: BigNumber(data[0]),
        bonus: BigNumber(data[1]),
        feeAmount: BigNumber(data[2]),
        feePercent: BigNumber(data[3]),
      };
};
