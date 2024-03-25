import { Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { formatDollars } from '@/utils';

import { FormInputDollarProps, SuForm } from '../forms.types';

const FormInputDollar: FC<FormInputDollarProps> = ({ label }) => {
  const { control } = useFormContext<SuForm>();

  const value = useWatch({ control, name: `${label}.value` });
  const usdPrice = useWatch({ control, name: `${label}.usdPrice` });

  const usdValue = +(Number(value || 0) * (usdPrice ?? 0)).toFixed(2);

  return (
    <Typography variant="label" size="small" textAlign="right">
      {usdValue ? formatDollars(usdValue) : '--'} USD
    </Typography>
  );
};

export default FormInputDollar;
