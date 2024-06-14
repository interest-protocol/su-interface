import { FixedPointMath } from '@/lib';
import { computeCollateralRatio, ZERO_BIG_NUMBER } from '@/utils';

import useSuState from './use-su-state';

export const useIsRebalanceMode = (): [boolean, number] => {
  const { data, isLoading } = useSuState();

  if (!data || isLoading) return [false, 0];

  const collateralRatio = computeCollateralRatio(data);
  const rebalanceCollateralRatio =
    FixedPointMath.toNumber(
      data?.rebalanceCollateralRatio || ZERO_BIG_NUMBER,
      7
    ) * 1.1;

  return [
    rebalanceCollateralRatio >= collateralRatio,
    rebalanceCollateralRatio,
  ];
};
