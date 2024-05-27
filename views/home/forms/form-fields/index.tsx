import { Box, Button } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { ArrowRightSVG } from '@/components/svg';

import { SuForm } from '../forms.types';
import DoubleFieldsMint from './fields-mint';
import DoubleFieldsRedeem from './fields-redeem';
import ISuiMint from './i-sui-mint';
import ISuiRedeem from './i-sui-redeem';

const FormFields: FC = () => {
  const { control } = useFormContext<SuForm>();

  const formType = useWatch({ control, name: 'formType' });

  return (
    <Box
      gap="l"
      display="grid"
      gridTemplateColumns={['1fr', '1fr', '1fr', '1fr 3rem 1fr']}
    >
      {formType ? <DoubleFieldsRedeem /> : <ISuiMint />}
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        rotate={['90deg', '90deg', '90deg', 'unset']}
      >
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
      {formType ? <ISuiRedeem /> : <DoubleFieldsMint />}
    </Box>
  );
};

export default FormFields;
