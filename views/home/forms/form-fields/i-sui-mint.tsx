import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { ISuiSVG } from '@/components/svg';
import { TokenField } from '@/components/token-field';
import { ISUI_TYPE } from '@/constants';
import { useWeb3 } from '@/context/web3';
import { FixedPointMath } from '@/lib';
import { parseInputEventToNumberString, ZERO_BIG_NUMBER } from '@/utils';

import { SuForm } from '../forms.types';
import FormInputDollar from './form-input-dollar';

const ISuiMint: FC = () => {
  const { coinsMap } = useWeb3();

  const { control, setValue, register } = useFormContext<SuForm>();

  const formType = useWatch({ control, name: 'formType' });

  const handleMax = () => {
    setValue(
      'iSui.value',
      `${FixedPointMath.toNumber(
        coinsMap[ISUI_TYPE]?.balance ?? ZERO_BIG_NUMBER
      )}`
    );
  };

  return (
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
          setValue('iSui.value', parseInputEventToNumberString(v));
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
  );
};

export default ISuiMint;
