import { Box, Button, Typography } from '@interest-protocol/ui-kit';
import { useCurrentAccount } from '@mysten/dapp-kit';
import { FC } from 'react';
import { toast } from 'react-hot-toast';

import { CopySVG } from '@/svg';

import Avatar from '../../account-info/avatar';
import ItemWrapper from '../menu-switch-account/item-wrapper';

const UserInfo: FC = () => {
  const currentAccount = useCurrentAccount();

  const account = currentAccount?.address || '';

  const copyToClipboard = (address: string) => {
    window.navigator.clipboard.writeText(address || '');
    toast('Address copied to the clipboard');
  };

  return (
    <>
      <Box px="l" my="m">
        <Typography size="large" variant="label" color="onSurface">
          Wallet
        </Typography>
      </Box>
      <Box color="onSurface">
        <ItemWrapper>
          <Box display="flex" justifyContent="space-between" width="100%">
            <Box display="flex" alignItems="center" gap="l">
              <Avatar withNameOrAddress />
            </Box>
            <Button
              isIcon
              p="0 !important"
              variant="text"
              onClick={(e) => {
                e.stopPropagation();
                copyToClipboard(account || '');
              }}
            >
              <CopySVG maxHeight="1rem" maxWidth="1rem" width="100%" />
            </Button>
          </Box>
        </ItemWrapper>
      </Box>
    </>
  );
};

export default UserInfo;
