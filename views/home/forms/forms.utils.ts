import { FormTypeEnum, GetFeeValueAndFunction } from './forms.types';

export const getQuoteCallArgs: GetFeeValueAndFunction = ({
  formType,
  iSui,
  xSui,
  fSui,
}) => {
  const isXCoin = xSui.active;
  if (formType === FormTypeEnum.Mint) {
    return {
      functionName: isXCoin ? 'mint_x_coin' : 'mint_f_coin',
      value: iSui.value,
    };
  }

  return {
    functionName: isXCoin ? 'redeem_x_coin' : 'redeem_f_coin',
    value: isXCoin ? xSui.value : fSui.value,
  };
};
