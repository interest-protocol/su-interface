import { Box, Tabs, Tag, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import { FSuiSVG, XSuiSVG } from '@/components/svg';

import { FormHeaderProps } from './forms.types';

const FormHeader: FC<FormHeaderProps> = ({ handleChangeTab }) => (
  <Box display="flex" alignItems="center" justifyContent="space-between">
    <Tabs
      type="circle"
      items={['Mint', 'Redeem']}
      onChangeTab={handleChangeTab}
    />
    <Box display="flex" gap="xs">
      <Tag
        gap="2xs"
        bg="black"
        variant="outline"
        whiteSpace="nowrap"
        PrefixIcon={
          <FSuiSVG
            maxWidth="1.5rem"
            maxHeight="1.5rem"
            height="100%"
            width="100%"
            rounded
          />
        }
      >
        <Typography variant="label" size="large">
          FSui: $1.1108
        </Typography>
      </Tag>
      <Tag
        gap="2xs"
        bg="black"
        variant="outline"
        whiteSpace="nowrap"
        PrefixIcon={
          <XSuiSVG
            rounded
            width="100%"
            height="100%"
            maxWidth="1.5rem"
            maxHeight="1.5rem"
          />
        }
      >
        <Typography variant="label" size="large">
          XSui: $1.1108
        </Typography>
      </Tag>
    </Box>
  </Box>
);

export default FormHeader;
