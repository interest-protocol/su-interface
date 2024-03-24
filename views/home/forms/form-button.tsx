import { Box, Button } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { FormTypeEnum, SuForm } from './forms.types';

const FormButton: FC = () => {
  const { control } = useFormContext<SuForm>();

  const formType = useWatch({ control, name: 'formType' });

  return (
    <Box display="flex" justifyContent="center">
      <Button variant="filled" bg="white" borderRadius="full">
        {formType === FormTypeEnum.Mint ? 'Mint' : 'Redeem'}
      </Button>
    </Box>
  );
};

export default FormButton;
