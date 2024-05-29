import { Box } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { DSuiSVG, FSuiSVG, XSuiSVG } from '@/components/svg';
import { TokenField } from '@/components/token-field';
import { FSUI_TYPE, SUI_DOLLAR_TYPE, XSUI_TYPE } from '@/constants';
import { useIsRebalanceMode } from '@/hooks/use-is-rebalance-mode';
import { useWeb3 } from '@/hooks/use-web3';
import { FixedPointMath } from '@/lib';
import { parseInputEventToNumberString, ZERO_BIG_NUMBER } from '@/utils';

import { SuForm } from '../forms.types';
import FormInputDollar from './form-input-dollar';

const TYPE = {
  x: XSUI_TYPE,
  f: FSUI_TYPE,
  d: SUI_DOLLAR_TYPE,
};

const FieldsRedeem: FC = () => {
  const { coinsMap } = useWeb3();
  const [warningCondition] = useIsRebalanceMode();
  const { control, setValue, register, resetField } = useFormContext<SuForm>();

  const fSuiActive = useWatch({ control, name: 'fSui.active' });
  const xSuiActive = useWatch({ control, name: 'xSui.active' });
  const dSuiActive = useWatch({ control, name: 'dSui.active' });

  const handleMax = (initial: 'x' | 'd' | 'f') => () => {
    setValue(
      `${initial}Sui.value`,
      `${FixedPointMath.toNumber(
        coinsMap[TYPE[initial]]?.balance ?? ZERO_BIG_NUMBER
      )}`
    );
  };

  return (
    <Box display="flex" gap="s" flexDirection="column">
      <TokenField
        opacity="1"
        tokenName="fSui"
        placeholder="--"
        variant="outline"
        textAlign="right"
        active={fSuiActive}
        handleMax={handleMax('f')}
        Bottom={<FormInputDollar label="fSui" />}
        activeBg="linear-gradient(46.55deg, rgba(244, 255, 115, 0.8) 4.39%, #01FDFF 96.96%)"
        balance={`${FixedPointMath.toNumber(
          coinsMap[FSUI_TYPE]?.balance ?? ZERO_BIG_NUMBER
        )}`}
        {...register('fSui.value', {
          onChange: (v) => {
            setValue(
              'fSui.value',
              parseInputEventToNumberString(
                v,
                FixedPointMath.toNumber(
                  coinsMap[FSUI_TYPE]?.balance ?? ZERO_BIG_NUMBER
                )
              )
            );
          },
        })}
        onActivate={() => {
          if (fSuiActive) return;

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
        tokenName="SuiD"
        placeholder="--"
        variant="outline"
        textAlign="right"
        handleMax={handleMax('d')}
        disabled={warningCondition}
        Bottom={<FormInputDollar label="dSui" />}
        active={warningCondition ? false : dSuiActive}
        activeBg="linear-gradient(222.71deg, rgba(241, 243, 247, 0) 5.65%, rgba(87, 143, 255, 0.8) 99.55%), linear-gradient(0deg, #F1F3F7, #F1F3F7)"
        balance={`${FixedPointMath.toNumber(
          coinsMap[SUI_DOLLAR_TYPE]?.balance ?? ZERO_BIG_NUMBER
        )}`}
        {...register('dSui.value', {
          onChange: (v) => {
            setValue(
              'dSui.value',
              parseInputEventToNumberString(
                v,
                FixedPointMath.toNumber(
                  coinsMap[SUI_DOLLAR_TYPE]?.balance ?? ZERO_BIG_NUMBER
                )
              )
            );
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
        tokenName="xSui"
        placeholder="--"
        variant="outline"
        textAlign="right"
        handleMax={handleMax('x')}
        disabled={warningCondition}
        Bottom={<FormInputDollar label="xSui" />}
        active={warningCondition ? false : xSuiActive}
        activeBg="linear-gradient(222.71deg,  #FF6BD6 5.65%, rgba(244, 255, 115, 0.8) 99.55%)"
        balance={`${FixedPointMath.toNumber(
          coinsMap[XSUI_TYPE]?.balance ?? ZERO_BIG_NUMBER
        )}`}
        {...register('xSui.value', {
          onChange: (v) => {
            setValue(
              'xSui.value',
              parseInputEventToNumberString(
                v,
                FixedPointMath.toNumber(
                  coinsMap[XSUI_TYPE]?.balance ?? ZERO_BIG_NUMBER
                )
              )
            );
          },
        })}
        onActivate={() => {
          if (xSuiActive || warningCondition) return;

          setValue('xSui.active', true);
          setValue('fSui.active', false);
          setValue('dSui.active', false);
          resetField('fSui.value');
          resetField('dSui.value');
        }}
        TokenIcon={
          <XSuiSVG
            width="100%"
            height="100%"
            maxWidth="4rem"
            maxHeight="2.5rem"
          />
        }
      />
    </Box>
  );
};

export default FieldsRedeem;
