import { Box } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import FormFields from './form-fields';
import FormHeader from './form-header';

const Forms: FC = () => {
  const handleChangeTab = (tabIndex: number) => {
    console.log({ tabIndex });
  };

  return (
    <Box display="flex" flexDirection="column" gap="3xl">
      <FormHeader handleChangeTab={handleChangeTab} />
      <FormFields />
    </Box>
  );
};

export default Forms;
