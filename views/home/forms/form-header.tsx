import { Box, Tabs, Tag, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { DSuiSVG, FSuiSVG, XSuiSVG } from '@/components/svg';
import { formatDollars } from '@/utils';

import { FormTypeEnum, SuForm } from './forms.types';

const FormHeader: FC = () => {
  const { control, setValue, resetField, getValues } = useFormContext<SuForm>();

  const formType = useWatch({ control, name: 'formType' });
  const fSuiPrice = useWatch({ control, name: 'fSui.usdPrice' });
  const dSuiPrice = useWatch({ control, name: 'dSui.usdPrice' });
  const xSuiPrice = useWatch({ control, name: 'xSui.usdPrice' });

  const handleChangeTab = (tabIndex: FormTypeEnum) => {
    const iSuiPriceTmp = getValues('iSui.usdPrice');
    const xSuiPriceTmp = getValues('xSui.usdPrice');
    const fSuiPriceTmp = getValues('fSui.usdPrice');
    const dSuiPriceTmp = getValues('dSui.usdPrice');

    setValue('formType', tabIndex);
    resetField('fSui');
    resetField('xSui');
    resetField('iSui');
    resetField('dSui');
    setValue('iSui.usdPrice', iSuiPriceTmp);
    setValue('xSui.usdPrice', xSuiPriceTmp);
    setValue('fSui.usdPrice', fSuiPriceTmp);
    setValue('dSui.usdPrice', dSuiPriceTmp);
  };

  return (
    <Box
      gap="l"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      flexDirection={['column-reverse', 'row']}
    >
      <Tabs
        type="circle"
        defaultTabIndex={formType}
        items={['Mint', 'Redeem']}
        onChangeTab={handleChangeTab}
      />
      <Box
        gap="xs"
        display="flex"
        flexDirection={['column', 'column', 'column', 'column', 'row']}
      >
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
            <DSuiSVG
              maxWidth="1.5rem"
              maxHeight="1.5rem"
              height="100%"
              width="100%"
              rounded
            />
          }
        >
          <Typography variant="label" size="large">
            SuiD: {formatDollars(+dSuiPrice.toFixed(4))}
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
