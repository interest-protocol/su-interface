import { Box, Button, Typography } from '@interest-protocol/ui-kit';
import { FC, useEffect, useState } from 'react';

import { InfoSVG, LinkArrowSVG, TimesSVG } from '@/components/svg';

const LOCAL_STORAGE_TTP_KEY = 'tip-storage-key';

const FormsTip: FC = () => {
  const warningCondition = true;
  const [isTipHidden, setTipHidden] = useState(false);

  useEffect(() => {
    setTipHidden(
      JSON.parse(
        localStorage.getItem(LOCAL_STORAGE_TTP_KEY) as 'true' | 'false'
      )
    );
  }, []);

  const onClose = () => {
    setTipHidden(true);
    localStorage.setItem(LOCAL_STORAGE_TTP_KEY, JSON.stringify(true));
  };

  if (isTipHidden || !warningCondition) return null;

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
          <Button variant="tonal" onClick={onClose} borderRadius="full">
            Dismiss
          </Button>
        </Box>
      </Box>
      <Box
        height="1.3rem"
        color="warning"
        display="flex"
        cursor="pointer"
        borderRadius="xs"
        onClick={onClose}
        alignItems="center"
        justifyContent="center"
      >
        <TimesSVG maxHeight="1rem" maxWidth="1rem" width="100%" />
      </Box>
    </Box>
  );
};

export default FormsTip;
