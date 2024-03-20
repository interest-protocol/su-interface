import { Box, ProgressIndicator, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import { FSuiSVG, ISuiSVG, PizzaSVG, XSuiSVG } from '@/components/svg';

const Indicators: FC = () => (
  <Box
    gap="2xs"
    as="aside"
    width="100%"
    display="grid"
    gridTemplateColumns="1fr 1fr"
    gridColumn={['1/-1', '1/-1', '1/6']}
  >
    <Box
      p="l"
      display="flex"
      borderRadius="m"
      gridColumn="1/-1"
      border="1px solid"
      flexDirection="column"
      borderColor="lowestContainer"
      justifyContent="space-between"
    >
      <ISuiSVG rounded width="100%" maxWidth="3rem" maxHeight="3rem" />
      <Box display="flex" flexDirection="column" gap="s">
        <Typography variant="display" size="medium">
          59.09
        </Typography>
        <Box display="flex" alignItems="center" gap="4xl">
          <ProgressIndicator variant="bar" value={20} />
          <Typography variant="label" size="medium" whiteSpace="nowrap">
            Max. 1000
          </Typography>
        </Box>
      </Box>
    </Box>
    <Box
      p="l"
      borderRadius="m"
      border="1px solid"
      borderColor="lowestContainer"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
    >
      <FSuiSVG rounded width="100%" maxWidth="3.5rem" maxHeight="3.5rem" />
      <Box display="flex" flexDirection="column" gap="s">
        <Typography variant="display" size="medium">
          1M
        </Typography>
        <Box display="flex" alignItems="center" gap="s">
          <ProgressIndicator variant="bar" value={20} />
          <Typography variant="label" size="medium" whiteSpace="nowrap">
            Max. 20M
          </Typography>
        </Box>
      </Box>
    </Box>
    <Box
      p="l"
      display="flex"
      borderRadius="m"
      border="1px solid"
      flexDirection="column"
      borderColor="lowestContainer"
      justifyContent="space-between"
    >
      <XSuiSVG rounded width="100%" maxWidth="3.5rem" maxHeight="3.5rem" />
      <Typography variant="display" size="medium">
        500
      </Typography>
    </Box>
    <Box
      p="l"
      display="flex"
      borderRadius="m"
      gridColumn="1/-1"
      border="1px solid"
      flexDirection="column"
      borderColor="lowestContainer"
      justifyContent="space-between"
    >
      <Box
        width="3rem"
        height="3rem"
        display="flex"
        bg="lowContainer"
        alignItems="center"
        borderRadius="full"
        justifyContent="center"
      >
        <PizzaSVG width="100%" maxWidth="2rem" maxHeight="2rem" />
      </Box>
      <Box display="flex" flexDirection="column" gap="s">
        <Typography
          size="medium"
          variant="body"
          color="outline"
          whiteSpace="nowrap"
        >
          Collateral Ratio
        </Typography>
        <Typography variant="display" size="small">
          312.53%
        </Typography>
      </Box>
    </Box>
  </Box>
);
export default Indicators;
