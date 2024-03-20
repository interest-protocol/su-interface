import { Box, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import Indicators from './indicators';

const Home: FC = () => (
  <>
    <Indicators />
    <Box gridColumn={['1/-1', '1/-1', '6/-1']}>
      <Typography size="large" variant="display" color="onSurface">
        Home
      </Typography>
    </Box>
  </>
);

export default Home;
