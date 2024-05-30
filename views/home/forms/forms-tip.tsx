import { Box, Button, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { InfoSVG, LinkArrowSVG } from '@/components/svg';
import { useIsRebalanceMode } from '@/hooks/use-is-rebalance-mode';
import { FormTypeEnum, SuForm } from '@/views/home/forms/forms.types';

const FormsTip: FC = () => {
  const [warningCondition, rebalanceCollateralRatio] = useIsRebalanceMode();
  const { control } = useFormContext<SuForm>();

  const formType = useWatch({ control, name: 'formType' });
  const isMint = formType === FormTypeEnum.Mint;

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
            {isMint ? "You can't mint fSui" : "You can't redeem xSui"}
          </Typography>
          <Typography size="large" variant="body">
            {isMint ? 'Minting fSui/SuiD' : 'Redeeming xSui'} has been disabled
            until CR (Collateral Ratio) is above{' '}
            {rebalanceCollateralRatio.toFixed(0)}%
          </Typography>
        </Box>
        <Box display="flex" gap="m">
          <Button
            disabled
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
