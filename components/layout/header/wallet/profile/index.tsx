/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Button } from '@interest-protocol/ui-kit';
import { useRouter } from 'next/router';
import { FC, useEffect, useState } from 'react';

import { useAccount } from '@/hooks/use-account';
import useClickOutsideListenerRef from '@/hooks/use-click-outside-listener-ref';

import Avatar from '../account-info/avatar';
import MenuProfile from './menu-profile';
import MenuSwitchAccount from './menu-switch-account';

const BOX_ID = 'wallet-box';

const Profile: FC = () => {
  const { query } = useRouter();
  const [isOpenProfile, setIsOpenProfile] = useState(Boolean(query.profile));
  const [isOpenAccount, setIsOpenAccount] = useState(Boolean(query.account));
  const [menuIsDropdown, setMenuIsDropdown] = useState(
    isOpenProfile || isOpenAccount
  );
  const { address, isEnoki } = useAccount();

  const account = address || '';

  useEffect(() => {
    setMenuIsDropdown(isOpenProfile || isOpenAccount);
  }, [isOpenAccount, isOpenProfile]);

  const closeDropdown = (event: any) => {
    if (
      event?.path?.some((node: any) => node?.id == BOX_ID) ||
      event?.composedPath()?.some((node: any) => node?.id == BOX_ID)
    )
      return;

    handleCloseProfile();
  };

  const connectedBoxRef =
    useClickOutsideListenerRef<HTMLDivElement>(closeDropdown);

  const handleOpenProfile = () => {
    handleCloseAccount();
    const url = new URL(window.location.href);
    url.searchParams.set('profile', 'true');
    window.history.pushState('', '', url.toString());
    setIsOpenProfile(true);
  };

  const handleCloseProfile = () => {
    handleCloseAccount();
    const url = new URL(window.location.href);
    url.searchParams.delete('profile');
    window.history.pushState('', '', url.toString());
    setIsOpenProfile(false);
  };

  const handleOpenAccount = () => {
    handleCloseProfile();
    const url = new URL(window.location.href);
    url.searchParams.set('account', 'true');
    window.history.pushState('', '', url.toString());
    setIsOpenAccount(true);
  };

  const handleCloseAccount = () => {
    const url = new URL(window.location.href);
    url.searchParams.delete('account');
    window.history.pushState('', '', url.toString());
    setIsOpenAccount(false);
  };

  const handleCloseAll = () => {
    handleCloseAccount();
    handleCloseProfile();
  };

  return (
    <Box
      id={BOX_ID}
      display="flex"
      cursor="pointer"
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      ref={connectedBoxRef}
      flexDirection="column"
      justifyContent="center"
      top={menuIsDropdown ? ['0', '0', '0', 'unset'] : 'unset'}
      right={menuIsDropdown ? ['0', '0', '0', 'unset'] : 'unset'}
      width={menuIsDropdown ? ['110vw', '110vw', '110vw', 'unset'] : 'unset'}
      height={menuIsDropdown ? ['100vh', '100vh', '100vh', 'unset'] : 'unset'}
      position={
        menuIsDropdown ? ['fixed', 'fixed', 'fixed', 'relative'] : 'relative'
      }
      bg={
        menuIsDropdown
          ? ['container', 'container', 'container', 'unset']
          : 'unset'
      }
    >
      {account && (
        <Box
          gap="m"
          alignItems="center"
          display={[
            menuIsDropdown ? 'none' : 'flex',
            menuIsDropdown ? 'none' : 'flex',
            menuIsDropdown ? 'none' : 'flex',
            'flex',
          ]}
          onClick={menuIsDropdown ? handleCloseAll : handleOpenProfile}
        >
          <Button
            p="xs"
            variant="tonal"
            borderRadius="full"
            display={['none', 'flex']}
          >
            <Avatar withNameOrAddress />
          </Button>
          <Button
            p="xs"
            variant="tonal"
            borderRadius="full"
            display={['flex', 'none']}
          >
            <Avatar />
          </Button>
        </Box>
      )}
      <MenuProfile
        isOpen={isOpenProfile}
        handleOpenSwitch={handleOpenAccount}
        handleCloseProfile={handleCloseProfile}
      />
      {!isEnoki && (
        <MenuSwitchAccount
          isOpen={isOpenAccount}
          onBack={handleOpenProfile}
          handleCloseProfile={handleCloseProfile}
        />
      )}
    </Box>
  );
};

export default Profile;
