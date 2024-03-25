import { SuiTransactionBlockResponse } from '@mysten/sui.js/client';

export const throwTXIfNotSuccessful = (
  tx: SuiTransactionBlockResponse,
  callback?: () => void
) => {
  if (!!tx.effects?.status && tx.effects.status.status !== 'success') {
    callback?.();
    throw new Error('Transaction failed');
  }
};
