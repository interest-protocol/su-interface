import { Button } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import { ISuiSVG } from '../svg';

const Mint: FC = () => (
  <Button
    p="xs"
    variant="tonal"
    color="onSurface"
    borderRadius="full"
    pl={['l', 'l', 'l', 'l', 'l']}
    SuffixIcon={
      <ISuiSVG maxHeight="1.5rem" maxWidth="1.5rem" width="100%" rounded />
    }
  >
    Mint iSUI
  </Button>
);

export default Mint;
