import { Box } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import Forms from './forms';
import Indicators from './indicators';

const Home: FC = () => (
  <>
    <Indicators />
    <Box
      p="2xl"
      width="100%"
      borderRadius="m"
      border="1px solid"
      bg="lowestContainer"
      borderColor="lowContainer"
      gridColumn={['1/-1', '1/-1', '5/-1']}
    >
      <Forms />
    </Box>
  </>
);

export default Home;
