import { TreasuryState } from '@/interface';
import { FixedPointMath } from '@/lib';
import { NINE_DECIMALS_FACTOR } from '@/utils/bignumber';

export const computeCollateralRatio = (
  treasuryState: TreasuryState
): number => {
  const xValue = treasuryState.xNav
    .multipliedBy(treasuryState.xSupply)
    .div(NINE_DECIMALS_FACTOR);

  const fValue = treasuryState.fNav
    .multipliedBy(treasuryState.fSupply)
    .div(NINE_DECIMALS_FACTOR);

  return fValue.isZero()
    ? 0
    : FixedPointMath.toNumber(
        xValue.multipliedBy(NINE_DECIMALS_FACTOR).div(fValue)
      ) * 100;
};
