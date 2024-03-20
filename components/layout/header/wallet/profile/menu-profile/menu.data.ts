import { LinkSVG, LogoutSVG, SwitchSVG } from '@/components/svg';

import { ProfileMenuItemProps } from '../profile.types';

export const MENU_PROFILE_DATA: ReadonlyArray<ProfileMenuItemProps> = [
  {
    name: 'viewInExplorer',
    description: 'View in explorer',
    Icon: LinkSVG,
  },
  {
    name: 'switchAccounts',
    description: 'switch accounts',
    Icon: SwitchSVG,
  },
  {
    name: 'disconnect',
    description: 'disconnect',
    Icon: LogoutSVG,
  },
];
