import { Box } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { ISuiSVG } from '@/components/svg';
import { TokenField } from '@/components/token-field';
import { ISUI_TYPE } from '@/constants';
import { useWeb3 } from '@/context/web3';
import { useQuoteCall } from '@/hooks/use-quote-call';
import { FixedPointMath } from '@/lib';
import { parseInputEventToNumberString, ZERO_BIG_NUMBER } from '@/utils';

import { SuForm } from '../forms.types';
import FormInputDollar from './form-input-dollar';

const ISuiField: FC = () => {
  const { coinsMap } = useWeb3();

  const { control, setValue, register } = useFormContext<SuForm>();

  const formType = useWatch({ control, name: 'formType' });
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

  const handleMax = () => {
    setValue(
      'iSui.value',
      `${FixedPointMath.toNumber(
        coinsMap[ISUI_TYPE]?.balance ?? ZERO_BIG_NUMBER
      )}`
    );
  };

  return (
    <Box order={formType}>
      <TokenField
        active
        placeholder="--"
        tokenName="iSui"
        variant="outline"
        textAlign="right"
        opacity={!formType ? 1 : 0.7}
        Bottom={<FormInputDollar label="iSui" />}
        cursor={!formType ? 'initial' : 'not-allowed'}
        caretColor={!formType ? 'currentColor' : 'transparent'}
        balance={`${FixedPointMath.toNumber(
          coinsMap[ISUI_TYPE]?.balance ?? ZERO_BIG_NUMBER
        )}`}
        {...register('iSui.value', {
          onChange: (v) => {
            setValue(
              'iSui.value',
              formType ? iSuiStaticValue : parseInputEventToNumberString(v)
            );
          },
        })}
        {...(!formType && { handleMax })}
        TokenIcon={
          <ISuiSVG
            width="100%"
            height="100%"
            maxWidth="2.5rem"
            maxHeight="2.5rem"
          />
        }
      />
    </Box>
  );
};

export default ISuiField;
