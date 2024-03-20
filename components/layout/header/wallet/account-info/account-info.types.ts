export interface AccountInfoProps {
  menuIsOpen: boolean;
  handleOpenMenu: () => void;
  handleCloseMenu: () => void;
}

export interface AvatarProps {
  account?: string;
  withNameOrAddress?: boolean;
}

export interface SuiNetworkProps {
  closeDropdown: () => void;
}
