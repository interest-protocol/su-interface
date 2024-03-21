import { Box } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import FormHeader from './form-header';

const Forms: FC = () => {
  const handleChangeTab = (tabIndex: number) => {
    console.log({ tabIndex });
  };

  return (
    <Box>
      <FormHeader handleChangeTab={handleChangeTab} />
    </Box>
  );
};

export default Forms;
