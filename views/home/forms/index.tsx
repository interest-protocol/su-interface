import { Box } from '@interest-protocol/ui-kit';
import { FC, useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import useSuState from '@/hooks/use-su-state';
import useSuiPrice from '@/hooks/use-sui-price';
import { FixedPointMath } from '@/lib';

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
        active: false,
      },
    },
  });

  const { data, isLoading } = useSuState();

  const { data: suiPrice } = useSuiPrice();

  useEffect(() => {
    if (suiPrice && !!data && !isLoading) {
      form.setValue('iSui.usdPrice', suiPrice);
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
        <FormFields />
        <FormSummary />
        <FormButton />
      </Box>
    </FormProvider>
  );
};

export default Forms;
