import { Box, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { FSuiSVG, ISuiSVG, XSuiSVG } from '@/components/svg';
import { useQuoteCall } from '@/hooks/use-quote-call';
import { FixedPointMath } from '@/lib';
import { formatDollars, formatMoney } from '@/utils';
import { getQuoteCallArgs } from '@/views/home/forms/forms.utils';

import { FormTypeEnum, SuForm } from './forms.types';

const ICONS = {
  iSui: ISuiSVG,
  xSui: XSuiSVG,
  fSui: FSuiSVG,
};

const FormSummary: FC = () => {
  const { control } = useFormContext<SuForm>();
  const formType = useWatch({ control, name: 'formType' });
  const xSui = useWatch({ control, name: 'xSui' });
  const fSui = useWatch({ control, name: 'fSui' });
  const iSui = useWatch({ control, name: 'iSui' });

  const { data, isLoading } = useQuoteCall(
    getQuoteCallArgs({
      formType,
      fSui,
      xSui,
      iSui,
    })
  );

  if (isLoading || !data) return <div>is loading...</div>;

  const targetSymbol =
    formType === FormTypeEnum.Redeem
      ? 'iSui'
      : xSui.active
        ? 'xSui'
        : fSui.active
          ? 'fSui'
          : null;

  const activeAsset =
    formType === FormTypeEnum.Redeem
      ? iSui
      : xSui.active
        ? xSui
        : fSui.active
          ? fSui
          : null;

  const usdPrice = activeAsset ? activeAsset.usdPrice : 0;

  const Icon = targetSymbol ? ICONS[targetSymbol] : () => null;

  return (
    <Box my="xl" display="flex" flexDirection="column" gap="s">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography
          size="large"
          variant="body"
          color="outline"
          textDecoration="underline"
        >
          Slippage Tolerance:
        </Typography>
        <Box bg="lowContainer" borderRadius="xs" px="m" py="s">
          0.5%
        </Box>
      </Box>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography size="large" variant="body" color="outline">
          Mint Fee:
        </Typography>
        <Box bg="lowContainer" borderRadius="xs" px="m" py="s">
          {FixedPointMath.toNumber(data.feePercent)}%
        </Box>
      </Box>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography size="large" variant="body" color="outline">
          Received:
        </Typography>
        <Box
          px="m"
          py="s"
          gap="s"
          display="flex"
          bg="lowContainer"
          borderRadius="xs"
          alignItems="center"
        >
          <Typography size="large" variant="body" whiteSpace="nowrap">
            {formatMoney(FixedPointMath.toNumber(data.valueOut))} {targetSymbol}{' '}
            ({formatDollars(FixedPointMath.toNumber(data.valueOut) * usdPrice)})
          </Typography>
          <Icon
            rounded
            width="100%"
            height="100%"
            maxWidth="2rem"
            maxHeight="1.5rem"
          />
        </Box>
      </Box>
    </Box>
  );
};

export default FormSummary;
