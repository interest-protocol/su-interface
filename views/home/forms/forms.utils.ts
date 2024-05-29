import { FormTypeEnum, GetFeeValueAndFunction } from './forms.types';

export const getQuoteCallArgs: GetFeeValueAndFunction = ({
  formType,
  iSui,
  xSui,
  fSui,
  dSui,
}) => {
  const isXCoin = xSui.active;
  const isFCoin = fSui.active;

  if (formType === FormTypeEnum.Mint) {
    return {
      functionName: isXCoin
        ? 'mint_x_coin'
        : isFCoin
          ? 'mint_f_coin'
          : 'mint_d_coin',
      value: iSui.value,
    };
  }

  return {
    functionName: isXCoin
      ? 'redeem_x_coin'
      : isFCoin
        ? 'redeem_f_coin'
        : 'redeem_d_coin',
    value: isXCoin ? xSui.value : isFCoin ? fSui.value : dSui.value,
  };
};
