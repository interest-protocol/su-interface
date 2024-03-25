import { Box, Button } from '@interest-protocol/ui-kit';
import {
  useCurrentAccount,
  useSignTransactionBlock,
  useSuiClient,
} from '@mysten/dapp-kit';
import { TransactionBlock } from '@mysten/sui.js/transactions';
import { SUI_CLOCK_OBJECT_ID } from '@mysten/sui.js/utils';
import { getCoinOfValue } from '@polymedia/suits';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import toast from 'react-hot-toast';

import { OBJECT_IDS } from '@/constants';
import { FixedPointMath } from '@/lib';
import { showTXSuccessToast, throwTXIfNotSuccessful } from '@/utils';
import { requestPriceOracle } from '@/utils/oracle';

import { FormTypeEnum, SuForm } from './forms.types';

const FormButton: FC = () => {
  const suiClient = useSuiClient();
  const wallet = useCurrentAccount();
  const { control } = useFormContext<SuForm>();

  const signTransactionBlock = useSignTransactionBlock();

  const form = useWatch({ control });

  const isMint = form.formType === FormTypeEnum.Mint;

  const disabled = !form.fSui?.active && !form.xSui?.active;

  const mint = async () => {
    if (!wallet?.address) throw new Error('Must connect your wallet');
    if (!form.iSui || form.iSui.value == '0')
      throw new Error('Cannot mint 0 coins');

    const txb = new TransactionBlock();

    const amount = FixedPointMath.toBigNumber(form.iSui?.value || 0);

    const isFMint = !!form.fSui?.active;

    const base_in = await getCoinOfValue(
      suiClient,
      txb,
      wallet.address,
      `${OBJECT_IDS.SU}::i_sui::I_SUI`,
      BigInt(amount.toString())
    );

    const [transactionBlock, price] = requestPriceOracle(txb);

    const [coinOut, coinExtra] = transactionBlock.moveCall({
      target: `${OBJECT_IDS.SU}::vault::${
        isFMint ? 'mint_f_coin' : 'mint_x_coin'
      }`,
      arguments: [
        transactionBlock.object(OBJECT_IDS.VAULT),
        transactionBlock.object(OBJECT_IDS.TREASURY),
        transactionBlock.object(SUI_CLOCK_OBJECT_ID),
        base_in,
        price,
        transactionBlock.pure('0'),
      ],
    });

    const returnValues = [coinOut];

    if (!isFMint) returnValues.push(coinExtra);

    transactionBlock.transferObjects(returnValues, wallet.address);

    const { signature, transactionBlockBytes } =
      await signTransactionBlock.mutateAsync({
        transactionBlock: transactionBlock,
      });

    const tx = await suiClient.executeTransactionBlock({
      signature,
      transactionBlock: transactionBlockBytes,
      requestType: 'WaitForEffectsCert',
      options: { showEffects: true },
    });

    throwTXIfNotSuccessful(tx);
    showTXSuccessToast(tx);
  };

  const redeem = async () => {};

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
        onClick={isMint ? onMint : onRedeem}
        disabled={disabled}
        variant="filled"
        bg="white"
        borderRadius="full"
      >
        {isMint ? 'Mint' : 'Redeem'}
      </Button>
    </Box>
  );
};

export default FormButton;
