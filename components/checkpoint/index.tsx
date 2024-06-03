import { Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import useCheckpoint from './checkpoint.hook';
import { CheckpointProps } from './checkpoint.types';

const Checkpoint: FC<CheckpointProps> = ({ withoutInfo }) => {
  const { content, ok, loading } = useCheckpoint();

  return (
    <Typography
      px="xs"
      gap="s"
      size="medium"
      display="flex"
      variant="label"
      color="onSurface"
      textAlign="center"
      borderRadius="xs"
      alignItems="center"
      justifyContent="center"
      bg={loading ? 'warningContainer' : ok ? '#65A30D' : '#B91C1C'}
    >
      {!withoutInfo && content}
    </Typography>
  );
};

export default Checkpoint;
