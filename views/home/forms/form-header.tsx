import { Box, Tabs, Tag, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { FSuiSVG, XSuiSVG } from '@/components/svg';
import { formatDollars } from '@/utils';

import { FormTypeEnum, SuForm } from './forms.types';

const FormHeader: FC = () => {
  const { control, setValue } = useFormContext<SuForm>();

  const formType = useWatch({ control, name: 'formType' });
  const fSuiPrice = useWatch({ control, name: 'fSui.usdPrice' });
  const xSuiPrice = useWatch({ control, name: 'xSui.usdPrice' });

  const handleChangeTab = (tabIndex: FormTypeEnum) =>
    setValue('formType', tabIndex);

  return (
    <Box display="flex" alignItems="center" justifyContent="space-between">
      <Tabs
        type="circle"
        defaultTabIndex={formType}
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
            FSui: {formatDollars(+fSuiPrice.toFixed(4))}
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
            XSui: {formatDollars(+xSuiPrice.toFixed(4))}
          </Typography>
        </Tag>
      </Box>
    </Box>
  );
};

export default FormHeader;
