import { Box } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { FSuiSVG, XSuiSVG } from '@/components/svg';
import { TokenField } from '@/components/token-field';
import { FSUI_TYPE, XSUI_TYPE } from '@/constants';
import { useWeb3 } from '@/context/web3';
import { useQuoteCall } from '@/hooks/use-quote-call';
import { FixedPointMath } from '@/lib';
import { parseInputEventToNumberString, ZERO_BIG_NUMBER } from '@/utils';

import { SuForm } from '../forms.types';
import FormInputDollar from './form-input-dollar';

const DoubleFields: FC = () => {
  const { coinsMap } = useWeb3();

  const { control, setValue, register, resetField } = useFormContext<SuForm>();

  const formType = useWatch({ control, name: 'formType' });
  const iSuiValue = useWatch({ control, name: 'iSui.value' });
  const fSuiActive = useWatch({ control, name: 'fSui.active' });
  const xSuiActive = useWatch({ control, name: 'xSui.active' });

  const { data: fSuiQuote } = useQuoteCall({
    value: iSuiValue,
    functionName: 'mint_f_coin',
  });

  const { data: xSuiQuote } = useQuoteCall({
    value: iSuiValue,
    functionName: 'mint_x_coin',
  });

  const fSuiStaticValue: `${number}` = fSuiActive
    ? `${FixedPointMath.toNumber(fSuiQuote?.valueOut ?? ZERO_BIG_NUMBER)}`
    : '0';

  const xSuiStaticValue: `${number}` = xSuiActive
    ? `${FixedPointMath.toNumber(xSuiQuote?.valueOut ?? ZERO_BIG_NUMBER)}`
    : '0';

  return (
    <Box display="flex" gap="s" flexDirection="column" order={formType && -1}>
      <TokenField
        tokenName="fSui"
        placeholder="--"
        variant="outline"
        textAlign="right"
        active={fSuiActive}
        opacity={formType ? 1 : 0.7}
        Bottom={<FormInputDollar label="fSui" />}
        cursor={formType ? 'initial' : 'not-allowed'}
        caretColor={formType ? 'currentColor' : 'transparent'}
        activeBg="linear-gradient(46.55deg, rgba(244, 255, 115, 0.8) 4.39%, #01FDFF 96.96%)"
        balance={
          formType
            ? `${FixedPointMath.toNumber(
                coinsMap[FSUI_TYPE]?.balance ?? ZERO_BIG_NUMBER
              )}`
            : ''
        }
        {...register('fSui.value', {
          onChange: (v) => {
            setValue(
              'fSui.value',
              !formType
                ? fSuiStaticValue
                : parseInputEventToNumberString(
                    v,
                    FixedPointMath.toNumber(
                      coinsMap[FSUI_TYPE]?.balance ?? ZERO_BIG_NUMBER
                    )
                  )
            );
          },
        })}
        onActivate={() => {
          if (!fSuiActive) {
            setValue('fSui.active', true);
            setValue('xSui.active', false);
            resetField('xSui.value');
          }
        }}
        TokenIcon={
          <FSuiSVG
            maxWidth="4rem"
            maxHeight="2.5rem"
            width="100%"
            height="100%"
          />
        }
      />
      <TokenField
        tokenName="xSui"
        placeholder="--"
        variant="outline"
        textAlign="right"
        active={xSuiActive}
        opacity={formType ? 1 : 0.7}
        Bottom={<FormInputDollar label="xSui" />}
        cursor={formType ? 'initial' : 'not-allowed'}
        caretColor={formType ? 'currentColor' : 'transparent'}
        activeBg="linear-gradient(222.71deg,  #FF6BD6 5.65%, rgba(244, 255, 115, 0.8) 99.55%)"
        balance={
          formType
            ? `${FixedPointMath.toNumber(
                coinsMap[XSUI_TYPE]?.balance ?? ZERO_BIG_NUMBER
              )}`
            : ''
        }
        {...register('xSui.value', {
          onChange: (v) => {
            setValue(
              'xSui.value',
              !formType
                ? xSuiStaticValue
                : parseInputEventToNumberString(
                    v,
                    FixedPointMath.toNumber(
                      coinsMap[XSUI_TYPE]?.balance ?? ZERO_BIG_NUMBER
                    )
                  )
            );
          },
        })}
        onActivate={() => {
          if (!xSuiActive) {
            setValue('xSui.active', true);
            setValue('fSui.active', false);
            resetField('fSui.value');
          }
        }}
        TokenIcon={
          <XSuiSVG
            maxWidth="4rem"
            maxHeight="2.5rem"
            width="100%"
            height="100%"
          />
        }
      />
    </Box>
  );
};

export default DoubleFields;
