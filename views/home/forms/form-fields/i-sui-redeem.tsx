import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { ISuiSVG } from '@/components/svg';
import { TokenField } from '@/components/token-field';
import { useQuoteCall } from '@/hooks/use-quote-call';
import { FixedPointMath } from '@/lib';
import { ZERO_BIG_NUMBER } from '@/utils';

import { SuForm } from '../forms.types';
import FormInputDollar from './form-input-dollar';

const ISuiRedeem: FC = () => {
  const { control, setValue, register } = useFormContext<SuForm>();

  const fSuiValue = useWatch({ control, name: 'fSui.value' });
  const xSuiValue = useWatch({ control, name: 'xSui.value' });
  const fSuiActive = useWatch({ control, name: 'fSui.active' });
  const xSuiActive = useWatch({ control, name: 'xSui.active' });

  const { data: fSuiQuote } = useQuoteCall({
    value: fSuiValue,
    functionName: 'redeem_f_coin',
  });

  const { data: xSuiQuote } = useQuoteCall({
    value: xSuiValue,
    functionName: 'redeem_x_coin',
  });

  const iSuiStaticValue: `${number}` = fSuiActive
    ? `${FixedPointMath.toNumber(fSuiQuote?.valueOut ?? ZERO_BIG_NUMBER)}`
    : xSuiActive
      ? `${FixedPointMath.toNumber(xSuiQuote?.valueOut ?? ZERO_BIG_NUMBER)}`
      : '0';

  return (
    <TokenField
      active
      opacity={0.7}
      placeholder="--"
      tokenName="iSui"
      variant="outline"
      textAlign="right"
      cursor="not-allowed"
      caretColor="transparent"
      Bottom={<FormInputDollar label="iSui" />}
      {...register('iSui.value', {
        onChange: () => {
          setValue('iSui.value', iSuiStaticValue);
        },
      })}
      TokenIcon={
        <ISuiSVG
          width="100%"
          height="100%"
          maxWidth="2.5rem"
          maxHeight="2.5rem"
        />
      }
    />
  );
};

export default ISuiRedeem;
