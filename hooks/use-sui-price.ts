import { pathOr } from 'ramda';
import useSWR from 'swr';

import { SUI_CMC_ID } from '@/constants';

const useSuiPrice = () =>
  useSWR(
    'sui-price',
    async () => {
      const response = await fetch('/api/v1/sui-price');

      const rawData = await response.json?.();

      const suiPrice: number = pathOr(
        0,
        [SUI_CMC_ID, 'quote', 'USD', 'price'],
        rawData
      );

      return suiPrice;
    },
    {
      refreshInterval: 60000,
    }
  );

export default useSuiPrice;
