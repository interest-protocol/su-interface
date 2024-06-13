import { Box, ProgressIndicator, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import Skeleton from 'react-loading-skeleton';

import { DSuiSVG, FSuiSVG, ISuiSVG, PizzaSVG, XSuiSVG } from '@/components/svg';
import useSuState from '@/hooks/use-su-state';
import useSuiPrice from '@/hooks/use-sui-price';
import { FixedPointMath } from '@/lib';
import {
  computeCollateralRatio,
  formatDollars,
  formatMoney,
  ZERO_BIG_NUMBER,
} from '@/utils';

const Indicators: FC = () => {
  const { data, isLoading } = useSuState();
  const { data: suiPrice } = useSuiPrice();

  const iSuiSupply = data ? (data ? data.baseBalance : ZERO_BIG_NUMBER) : null;

  const iSuiUsdPrice = suiPrice;

  const iSuiMarketCap =
    iSuiSupply && iSuiUsdPrice ? iSuiSupply.times(iSuiUsdPrice) : null;

  const xSuiSupply = data ? (data ? data.xSupply : ZERO_BIG_NUMBER) : null;

  const xSuiUsdPrice =
    (suiPrice ?? 1) * FixedPointMath.toNumber(data?.xNav ?? ZERO_BIG_NUMBER);

  const xSuiMarketCap =
    xSuiSupply && xSuiUsdPrice ? xSuiSupply.times(xSuiUsdPrice) : null;

  const fSuiSupply = data ? (data ? data.fSupply : ZERO_BIG_NUMBER) : null;

  const fSuiUsdPrice =
    (suiPrice ?? 1) * FixedPointMath.toNumber(data?.fNav ?? ZERO_BIG_NUMBER);

  const fSuiMarketCap =
    fSuiSupply && fSuiUsdPrice ? fSuiSupply.times(fSuiUsdPrice) : null;

  const dSuiSupply = data ? (data ? data.dSupply : ZERO_BIG_NUMBER) : null;

  const dSuiUsdPrice = 1;

  const dSuiMarketCap =
    dSuiSupply && dSuiUsdPrice ? dSuiSupply.times(dSuiUsdPrice) : null;

  return (
    <Box
      gap="2xs"
      as="aside"
      width="100%"
      display="grid"
      gridColumn={['1/-1', '1/-1', '1/-1', '1/-1', '1/5']}
      gridTemplateColumns={[
        '1fr',
        '1fr 1fr',
        '1fr 1fr 1fr',
        '1fr 1fr 1fr 1fr',
        '1fr 1fr',
      ]}
      gridTemplateRows={[
        '12.5rem 12.5rem 12.5rem 12.5rem 12.5rem',
        '12.5rem 12.5rem 12.5rem',
        '12.5rem 12.5rem',
        '12.5rem 12.5rem',
        '12.5rem 12.5rem 12.5rem',
      ]}
    >
      <Box
        p="l"
        display="flex"
        borderRadius="m"
        border="1px solid"
        flexDirection="column"
        borderColor="lowContainer"
        justifyContent="space-between"
      >
        <ISuiSVG rounded height="100%" maxWidth="2.5rem" maxHeight="3rem" />
        <Box display="flex" flexDirection="column" gap="s">
          <Box>
            <Typography variant="headline" size="medium">
              {iSuiSupply ? (
                formatMoney(FixedPointMath.toNumber(iSuiSupply))
              ) : isLoading ? (
                <Skeleton width="5rem" />
              ) : (
                formatMoney(0)
              )}
            </Typography>
            <Typography variant="label" size="large">
              MC:{' '}
              {iSuiMarketCap ? (
                formatDollars(FixedPointMath.toNumber(iSuiMarketCap))
              ) : isLoading ? (
                <Skeleton width="5rem" />
              ) : (
                formatDollars(0)
              )}
            </Typography>
          </Box>
          <Box display="flex" alignItems="center" gap="4xl">
            <ProgressIndicator
              variant="bar"
              value={
                data
                  ? data.baseBalance
                      .div(data.baseBalanceCap)
                      .times(100)
                      .toNumber()
                  : ZERO_BIG_NUMBER.toNumber()
              }
            />
            <Typography variant="label" size="medium" whiteSpace="nowrap">
              Max.{' '}
              {data ? (
                formatMoney(
                  FixedPointMath.toNumber(
                    data ? data.baseBalanceCap : ZERO_BIG_NUMBER
                  ),
                  2
                )
              ) : isLoading ? (
                <Skeleton width="3rem" height="0.7rem" />
              ) : (
                formatMoney(0)
              )}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box
        p="l"
        display="flex"
        borderRadius="m"
        border="1px solid"
        flexDirection="column"
        borderColor="lowContainer"
        justifyContent="space-between"
      >
        <DSuiSVG rounded height="100%" maxWidth="3rem" maxHeight="2.5rem" />
        <Box>
          <Typography variant="headline" size="medium">
            {dSuiSupply ? (
              formatMoney(FixedPointMath.toNumber(dSuiSupply))
            ) : isLoading ? (
              <Skeleton width="5rem" />
            ) : (
              formatMoney(0)
            )}
          </Typography>
          <Typography variant="label" size="large">
            MC:{' '}
            {dSuiMarketCap ? (
              formatDollars(FixedPointMath.toNumber(dSuiMarketCap))
            ) : isLoading ? (
              <Skeleton width="5rem" />
            ) : (
              formatDollars(0)
            )}
          </Typography>
        </Box>
      </Box>
      <Box
        p="l"
        display="flex"
        borderRadius="m"
        border="1px solid"
        flexDirection="column"
        borderColor="lowContainer"
        justifyContent="space-between"
      >
        <FSuiSVG rounded height="100%" maxWidth="3rem" maxHeight="2.5rem" />
        <Box>
          <Typography variant="headline" size="medium">
            {fSuiSupply ? (
              formatMoney(FixedPointMath.toNumber(fSuiSupply))
            ) : isLoading ? (
              <Skeleton width="5rem" />
            ) : (
              formatMoney(0)
            )}
          </Typography>
          <Typography variant="label" size="large">
            MC:{' '}
            {fSuiMarketCap ? (
              formatDollars(FixedPointMath.toNumber(fSuiMarketCap))
            ) : isLoading ? (
              <Skeleton width="5rem" />
            ) : (
              formatDollars(0)
            )}
          </Typography>
        </Box>
      </Box>
      <Box
        p="l"
        display="flex"
        borderRadius="m"
        border="1px solid"
        flexDirection="column"
        borderColor="lowContainer"
        justifyContent="space-between"
      >
        <XSuiSVG rounded height="100%" maxWidth="3rem" maxHeight="2.5rem" />
        <Box>
          <Typography variant="headline" size="medium">
            {xSuiSupply ? (
              formatMoney(FixedPointMath.toNumber(xSuiSupply))
            ) : isLoading ? (
              <Skeleton width="5rem" />
            ) : (
              formatMoney(0)
            )}
          </Typography>
          <Typography variant="label" size="large">
            MC:{' '}
            {xSuiMarketCap ? (
              formatDollars(FixedPointMath.toNumber(xSuiMarketCap))
            ) : isLoading ? (
              <Skeleton width="5rem" />
            ) : (
              formatDollars(0)
            )}
          </Typography>
        </Box>
      </Box>
      <Box
        p="l"
        display="flex"
        borderRadius="m"
        border="1px solid"
        flexDirection="column"
        borderColor="lowContainer"
        justifyContent="space-between"
        gridColumn={['1/-1', '1/-1', 'span 2', '1/-1']}
      >
        <Box
          width="3rem"
          height="3rem"
          display="flex"
          bg="lowContainer"
          alignItems="center"
          borderRadius="full"
          justifyContent="center"
        >
          <PizzaSVG width="100%" maxWidth="2rem" maxHeight="2rem" />
        </Box>
        <Box display="flex" flexDirection="column" gap="s">
          <Typography
            size="medium"
            variant="body"
            color="outline"
            whiteSpace="nowrap"
          >
            Collateral Ratio
          </Typography>
          <Typography variant="headline" size="medium">
            {data ? (
              `${data ? computeCollateralRatio(data).toFixed(2) : 0}%`
            ) : isLoading ? (
              <Skeleton width="7.5rem" />
            ) : (
              '0%'
            )}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Indicators;
