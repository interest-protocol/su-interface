import { Box } from '@interest-protocol/ui-kit';
import { FC, useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import useSuiPrice from '@/hooks/use-sui-price';

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

  const { data: suiPrice } = useSuiPrice();

  useEffect(() => {
    if (suiPrice) {
      // TODO: set real prices
      form.setValue('iSui.usdPrice', suiPrice);
      form.setValue('fSui.usdPrice', suiPrice);
      form.setValue('xSui.usdPrice', suiPrice);
    }
  }, [suiPrice]);

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
