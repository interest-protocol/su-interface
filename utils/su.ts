import { SuState } from '@/interface';
import { FixedPointMath } from '@/lib';
import { NINE_DECIMALS_FACTOR } from '@/utils/bignumber';

export const computeCollateralRatio = (treasuryState: SuState): number => {
  const xValue = treasuryState.xNav
    .multipliedBy(treasuryState.xSupply)
    .div(NINE_DECIMALS_FACTOR);

  const fValue = treasuryState.fNav
    .multipliedBy(treasuryState.fSupply)
    .div(NINE_DECIMALS_FACTOR);

  const dValue = treasuryState.dNav
    .multipliedBy(treasuryState.dSupply)
    .div(NINE_DECIMALS_FACTOR);

  return fValue.isZero()
    ? 0
    : FixedPointMath.toNumber(
        xValue.multipliedBy(NINE_DECIMALS_FACTOR).div(fValue.plus(dValue))
      ) * 100;
};
