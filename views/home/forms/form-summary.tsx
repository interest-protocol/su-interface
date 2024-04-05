import { Box, Typography } from '@interest-protocol/ui-kit';
import { FC, useEffect } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import Skeleton from 'react-loading-skeleton';

import { FSuiSVG, ISuiSVG, XSuiSVG } from '@/components/svg';
import { useQuoteCall } from '@/hooks/use-quote-call';
import { FixedPointMath } from '@/lib';
import { formatDollars, formatMoney, ZERO_BIG_NUMBER } from '@/utils';
import { getQuoteCallArgs } from '@/views/home/forms/forms.utils';

import { FormTypeEnum, SuForm } from './forms.types';

const ICONS = {
  iSui: ISuiSVG,
  xSui: XSuiSVG,
  fSui: FSuiSVG,
};

const FormSummary: FC = () => {
  const { control, setValue } = useFormContext<SuForm>();
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

  useEffect(() => {
    if (formType) {
      setValue(
        'iSui.value',
        `${FixedPointMath.toNumber(data?.valueOut ?? ZERO_BIG_NUMBER)}`
      );
      return;
    }

    if (xSui.active) {
      setValue(
        'xSui.value',
        `${FixedPointMath.toNumber(data?.valueOut ?? ZERO_BIG_NUMBER)}`
      );
      return;
    }
    if (fSui.active) {
      setValue(
        'fSui.value',
        `${FixedPointMath.toNumber(data?.valueOut ?? ZERO_BIG_NUMBER)}`
      );
      return;
    }
  }, [data]);

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
        {isLoading || !data ? (
          <Skeleton width="4rem" height="2.5rem" />
        ) : (
          <Box bg="lowContainer" borderRadius="xs" px="m" py="s">
            {FixedPointMath.toNumber(data.feePercent)}%
          </Box>
        )}
      </Box>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography size="large" variant="body" color="outline">
          Received:
        </Typography>
        {isLoading || !data ? (
          <Skeleton width="10rem" height="2.5rem" />
        ) : (
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
              {formatMoney(FixedPointMath.toNumber(data.valueOut))}{' '}
              {targetSymbol} (
              {formatDollars(FixedPointMath.toNumber(data.valueOut) * usdPrice)}
              )
            </Typography>
            <Icon
              rounded
              width="100%"
              height="100%"
              maxWidth="2rem"
              maxHeight="1.5rem"
            />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default FormSummary;
