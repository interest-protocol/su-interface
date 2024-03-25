import { Box, Button } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { ArrowRightSVG, FSuiSVG, ISuiSVG, XSuiSVG } from '@/components/svg';
import { TokenField } from '@/components/token-field';
import { FSUI_TYPE, ISUI_TYPE, XSUI_TYPE } from '@/constants';
import { useWeb3 } from '@/context/web3';
import { FixedPointMath } from '@/lib';
import { parseInputEventToNumberString, ZERO_BIG_NUMBER } from '@/utils';

import { SuForm } from '../forms.types';
import FormInputDollar from './form-input-dollar';

const FormFields: FC = () => {
  const { coinsMap } = useWeb3();
  const { control, setValue, register } = useFormContext<SuForm>();

  const formType = useWatch({ control, name: 'formType' });
  const fSuiActive = useWatch({ control, name: 'fSui.active' });
  const xSuiActive = useWatch({ control, name: 'xSui.active' });

  const handleMax = () => {
    setValue(
      'iSui.value',
      `${FixedPointMath.toNumber(
        coinsMap[ISUI_TYPE]?.balance ?? ZERO_BIG_NUMBER
      )}`
    );
  };

  return (
    <Box gap="l" display="grid" gridTemplateColumns="1fr 3rem 1fr">
      <Box order={formType}>
        <TokenField
          active
          placeholder="--"
          tokenName="iSui"
          variant="outline"
          textAlign="right"
          Bottom={<FormInputDollar label="iSui" />}
          balance={`${FixedPointMath.toNumber(
            coinsMap[ISUI_TYPE]?.balance ?? ZERO_BIG_NUMBER
          )}`}
          {...register('iSui.value', {
            onChange: (v) => {
              setValue('iSui.value', parseInputEventToNumberString(v));
            },
          })}
          {...(!formType && { handleMax: handleMax })}
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
      <Box display="flex" alignItems="center">
        <Button
          p="0"
          width="2.5rem"
          height="2.5rem"
          variant="tonal"
          borderRadius="full"
          alignItems="center"
          justifyContent="center"
        >
          <ArrowRightSVG maxWidth="1rem" maxHeight="1rem" height="100%" />
        </Button>
      </Box>
      <Box display="flex" gap="s" flexDirection="column" order={formType && -1}>
        <TokenField
          tokenName="fSui"
          placeholder="--"
          variant="outline"
          textAlign="right"
          active={fSuiActive}
          Bottom={<FormInputDollar label="fSui" />}
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
            if (!fSuiActive) {
              setValue('fSui.active', true);
              setValue('xSui.active', false);
              setValue('fSui.value', '' as `${number}`);
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
          Bottom={<FormInputDollar label="xSui" />}
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
            if (!xSuiActive) {
              setValue('xSui.active', true);
              setValue('fSui.active', false);
              setValue('fSui.value', '' as `${number}`);
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
    </Box>
  );
};

export default FormFields;
