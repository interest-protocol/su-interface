import { useSuiClient } from '@mysten/dapp-kit';
import useSWR from 'swr';

import useSuiPrice from '@/hooks/use-sui-price';
import { QuoteFunctionName } from '@/interface';
import { makeQuoteCall } from '@/utils/quote';

interface UseFeeArgs {
  functionName: QuoteFunctionName;
  value: string;
}

export const useQuoteCall = ({ value, functionName }: UseFeeArgs) => {
  const { data } = useSuiPrice();
  const suiClient = useSuiClient();
  return useSWR(
    useQuoteCall.name + data?.toString() + value + functionName,
    async () =>
      makeQuoteCall({
        suiClient,
        suiPrice: data,
        value,
        functionName,
      }),
    {
      refreshInterval: 60000,
      focusThrottleInterval: 500,
    }
  );
};
