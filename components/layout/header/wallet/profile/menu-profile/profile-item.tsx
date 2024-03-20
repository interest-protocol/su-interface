import { Box, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import ItemWrapper from '../menu-switch-account/item-wrapper';
import { ProfileMenuItemProps } from '../profile.types';

const MenuProfileItem: FC<ProfileMenuItemProps> = ({
  name,
  Icon,
  disabled,
  hasBorder,
  description,
  handleAction,
}) => (
  <Box
    color="onSurface"
    borderTop={['unset', 'unset', 'unset', hasBorder ? '1px solid' : 'unset']}
    borderColor="outlineVariant"
  >
    <ItemWrapper
      disabled={disabled}
      onClick={() => {
        !disabled && handleAction && handleAction[name]?.();
      }}
    >
      <Box display="flex" alignItems="center" gap="l">
        <Icon maxHeight="1.5rem" maxWidth="1.5rem" width="100%" />
        <Typography
          size="small"
          variant="title"
          color="onSurface"
          opacity={disabled ? 0.7 : 1}
        >
          {description}
        </Typography>
      </Box>
    </ItemWrapper>
  </Box>
);

export default MenuProfileItem;
