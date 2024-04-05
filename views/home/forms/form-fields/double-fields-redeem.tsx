import { Box } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { FSuiSVG, XSuiSVG } from '@/components/svg';
import { TokenField } from '@/components/token-field';
import { FSUI_TYPE, XSUI_TYPE } from '@/constants';
import { useWeb3 } from '@/context/web3';
import { useIsRebalanceMode } from '@/hooks/use-is-rebalance-mode';
import { FixedPointMath } from '@/lib';
import { parseInputEventToNumberString, ZERO_BIG_NUMBER } from '@/utils';

import { SuForm } from '../forms.types';
import FormInputDollar from './form-input-dollar';

const DoubleFieldsRedeem: FC = () => {
  const { coinsMap } = useWeb3();
  const [warningCondition] = useIsRebalanceMode();
  const { control, setValue, register, resetField } = useFormContext<SuForm>();

  const fSuiActive = useWatch({ control, name: 'fSui.active' });
  const xSuiActive = useWatch({ control, name: 'xSui.active' });

  return (
    <Box display="flex" gap="s" flexDirection="column">
      <TokenField
        opacity="1"
        tokenName="fSui"
        placeholder="--"
        variant="outline"
        textAlign="right"
        active={fSuiActive}
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
          resetField('xSui.value');
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
          resetField('fSui.value');
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

export default DoubleFieldsRedeem;
