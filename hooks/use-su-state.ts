import { useSuiClient } from '@mysten/dapp-kit';
import { bcs } from '@mysten/sui/bcs';
import { SuiObjectResponse } from '@mysten/sui/client';
import { Transaction } from '@mysten/sui/transactions';
import {
  devInspectAndGetResults,
  getSuiObjectResponseFields,
} from '@polymedia/suitcase-core';
import BigNumber from 'bignumber.js';
import { path, pathOr, propOr } from 'ramda';
import useSWR from 'swr';

import { OBJECT_IDS } from '@/constants';
import { useSuiPrice } from '@/context/sui-price';
import { SuState } from '@/interface';
import { FixedPointMath } from '@/lib';

interface ParseDataArgs {
  treasuryState: SuiObjectResponse;
  treasuryCaps: SuiObjectResponse[];
  xNav: string;
  fNav: string;
  vaultState: SuiObjectResponse;
}

const parseData = ({
  treasuryState,
  treasuryCaps,
  vaultState,
  fNav,
  xNav,
}: ParseDataArgs): SuState => {
  const fields = path(['value', 'fields'], treasuryState);
  return {
    adminBalance: BigNumber(propOr('0', 'admin_balance', fields)),
    baseBalance: BigNumber(propOr('0', 'base_balance', fields)),
    baseBalanceCap: BigNumber(propOr('0', 'base_balance_cap', fields)),
    bonusRate: BigNumber(propOr('0', 'bonus_rate', fields)),
    ema: {
      lastEMAValue: BigNumber(
        pathOr('0', ['ema', 'fields', 'last_ema_value'], fields)
      ),
      lastTimestamp: BigNumber(
        pathOr('0', ['ema', 'fields', 'last_timestamp'], fields)
      ),
      lastValue: BigNumber(
        pathOr('0', ['ema', 'fields', 'last_value'], fields)
      ),
      sampleInterface: BigNumber(
        pathOr('0', ['ema', 'fields', 'sample_interval'], fields)
      ),
    },
    fees: {
      rebalance: BigNumber(pathOr('0', ['fees', 'fields', 'reserve'], fields)),
      reserve: BigNumber(pathOr('0', ['fees', 'fields', 'rebalance'], fields)),
    },
    genesisPrice: BigNumber(propOr('0', 'genesis_price', fields)),
    lastFNav: BigNumber(propOr('0', 'last_f_nav', fields)),
    rebalanceBalance: BigNumber(propOr('0', 'rebalance_balance', fields)),
    reserveBalance: BigNumber(propOr('0', 'reserve_balance', fields)),
    fSupply: BigNumber(
      pathOr(
        '0',
        ['data', 'content', 'fields', 'total_supply', 'fields', 'value'],
        treasuryCaps[0]
      )
    ),
    dSupply: BigNumber(
      pathOr(
        '0',
        ['data', 'content', 'fields', 'total_supply', 'fields', 'value'],
        treasuryCaps[2]
      )
    ),
    xSupply: BigNumber(
      pathOr(
        '0',
        ['data', 'content', 'fields', 'total_supply', 'fields', 'value'],
        treasuryCaps[1]
      )
    ),
    fNav: BigNumber(fNav),
    xNav: BigNumber(xNav),
    dNav: BigNumber(1_000_000_000),
    rebalanceCollateralRatio: BigNumber(
      propOr('0', 'rebalance_collateral_ratio', vaultState)
    ),
    stabilityCollateralRatio: BigNumber(
      propOr('0', 'stability_collateral_ratio', vaultState)
    ),
  };
};

const useSuState = () => {
  const suiClient = useSuiClient();

  const suiUSDPrice = useSuiPrice();

  return useSWR(
    useSuState.name + suiUSDPrice.price?.toString(),
    async () => {
      const price = suiUSDPrice.price?.toString();

      if (!price) throw new Error('Sui price not found');

      const priceBn = FixedPointMath.toBigNumber(price);

      const fetchTreasuryStatePromise = suiClient.multiGetObjects({
        ids: [OBJECT_IDS.SU_STATE, OBJECT_IDS.VAULT],
        options: {
          showContent: true,
        },
      });

      const fetchTreasuryCapsPromise = suiClient.multiGetObjects({
        ids: [
          OBJECT_IDS.F_SUI_TREASURY_CAP,
          OBJECT_IDS.X_SUI_TREASURY_CAP,
          OBJECT_IDS.D_SUI_TREASURY_CAP,
        ],
        options: {
          showContent: true,
        },
      });

      const fNavTX = new Transaction();

      fNavTX.moveCall({
        target: `${OBJECT_IDS.SU}::quote::f_nav`,
        arguments: [
          fNavTX.object(OBJECT_IDS.TREASURY),
          fNavTX.pure.u64(priceBn.toString()),
        ],
      });

      const xNavTX = new Transaction();

      xNavTX.moveCall({
        target: `${OBJECT_IDS.SU}::quote::x_nav`,
        arguments: [
          xNavTX.object(OBJECT_IDS.TREASURY),
          xNavTX.pure.u64(priceBn.toString()),
        ],
      });

      const fNavPromise = devInspectAndGetResults(suiClient as never, fNavTX);

      const xNavPromise = devInspectAndGetResults(suiClient as never, xNavTX);

      const [treasuryState, treasuryCaps, [fNav], [xNav]] = await Promise.all([
        fetchTreasuryStatePromise,
        fetchTreasuryCapsPromise,
        fNavPromise,
        xNavPromise,
      ]);

      const treasuryStateFields = getSuiObjectResponseFields(treasuryState[0]);
      const vaultStateFields = getSuiObjectResponseFields(treasuryState[1]);

      return parseData({
        treasuryState: treasuryStateFields,
        treasuryCaps,
        fNav: bcs.U64.parse(new Uint8Array(fNav!.returnValues![0][0])),
        xNav: bcs.U64.parse(new Uint8Array(xNav!.returnValues![0][0])),
        vaultState: vaultStateFields,
      });
    },
    {
      refreshInterval: 60000,
    }
  );
};

export default useSuState;
