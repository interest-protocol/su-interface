import { Box } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { DSuiSVG, FSuiSVG, XSuiSVG } from '@/components/svg';
import { TokenField } from '@/components/token-field';
import { DSUI_TYPE, FSUI_TYPE, XSUI_TYPE } from '@/constants';
import { useWeb3 } from '@/context/web3';
import { useIsRebalanceMode } from '@/hooks/use-is-rebalance-mode';
import { useQuoteCall } from '@/hooks/use-quote-call';
import { FixedPointMath } from '@/lib';
import { ZERO_BIG_NUMBER } from '@/utils';

import { SuForm } from '../forms.types';
import FormInputDollar from './form-input-dollar';

const FieldsMint: FC = () => {
  const { coinsMap } = useWeb3();
  const [warningCondition] = useIsRebalanceMode();
  const { control, setValue, register, resetField } = useFormContext<SuForm>();

  const iSuiValue = useWatch({ control, name: 'iSui.value' });
  const fSuiActive = useWatch({ control, name: 'fSui.active' });
  const xSuiActive = useWatch({ control, name: 'xSui.active' });
  const dSuiActive = useWatch({ control, name: 'dSui.active' });

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
    <Box display="flex" gap="s" flexDirection="column">
      <TokenField
        opacity="0.7"
        tokenName="fSui"
        placeholder="--"
        variant="outline"
        textAlign="right"
        cursor="not-allowed"
        caretColor="transparent"
        disabled={warningCondition}
        Bottom={<FormInputDollar label="fSui" />}
        active={warningCondition ? false : fSuiActive}
        activeBg="linear-gradient(46.55deg, rgba(244, 255, 115, 0.8) 4.39%, #01FDFF 96.96%)"
        balance={`${FixedPointMath.toNumber(
          coinsMap[FSUI_TYPE]?.balance ?? ZERO_BIG_NUMBER
        )}`}
        {...register('fSui.value', {
          onChange: () => {
            setValue('fSui.value', fSuiStaticValue);
          },
        })}
        onActivate={() => {
          if (fSuiActive || warningCondition) return;

          setValue('fSui.active', true);
          setValue('xSui.active', false);
          setValue('dSui.active', false);
          resetField('xSui.value');
          resetField('dSui.value');
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
        opacity="0.7"
        tokenName="SuiD"
        placeholder="--"
        variant="outline"
        textAlign="right"
        active={dSuiActive}
        cursor="not-allowed"
        caretColor="currentColor"
        Bottom={<FormInputDollar label="dSui" />}
        activeBg="linear-gradient(222.71deg, rgba(241, 243, 247, 0) 5.65%, rgba(87, 143, 255, 0.8) 99.55%), linear-gradient(0deg, #F1F3F7, #F1F3F7)"
        balance={`${FixedPointMath.toNumber(
          coinsMap[DSUI_TYPE]?.balance ?? ZERO_BIG_NUMBER
        )}`}
        {...register('dSui.value', {
          onChange: () => {
            setValue('dSui.value', xSuiStaticValue);
          },
        })}
        onActivate={() => {
          if (dSuiActive) return;

          setValue('dSui.active', true);
          setValue('fSui.active', false);
          setValue('xSui.active', false);
          resetField('fSui.value');
          resetField('xSui.value');
        }}
        TokenIcon={
          <DSuiSVG
            maxWidth="4rem"
            maxHeight="2.5rem"
            width="100%"
            height="100%"
          />
        }
      />
      <TokenField
        opacity="0.7"
        tokenName="xSui"
        placeholder="--"
        variant="outline"
        textAlign="right"
        active={xSuiActive}
        cursor="not-allowed"
        caretColor="currentColor"
        Bottom={<FormInputDollar label="xSui" />}
        activeBg="linear-gradient(222.71deg,  #FF6BD6 5.65%, rgba(244, 255, 115, 0.8) 99.55%)"
        balance={`${FixedPointMath.toNumber(
          coinsMap[XSUI_TYPE]?.balance ?? ZERO_BIG_NUMBER
        )}`}
        {...register('xSui.value', {
          onChange: () => {
            setValue('xSui.value', xSuiStaticValue);
          },
        })}
        onActivate={() => {
          if (xSuiActive) return;

          setValue('xSui.active', true);
          setValue('fSui.active', false);
          setValue('dSui.active', false);
          resetField('fSui.value');
          resetField('dSui.value');
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

export default FieldsMint;
