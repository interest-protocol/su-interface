import { Button } from '@interest-protocol/ui-kit';
import {
  useCurrentAccount,
  useSignTransactionBlock,
  useSuiClient,
} from '@mysten/dapp-kit';
import { TransactionBlock } from '@mysten/sui.js/transactions';
import { FC, useState } from 'react';

import { OBJECT_IDS } from '@/constants';
import { FixedPointMath } from '@/lib';

import { ISuiSVG } from '../svg';

const Mint: FC = () => {
  const suiClient = useSuiClient();
  const wallet = useCurrentAccount();
  const [isLoading, setLoading] = useState(false);
  const signTransactionBlock = useSignTransactionBlock();
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

      console.log(tx);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Button
      p="xs"
      onClick={mint}
      variant="tonal"
      color="onSurface"
      borderRadius="full"
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
