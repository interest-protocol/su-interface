import { Box, Button } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import { ArrowRightSVG, FSuiSVG, ISuiSVG, XSuiSVG } from '@/components/svg';

import FormInput from './form-input';

const FormFields: FC = () => (
  <Box gap="l" display="grid" gridTemplateColumns="1fr 3rem 1fr">
    <FormInput
      tokenName="iSui"
      placeholder="100"
      TokenIcon={
        <ISuiSVG
          width="100%"
          height="100%"
          maxWidth="2.5rem"
          maxHeight="2.5rem"
        />
      }
    />
    <Box display="flex" alignItems="center">
      <Button
        p="0"
        width="3rem"
        height="3rem"
        variant="tonal"
        borderRadius="full"
        alignItems="center"
        justifyContent="center"
      >
        <ArrowRightSVG maxWidth="1rem" maxHeight="1rem" height="100%" />
      </Button>
    </Box>
    <Box display="flex" gap="s" flexDirection="column">
      <FormInput
        tokenName="fSui"
        placeholder="100"
        TokenIcon={
          <FSuiSVG
            maxWidth="4rem"
            maxHeight="2.5rem"
            width="100%"
            height="100%"
          />
        }
      />
      <FormInput
        tokenName="xSui"
        placeholder="100"
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

export default FormFields;
