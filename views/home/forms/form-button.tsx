import { Box, Button } from '@interest-protocol/ui-kit';
import { useSignTransaction, useSuiClient } from '@mysten/dapp-kit';
import { useEnokiFlow } from '@mysten/enoki/react';
import { Transaction } from '@mysten/sui/transactions';
import { SUI_CLOCK_OBJECT_ID } from '@mysten/sui/utils';
import { FC, useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import toast from 'react-hot-toast';

import { ISUI_TYPE, OBJECT_IDS } from '@/constants';
import { useAccount } from '@/hooks/use-account';
import { useWeb3 } from '@/hooks/use-web3';
import {
  getCoinOfValue,
  getSafeValue,
  showDigestSuccessToast,
  showTXSuccessToast,
  throwTXIfNotSuccessful,
  ZERO_BIG_NUMBER,
} from '@/utils';
import { requestPriceOracle } from '@/utils/oracle';
import { Type } from '@/utils/types';

import { FormTypeEnum, SuForm } from './forms.types';
import { getActiveCoinType } from './forms.utils';

const FormButton: FC = () => {
  const { mutate, coinsMap } = useWeb3();
  const flow = useEnokiFlow();
  const suiClient = useSuiClient();
  const wallet = useAccount();
  const { control } = useFormContext<SuForm>();
  const [loading, setLoading] = useState(false);

  const { mutateAsync: signTransaction } = useSignTransaction();

  const form = useWatch({ control });

  const isMint = form.formType === FormTypeEnum.Mint;

  const hasDerivatives =
    (form.fSui?.active && Number(form.fSui?.value)) ||
    (form.xSui?.active && Number(form.xSui?.value)) ||
    (form.dSui?.active && Number(form.dSui?.value));

  const hasISui = !!Number(form.iSui?.value);

  const quoting = isMint
    ? hasISui && !hasDerivatives
    : hasDerivatives && !hasISui;

  const disabled =
    quoting ||
    (isMint ? !hasISui || !hasDerivatives : !hasDerivatives || !hasISui);

  const mint = async () => {
    try {
      const iSuiBalance = coinsMap[ISUI_TYPE]?.balance || ZERO_BIG_NUMBER;
      if (!wallet?.address) throw new Error('Must connect your wallet');
      if (iSuiBalance.isZero()) throw new Error('Please mint some iSui');
      if (!form.iSui || form.iSui.value == '0')
        throw new Error('Cannot mint 0 coins');

      setLoading(true);

      const tx = new Transaction();

      const amount = getSafeValue({
        coinValue: form.iSui?.value || '0',
        coinType: ISUI_TYPE,
        balance: iSuiBalance,
        decimals: 9,
      });
      const isFMint = !!form.fSui?.active;
      const isXMint = !!form.xSui?.active;

      const base_in = getCoinOfValue({
        tx,
        coinsMap,
        coinValue: BigInt(amount.decimalPlaces(0).toString()),
        coinType: `${OBJECT_IDS.SU}::i_sui::I_SUI` as Type,
      });

      const price = requestPriceOracle(tx);

      const [coinOut, coinExtra] = tx.moveCall({
        target: `${OBJECT_IDS.SU}::vault::${
          isFMint ? 'mint_f_coin' : isXMint ? 'mint_x_coin' : 'mint_d_coin'
        }`,
        arguments: [
          tx.object(OBJECT_IDS.VAULT),
          tx.object(OBJECT_IDS.TREASURY),
          tx.object(SUI_CLOCK_OBJECT_ID),
          base_in,
          price,
          tx.pure.u64('0'),
        ],
      });

      const returnValues = [coinOut];

      if (isXMint) returnValues.push(coinExtra);

      tx.transferObjects(returnValues, wallet.address);

      if (wallet.isEnoki) {
        const { digest } = await flow.sponsorAndExecuteTransaction({
          network: 'testnet',
          client: suiClient,
          transaction: tx,
        });

        showDigestSuccessToast(digest);

        await suiClient.waitForTransaction({
          digest,
          timeout: 10000,
          pollInterval: 500,
        });

        await mutate();
      } else {
        const { signature, bytes } = await signTransaction({
          transaction: tx,
        });

        const etx = await suiClient.executeTransactionBlock({
          signature,
          transactionBlock: bytes,
          requestType: 'WaitForEffectsCert',
          options: { showEffects: true },
        });

        throwTXIfNotSuccessful(etx);

        showTXSuccessToast(etx);

        await suiClient.waitForTransaction({
          digest: etx.digest,
          timeout: 10000,
          pollInterval: 500,
        });

        await mutate();
      }
    } finally {
      setLoading(false);
      mutate();
    }
  };

  const redeem = async () => {
    try {
      if (!wallet?.address) throw new Error('Must connect your wallet');

      const isFRedeem = !!form.fSui?.active;
      const isXRedeem = !!form.xSui?.active;

      const pred = isFRedeem
        ? !form.fSui || form.fSui.value == '0'
        : !form.xSui ||
          form.xSui.value == '0' ||
          !form.dSui ||
          form.dSui.value == '0';

      if (pred) throw new Error('Cannot redeem 0 coins');

      const coinType = getActiveCoinType({
        dSui: form.dSui,
        xSui: form.xSui,
        fSui: form.fSui,
      });

      setLoading(true);

      const tx = new Transaction();

      const valueIn = isFRedeem
        ? form.fSui?.value
        : isXRedeem
          ? form.xSui?.value
          : form.dSui?.value;

      const balance = coinsMap[coinType]?.balance || ZERO_BIG_NUMBER;

      if (balance.isZero()) throw new Error(`You need to mint ${coinType}`);

      const amount = getSafeValue({
        coinValue: valueIn || '0',
        coinType,
        balance: balance,
        decimals: 9,
      });

      const coinIn = getCoinOfValue({
        tx,
        coinsMap,
        coinValue: BigInt(amount.decimalPlaces(0).toString()),
        coinType: `${OBJECT_IDS.SU}::${
          isFRedeem
            ? 'f_sui::F_SUI'
            : isXRedeem
              ? 'x_sui::X_SUI'
              : 'sui_dollar::SUI_DOLLAR'
        }` as Type,
      });

      const price = requestPriceOracle(tx);

      const [coinOut] = tx.moveCall({
        target: `${OBJECT_IDS.SU}::vault::${
          isFRedeem
            ? 'redeem_f_coin'
            : isXRedeem
              ? 'redeem_x_coin'
              : 'redeem_d_coin'
        }`,
        arguments: [
          tx.object(OBJECT_IDS.VAULT),
          tx.object(OBJECT_IDS.TREASURY),
          tx.object(SUI_CLOCK_OBJECT_ID),
          coinIn,
          price,
          tx.pure.u64('0'),
        ],
      });

      tx.transferObjects([coinOut], wallet.address);

      if (wallet.isEnoki) {
        const { digest } = await flow.sponsorAndExecuteTransaction({
          network: 'testnet',
          client: suiClient,
          transaction: tx,
        });

        showDigestSuccessToast(digest);

        await suiClient.waitForTransaction({
          digest,
          timeout: 10000,
          pollInterval: 500,
        });

        await mutate();
      } else {
        const { signature, bytes } = await signTransaction({
          transaction: tx,
        });

        const etx = await suiClient.executeTransactionBlock({
          signature,
          transactionBlock: bytes,
          requestType: 'WaitForEffectsCert',
          options: { showEffects: true },
        });

        throwTXIfNotSuccessful(etx);

        showTXSuccessToast(etx);
      }
    } finally {
      mutate();
      setLoading(false);
    }
  };

  const onMint = () =>
    toast.promise(mint(), {
      loading: 'Minting...',
      success: 'Minted successfully',
      error: 'Fail on Mint',
    });

  const onRedeem = () =>
    toast.promise(redeem(), {
      loading: 'Redeeming...',
      success: 'Redeem successfully',
      error: 'Fail on redeem',
    });

  return (
    <Box display="flex" justifyContent="center">
      <Button
        bg="white"
        variant="filled"
        borderRadius="full"
        disabled={disabled || loading}
        onClick={isMint ? onMint : onRedeem}
      >
        {quoting
          ? 'Quoting...'
          : isMint
            ? loading
              ? 'Minting...'
              : 'Mint'
            : loading
              ? 'Redeeming...'
              : 'Redeem'}
      </Button>
    </Box>
  );
};

export default FormButton;
