import { Button } from '@interest-protocol/ui-kit';
import { useSignTransaction, useSuiClient } from '@mysten/dapp-kit';
import { Transaction } from '@mysten/sui/transactions';
import { FC, useState } from 'react';
import toast from 'react-hot-toast';

import { OBJECT_IDS } from '@/constants';
import { useAccount } from '@/hooks/use-account';
import { useWeb3 } from '@/hooks/use-web3';
import { FixedPointMath } from '@/lib';
import { showTXSuccessToast, throwTXIfNotSuccessful } from '@/utils';

import { ISuiSVG } from '../svg';

const Mint: FC = () => {
  const suiClient = useSuiClient();
  const { address } = useAccount();
  const [isLoading, setLoading] = useState(false);
  const signTransaction = useSignTransaction();
  const { mutate } = useWeb3();

  const mint = async () => {
    try {
      if (!address) throw new Error('Must connect your wallet');
      setLoading(true);

      const tx = new Transaction();

      const coin = tx.moveCall({
        target: `${OBJECT_IDS.SU}::i_sui::mint`,
        arguments: [
          tx.object(OBJECT_IDS.I_SUI_TREASURY),
          tx.pure.u64(FixedPointMath.toBigNumber(5).toString()),
        ],
      });

      tx.transferObjects([coin], address);

      const { signature, bytes } = await signTransaction.mutateAsync({
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

  if (!address) return null;

  return (
    <Button
      p="xs"
      variant="tonal"
      onClick={onMint}
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
