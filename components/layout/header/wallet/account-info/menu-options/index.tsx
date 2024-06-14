import { Box, Motion, Typography } from '@interest-protocol/ui-kit';
import {
  useAccounts,
  useCurrentWallet,
  useSwitchAccount,
} from '@mysten/dapp-kit';
import { FC, ReactNode, useState } from 'react';
import unikey from 'unikey';

import { wrapperVariants } from '@/constants';
import { useAccount } from '@/hooks/use-account';
import { ArrowLeftSVG, LogoutSVG } from '@/svg';

import ConnectWalletButton from '../../connect-wallet-button';
import Avatar from '../avatar';
import { MenuOptionsProps } from './menu-option.types';
import OptionItem from './option-item';

const AccountSubMenu: FC<{ closeSubmenu: () => void }> = ({ closeSubmenu }) => {
  const accounts = useAccounts();
  const { address } = useAccount();
  const { mutate: selectAccount } = useSwitchAccount();

  return (
    <>
      <OptionItem>
        <Box onClick={closeSubmenu}>
          <ArrowLeftSVG maxWidth="1.4rem" maxHeight="1.4rem" width="100%" />
        </Box>
        <Box fontFamily="Proto">Network</Box>
      </OptionItem>
      {accounts.map((account) => (
        <OptionItem
          key={unikey()}
          onClick={() => selectAccount({ account })}
          selected={address === account.address}
        >
          <Avatar withNameOrAddress account={account?.address} />
        </OptionItem>
      ))}
    </>
  );
};

const MenuOptions: FC<MenuOptionsProps> = ({
  isMenuOpen,
  handleDisconnect,
}) => {
  const { isConnected } = useCurrentWallet();
  const [submenu, setSubmenu] = useState<ReactNode>(null);

  const closeSubmenu = () => setSubmenu(null);

  const openAccountSubmenu = () =>
    setSubmenu(<AccountSubMenu closeSubmenu={closeSubmenu} />);

  return (
    <Motion
      right="0"
      top="3rem"
      zIndex={4}
      overflowY="auto"
      width="14.5rem"
      maxHeight="83vh"
      border="1px solid"
      borderRadius="1rem"
      position="absolute"
      bg="lowestContainer"
      variants={wrapperVariants}
      textTransform="capitalize"
      borderColor="outlineVariant"
      initial={isMenuOpen ? 'open' : 'closed'}
      animate={isMenuOpen ? 'open' : 'closed'}
      pointerEvents={isMenuOpen ? 'auto' : 'none'}
      boxShadow="0px 2px 4px -2px rgba(13, 16, 23, 0.04), 0px 4px 8px -2px rgba(13, 16, 23, 0.12);"
    >
      {submenu ?? (
        <>
          {isConnected && (
            <OptionItem withSubmenu onClick={openAccountSubmenu}>
              <Avatar withNameOrAddress />
            </OptionItem>
          )}
          <OptionItem disabled>Settings</OptionItem>
          {isConnected ? (
            <>
              <OptionItem onClick={handleDisconnect}>
                <Box display="flex" color="error">
                  <LogoutSVG
                    maxWidth="1.5rem"
                    maxHeight="1.5rem"
                    width="100%"
                  />
                </Box>
                <Typography variant="body" size="large" color="error">
                  Sign Out
                </Typography>
              </OptionItem>
            </>
          ) : (
            <OptionItem>
              <ConnectWalletButton />
            </OptionItem>
          )}
        </>
      )}
    </Motion>
  );
};

export default MenuOptions;
