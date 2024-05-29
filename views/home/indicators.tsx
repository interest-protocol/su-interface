import { Box, ProgressIndicator, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import Skeleton from 'react-loading-skeleton';

import { DSuiSVG, FSuiSVG, ISuiSVG, PizzaSVG, XSuiSVG } from '@/components/svg';
import useSuState from '@/hooks/use-su-state';
import { FixedPointMath } from '@/lib';
import { computeCollateralRatio, formatMoney, ZERO_BIG_NUMBER } from '@/utils';

const Indicators: FC = () => {
  const { data, isLoading } = useSuState();

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
          <Typography variant="headline" size="large">
            {isLoading ? (
              <Skeleton width="7.5rem" />
            ) : (
              formatMoney(
                data
                  ? FixedPointMath.toNumber(data.baseBalance ?? ZERO_BIG_NUMBER)
                  : 0,
                2
              )
            )}
          </Typography>
          <Box display="flex" alignItems="center" gap="4xl">
            <ProgressIndicator
              variant="bar"
              value={
                isLoading
                  ? 0
                  : FixedPointMath.toNumber(
                      data
                        ? data.baseBalance.div(data.baseBalanceCap).times(100)
                        : ZERO_BIG_NUMBER
                    )
              }
            />
            <Typography variant="label" size="medium" whiteSpace="nowrap">
              Max.{' '}
              {isLoading ? (
                <Skeleton width="3rem" height="0.7rem" />
              ) : (
                formatMoney(
                  FixedPointMath.toNumber(
                    data ? data.baseBalanceCap : ZERO_BIG_NUMBER
                  ),
                  2
                )
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
        <Box display="flex" flexDirection="column" gap="s">
          <Typography variant="headline" size="large">
            {isLoading ? (
              <Skeleton width="5rem" />
            ) : (
              formatMoney(
                FixedPointMath.toNumber(data ? data.dSupply : ZERO_BIG_NUMBER),
                2
              )
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
        <Box display="flex" flexDirection="column" gap="s">
          <Typography variant="headline" size="large">
            {isLoading ? (
              <Skeleton width="5rem" />
            ) : (
              formatMoney(
                FixedPointMath.toNumber(data ? data.fSupply : ZERO_BIG_NUMBER),
                2
              )
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
        <Typography variant="headline" size="large">
          {isLoading ? (
            <Skeleton width="5rem" />
          ) : (
            formatMoney(
              FixedPointMath.toNumber(data ? data.xSupply : ZERO_BIG_NUMBER),
              2
            )
          )}
        </Typography>
      </Box>
      <Box
        p="l"
        display="flex"
        borderRadius="m"
        gridColumn="1/-1"
        border="1px solid"
        flexDirection="column"
        borderColor="lowContainer"
        justifyContent="space-between"
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
          <Typography variant="headline" size="large">
            {isLoading ? (
              <Skeleton width="7.5rem" />
            ) : (
              `${data ? computeCollateralRatio(data).toFixed(2) : 0}%`
            )}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Indicators;
