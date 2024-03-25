import { useSuiClient } from '@mysten/dapp-kit';
import { SuiObjectResponse } from '@mysten/sui.js/client';
import { TransactionBlock } from '@mysten/sui.js/transactions';
import {
  devInspectAndGetReturnValues,
  getSuiObjectResponseFields,
} from '@polymedia/suits';
import BigNumber from 'bignumber.js';
import { path, pathOr, propOr } from 'ramda';
import useSWR from 'swr';

import { OBJECT_IDS, SU_STATE_V1_DYNAMIC_FIELD_NAME } from '@/constants';
import useSuiPrice from '@/hooks/use-sui-price';
import { TreasuryState } from '@/interface';

interface ParseDataArgs {
  treasuryState: SuiObjectResponse;
  treasuryCaps: SuiObjectResponse[];
  xNav: string;
  fNav: string;
}

const parseData = ({
  treasuryState,
  treasuryCaps,
  fNav,
  xNav,
}: ParseDataArgs): TreasuryState => {
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
    xSupply: BigNumber(
      pathOr(
        '0',
        ['data', 'content', 'fields', 'total_supply', 'fields', 'value'],
        treasuryCaps[1]
      )
    ),
    fNav: BigNumber(fNav),
    xNav: BigNumber(xNav),
  };
};

const useSuState = () => {
  const suiClient = useSuiClient();

  const suiUSDPrice = useSuiPrice();

  return useSWR(
    useSuState.name + suiUSDPrice.data?.toString(),
    async () => {
      const fetchTreasuryStatePromise = suiClient.getDynamicFieldObject({
        parentId: OBJECT_IDS.SU_STATE_VERSIONED_ID,
        name: SU_STATE_V1_DYNAMIC_FIELD_NAME,
      });

      const fetchTreasuryCapsPromise = suiClient.multiGetObjects({
        ids: [OBJECT_IDS.F_SUI_TREASURY_CAP, OBJECT_IDS.X_SUI_TREASURY_CAP],
        options: {
          showContent: true,
        },
      });

      const fNavTXB = new TransactionBlock();

      fNavTXB.moveCall({
        target: `${OBJECT_IDS.SU}::vault::f_nav`,
        arguments: [
          fNavTXB.object(OBJECT_IDS.VAULT),
          fNavTXB.object(OBJECT_IDS.TREASURY),
        ],
      });

      const xNavTXB = new TransactionBlock();

      xNavTXB.moveCall({
        target: `${OBJECT_IDS.SU}::vault::x_nav`,
        arguments: [
          xNavTXB.object(OBJECT_IDS.VAULT),
          xNavTXB.object(OBJECT_IDS.TREASURY),
        ],
      });

      const fNavPromise = devInspectAndGetReturnValues(suiClient, fNavTXB);
      const xNavPromise = devInspectAndGetReturnValues(suiClient, xNavTXB);

      const [treasuryState, treasuryCaps, [fNav], [xNav]] = await Promise.all([
        fetchTreasuryStatePromise,
        fetchTreasuryCapsPromise,
        fNavPromise,
        xNavPromise,
      ]);

      const treasuryStateFields = getSuiObjectResponseFields(treasuryState);

      return parseData({
        treasuryState: treasuryStateFields,
        treasuryCaps,
        fNav: fNav as unknown as string,
        xNav: xNav as unknown as string,
      });
    },
    {
      refreshInterval: 60000,
    }
  );
};

export default useSuState;
