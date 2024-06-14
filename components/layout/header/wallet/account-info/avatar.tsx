import { Box, Typography } from '@interest-protocol/ui-kit';
import { FC, useState } from 'react';
import Skeleton from 'react-loading-skeleton';

import { useSuiNs } from '@/context/suins';
import { useAccount } from '@/hooks/use-account';
import { UserSVG } from '@/svg';

import { getName } from '../profile/profile.utils';
import { AvatarProps } from './account-info.types';

const Avatar: FC<AvatarProps> = ({ account, withNameOrAddress }) => {
  const { names, images, loading } = useSuiNs();
  const { address } = useAccount();
  const [imgLoading, setImgLoading] = useState(true);

  const src = images[names[account ?? address!]] ?? '';

  return (
    <>
      <Box
        bg="primary"
        display="flex"
        width="1.5rem"
        height="1.5rem"
        color="onPrimary"
        overflow="hidden"
        position="relative"
        alignItems="center"
        borderRadius="full"
        justifyContent="center"
      >
        {src ? (
          <>
            {imgLoading && (
              <Box width="100%" height="100%" position="absolute">
                <Skeleton width="100%" />
              </Box>
            )}
            <img
              src={src}
              alt="Avatar"
              width="100%"
              onLoad={() => setImgLoading(false)}
            />
          </>
        ) : (
          <UserSVG
            width="80%"
            height="80%"
            maxWidth="1.5rem"
            maxHeight="1.5rem"
          />
        )}
      </Box>
      {withNameOrAddress && (
        <Typography
          mr="m"
          size="large"
          variant="label"
          color="onSurface"
          width="max-content"
          fontFamily="inherit"
        >
          {loading ? (
            <Skeleton width="100%" />
          ) : (
            getName(account ?? address ?? '', names)
          )}
        </Typography>
      )}
    </>
  );
};

export default Avatar;
