import { Box, Button } from '@interest-protocol/ui-kit';
import {
  useCurrentAccount,
  useSignTransactionBlock,
  useSuiClient,
} from '@mysten/dapp-kit';
import { TransactionBlock } from '@mysten/sui.js/transactions';
import { SUI_CLOCK_OBJECT_ID } from '@mysten/sui.js/utils';
import { getCoinOfValue } from '@polymedia/suits';
import { FC, useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { OBJECT_IDS } from '@/constants';
import { FixedPointMath } from '@/lib';
import { requestPriceOracle } from '@/utils/oracle';

import { FormTypeEnum, SuForm } from './forms.types';

const FormButton: FC = () => {
  const { control } = useFormContext<SuForm>();
  const suiClient = useSuiClient();
  const wallet = useCurrentAccount();
  const [isLoading, setLoading] = useState(false);
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

      console.log(tx);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const redeem = async () => {};

  return (
    <Box display="flex" justifyContent="center">
      <Button
        onClick={isMint ? mint : redeem}
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
