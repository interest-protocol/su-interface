import { Box, Button } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import { ArrowRightSVG } from '@/components/svg';

import DoubleFields from './double-fields';
import ISuiField from './i-sui-field';

const FormFields: FC = () => (
  <Box gap="l" display="grid" gridTemplateColumns="1fr 3rem 1fr">
    <ISuiField />
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
    <DoubleFields />
  </Box>
);

export default FormFields;
