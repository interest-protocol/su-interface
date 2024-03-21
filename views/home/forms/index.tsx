import { Box } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import FormButton from './form-button';
import FormFields from './form-fields';
import FormHeader from './form-header';
import FormSummary from './form-summary';
import { FormTypeEnum, SuForm } from './forms.types';

const Forms: FC = () => {
  const form = useForm<SuForm>({
    defaultValues: {
      formType: FormTypeEnum.Mint,
      fSui: {
        active: false,
      },
      xSui: {
        active: false,
      },
    },
  });

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
