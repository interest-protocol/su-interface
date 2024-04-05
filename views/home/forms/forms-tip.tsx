import { Box, Button, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import { InfoSVG, LinkArrowSVG } from '@/components/svg';

const FormsTip: FC = () => {
  const warningCondition = true;

  if (!warningCondition) return null;

  return (
    <Box
      p="l"
      gap="l"
      display="flex"
      borderRadius="s"
      bg="lowContainer"
      border="1px solid"
      borderColor="warning"
    >
      <Box color="warning">
        <InfoSVG maxHeight="1.4rem" maxWidth="1.4rem" width="100%" />
      </Box>
      <Box display="flex" gap="l" flexDirection="column" flex="1">
        <Box display="flex" gap="xs" flexDirection="column">
          <Typography size="large" variant="body" color="warning">
            You {"can't"} mint fSUI
          </Typography>
          <Typography size="large" variant="body">
            Minting fSui has been disabled until CR (Collateral Ratio) is above
            130%
          </Typography>
        </Box>
        <Box display="flex" gap="m">
          <Button
            variant="tonal"
            borderRadius="full"
            SuffixIcon={
              <LinkArrowSVG width="100%" maxWidth="0.8rem" maxHeight="0.8rem" />
            }
          >
            Learn more
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default FormsTip;
