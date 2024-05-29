import { Button } from '@interest-protocol/ui-kit';
import {
  useCurrentAccount,
  useSignTransactionBlock,
  useSuiClient,
} from '@mysten/dapp-kit';
import { TransactionBlock } from '@mysten/sui.js/transactions';
import { FC, useState } from 'react';
import toast from 'react-hot-toast';

import { OBJECT_IDS } from '@/constants';
import { useWeb3 } from '@/hooks/use-web3';
import { FixedPointMath } from '@/lib';
import { showTXSuccessToast, throwTXIfNotSuccessful } from '@/utils';

import { ISuiSVG } from '../svg';

const Mint: FC = () => {
  const suiClient = useSuiClient();
  const wallet = useCurrentAccount();
  const [isLoading, setLoading] = useState(false);
  const signTransactionBlock = useSignTransactionBlock();
  const { mutate } = useWeb3();

  const mint = async () => {
    try {
      if (!wallet?.address) throw new Error('Must connect your wallet');
      setLoading(true);

      const txb = new TransactionBlock();

      const [coin] = txb.moveCall({
        target: `${OBJECT_IDS.SU}::i_sui::mint`,
        arguments: [
          txb.object(OBJECT_IDS.I_SUI_TREASURY),
          txb.pure(FixedPointMath.toBigNumber(5).toString()),
        ],
      });

      txb.transferObjects([coin], wallet.address);

      const { signature, transactionBlockBytes } =
        await signTransactionBlock.mutateAsync({ transactionBlock: txb });

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
      success: 'iSui minted!',
      error: 'Error on mint iSui!',
    });

  return (
    <Button
      p="xs"
      onClick={onMint}
      variant="tonal"
      color="onSurface"
      borderRadius="full"
      disabled={isLoading}
      pl={['l', 'l', 'l', 'l', 'l']}
      SuffixIcon={
        <ISuiSVG maxHeight="1.5rem" maxWidth="1.5rem" width="100%" rounded />
      }
    >
      {isLoading ? 'Minting...' : 'Mint iSUI'}
    </Button>
  );
};

export default Mint;
