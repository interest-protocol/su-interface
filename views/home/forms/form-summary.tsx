import { Box, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import { XSuiSVG } from '@/components/svg';

const FormSummary: FC = () => (
  <Box my="xl" display="flex" flexDirection="column" gap="s">
    <Box display="flex" justifyContent="space-between" alignItems="center">
      <Typography
        size="large"
        variant="body"
        color="outline"
        textDecoration="underline"
      >
        Slippage Tolerance:
      </Typography>
      <Box bg="lowContainer" borderRadius="xs" px="m" py="s">
        0.5%
      </Box>
    </Box>
    <Box display="flex" justifyContent="space-between" alignItems="center">
      <Typography size="large" variant="body" color="outline">
        Mint Fee:
      </Typography>
      <Box bg="lowContainer" borderRadius="xs" px="m" py="s">
        0.00%
      </Box>
    </Box>
    <Box display="flex" justifyContent="space-between" alignItems="center">
      <Typography size="large" variant="body" color="outline">
        Received:
      </Typography>
      <Box
        px="m"
        py="s"
        gap="s"
        display="flex"
        bg="lowContainer"
        borderRadius="xs"
        alignItems="center"
      >
        <Typography size="large" variant="body" whiteSpace="nowrap">
          19x xSUI ($32)
        </Typography>
        <XSuiSVG
          rounded
          width="100%"
          height="100%"
          maxWidth="2rem"
          maxHeight="1.5rem"
        />
      </Box>
    </Box>
  </Box>
);

export default FormSummary;
