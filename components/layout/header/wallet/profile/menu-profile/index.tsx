import { Box, Motion, Theme, useTheme } from '@interest-protocol/ui-kit';
import { useDisconnectWallet } from '@mysten/dapp-kit';
import { useEnokiFlow } from '@mysten/enoki/react';
import { FC, useState } from 'react';
import unikey from 'unikey';

import { EXPLORER_URL, wrapperVariants } from '@/constants';
import { useAccount } from '@/hooks/use-account';
import useEventListener from '@/hooks/use-event-listener';

import MenuButton from '../../menu-button';
import { MenuProfileProps } from '../profile.types';
import { MENU_PROFILE_DATA } from './menu.data';
import MenuProfileItem from './profile-item';
import UserInfo from './user-info';

const MenuProfile: FC<MenuProfileProps> = ({
  isOpen,
  handleOpenSwitch,
  handleCloseProfile,
}) => {
  const flow = useEnokiFlow();
  const { address, isEnoki } = useAccount();
  const { breakpoints } = useTheme() as Theme;
  const [isDesktop, setIsDesktop] = useState(false);
  const { mutate: disconnect } = useDisconnectWallet();

  const account = address || '';

  const handleAction: Record<string, () => void | Promise<void>> = {
    disconnect: () => {
      handleCloseProfile();
      if (isEnoki) return flow.logout();
      disconnect();
    },
    switchAccounts: handleOpenSwitch,
    viewInExplorer: () => {
      window.open(
        `${EXPLORER_URL}/account/${account}`,
        '_blank',
        'noopener, noreferrer'
      );
    },
  };

  const handleSetDesktopView = () =>
    setIsDesktop(window.matchMedia(`(min-width: ${breakpoints[2]})`).matches);

  useEventListener('resize', handleSetDesktopView, true);

  return (
    <Motion
      right="0"
      zIndex={2}
      bg="container"
      display="flex"
      borderRadius="s"
      overflow="hidden"
      flexDirection="column"
      variants={wrapperVariants}
      textTransform="capitalize"
      top={['0', '0', '0', '3rem']}
      justifyContent="space-between"
      p={['xl', 'xl', 'xl', 'unset']}
      animate={isOpen ? 'open' : 'closed'}
      pointerEvents={isOpen ? 'auto' : 'none'}
      height={['100vh', '100vh', '100vh', 'unset']}
      width={['100vw', '100vw', '100vw', '14.5rem']}
      position={['fixed', 'fixed', 'fixed', 'absolute']}
      initial="closed"
    >
      <Box display="flex" flexDirection="column" justifyContent="space-between">
        <Box
          pb="l"
          flexDirection="row-reverse"
          display={['flex', 'flex', 'flex', 'none']}
        >
          <MenuButton handleClose={handleCloseProfile} />
        </Box>
        <UserInfo />
        {MENU_PROFILE_DATA.filter(
          ({ name }) => !(isEnoki && name === 'switchAccounts')
        )
          .slice(0, !isDesktop ? -1 : undefined)
          .map((profileItem) => (
            <MenuProfileItem
              {...profileItem}
              handleAction={handleAction}
              key={unikey()}
            />
          ))}
      </Box>
      {!isDesktop &&
        MENU_PROFILE_DATA.filter(
          ({ name }) => !(isEnoki && name === 'switchAccounts')
        )
          .slice(-1)
          .map((profileItem) => (
            <MenuProfileItem
              {...profileItem}
              handleAction={handleAction}
              key={unikey()}
            />
          ))}
    </Motion>
  );
};

export default MenuProfile;
