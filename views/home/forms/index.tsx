import { Box } from '@interest-protocol/ui-kit';
import { FC, useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { useSuiPrice } from '@/context/sui-price';
import useSuState from '@/hooks/use-su-state';
import { FixedPointMath } from '@/lib';
import FormsTip from '@/views/home/forms/forms-tip';

import FormButton from './form-button';
import FormFields from './form-fields';
import FormHeader from './form-header';
import FormSummary from './form-summary';
import { FormTypeEnum, SuForm } from './forms.types';

const Forms: FC = () => {
  const form = useForm<SuForm>({
    defaultValues: {
      formType: FormTypeEnum.Mint,
      iSui: {
        usdPrice: 0,
      },
      fSui: {
        usdPrice: 0,
        active: false,
      },
      xSui: {
        usdPrice: 0,
        active: true,
      },
      dSui: {
        usdPrice: 1,
        active: false,
      },
    },
  });

  const { data, isLoading } = useSuState();

  const { price: suiPrice } = useSuiPrice();

  useEffect(() => {
    if (suiPrice && !!data && !isLoading) {
      form.setValue('iSui.usdPrice', suiPrice);
      form.setValue('dSui.usdPrice', 1);
      form.setValue(
        'fSui.usdPrice',
        suiPrice * FixedPointMath.toNumber(data.fNav)
      );
      form.setValue(
        'xSui.usdPrice',
        suiPrice * FixedPointMath.toNumber(data.xNav)
      );
    }
  }, [suiPrice, isLoading]);

  return (
    <FormProvider {...form}>
      <Box display="flex" flexDirection="column" gap="3xl">
        <FormHeader />
        <FormsTip />
        <FormFields />
        <FormSummary />
        <FormButton />
      </Box>
    </FormProvider>
  );
};

export default Forms;
