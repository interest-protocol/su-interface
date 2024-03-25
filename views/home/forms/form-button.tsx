import { Box, Button } from '@interest-protocol/ui-kit';
import {
  useCurrentAccount,
  useSignTransactionBlock,
  useSuiClient,
} from '@mysten/dapp-kit';
import { TransactionBlock } from '@mysten/sui.js/transactions';
import { SUI_CLOCK_OBJECT_ID } from '@mysten/sui.js/utils';
import { FC, useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import toast from 'react-hot-toast';

import { OBJECT_IDS } from '@/constants';
import { useWeb3 } from '@/context/web3';
import { Type } from '@/context/web3/web3.types';
import { FixedPointMath } from '@/lib';
import {
  getCoinOfValue,
  showTXSuccessToast,
  throwTXIfNotSuccessful,
} from '@/utils';
import { requestPriceOracle } from '@/utils/oracle';

import { FormTypeEnum, SuForm } from './forms.types';

const FormButton: FC = () => {
  const { mutate, coinsMap } = useWeb3();
  const suiClient = useSuiClient();
  const wallet = useCurrentAccount();
  const { control } = useFormContext<SuForm>();
  const [loading, setLoading] = useState(false);

  const signTransactionBlock = useSignTransactionBlock();

  const form = useWatch({ control });

  const isMint = form.formType === FormTypeEnum.Mint;

  const disabled = !form.fSui?.active && !form.xSui?.active;

  const mint = async () => {
    try {
      if (!wallet?.address) throw new Error('Must connect your wallet');
      if (!form.iSui || form.iSui.value == '0')
        throw new Error('Cannot mint 0 coins');

      setLoading(true);

      const txb = new TransactionBlock();

      const amount = FixedPointMath.toBigNumber(form.iSui?.value || 0);

      const isFMint = !!form.fSui?.active;

      const base_in = getCoinOfValue({
        txb,
        coinsMap,
        coinValue: BigInt(amount.decimalPlaces(0).toString()),
        coinType: `${OBJECT_IDS.SU}::i_sui::I_SUI` as Type,
      });

      const price = requestPriceOracle(txb);

      const [coinOut, coinExtra] = txb.moveCall({
        target: `${OBJECT_IDS.SU}::vault::${
          isFMint ? 'mint_f_coin' : 'mint_x_coin'
        }`,
        arguments: [
          txb.object(OBJECT_IDS.VAULT),
          txb.object(OBJECT_IDS.TREASURY),
          txb.object(SUI_CLOCK_OBJECT_ID),
          base_in,
          price,
          txb.pure('0'),
        ],
      });

      const returnValues = [coinOut];

      if (!isFMint) returnValues.push(coinExtra);

      txb.transferObjects(returnValues, wallet.address);

      const { signature, transactionBlockBytes } =
        await signTransactionBlock.mutateAsync({
          transactionBlock: txb,
        });

      const tx = await suiClient.executeTransactionBlock({
        signature,
        transactionBlock: transactionBlockBytes,
        requestType: 'WaitForEffectsCert',
        options: { showEffects: true },
      });

      throwTXIfNotSuccessful(tx);
      showTXSuccessToast(tx);
    } finally {
      setLoading(false);
      mutate();
    }
  };

  const redeem = async () => {
    try {
      if (!wallet?.address) throw new Error('Must connect your wallet');

      const isFRedeem = !!form.fSui?.active;

      const pred = isFRedeem
        ? !form.fSui || form.fSui.value == '0'
        : !form.xSui || form.xSui.value == '0';

      if (pred) throw new Error('Cannot redeem 0 coins');

      setLoading(true);

      const txb = new TransactionBlock();

      const valueIn = isFRedeem ? form.fSui?.value : form.xSui?.value;

      const amount = FixedPointMath.toBigNumber(valueIn || 0);

      const coinIn = getCoinOfValue({
        txb,
        coinsMap,
        coinValue: BigInt(amount.decimalPlaces(0).toString()),
        coinType: `${OBJECT_IDS.SU}::${
          isFRedeem ? 'f_sui::F_SUI' : 'x_sui::X_SUI'
        }` as Type,
      });

      const price = requestPriceOracle(txb);

      const [coinOut] = txb.moveCall({
        target: `${OBJECT_IDS.SU}::vault::${
          isFRedeem ? 'redeem_f_coin' : 'redeem_x_coin'
        }`,
        arguments: [
          txb.object(OBJECT_IDS.VAULT),
          txb.object(OBJECT_IDS.TREASURY),
          txb.object(SUI_CLOCK_OBJECT_ID),
          coinIn,
          price,
          txb.pure('0'),
        ],
      });

      txb.transferObjects([coinOut], wallet.address);

      const { signature, transactionBlockBytes } =
        await signTransactionBlock.mutateAsync({
          transactionBlock: txb,
        });

      const tx = await suiClient.executeTransactionBlock({
        signature,
        transactionBlock: transactionBlockBytes,
        requestType: 'WaitForEffectsCert',
        options: { showEffects: true },
      });

      throwTXIfNotSuccessful(tx);

      showTXSuccessToast(tx);
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
        {isMint
          ? loading
            ? 'Minting'
            : 'Mint'
          : loading
            ? 'Redeeming'
            : 'Redeem'}
      </Button>
    </Box>
  );
};

export default FormButton;
