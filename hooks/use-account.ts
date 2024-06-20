import { useCurrentAccount } from '@mysten/dapp-kit';

export const useAccount = () => {
  const currentAccount = useCurrentAccount();

  const address = currentAccount?.address;

  return {
    address: address ?? null,
    isEnoki: false,
  };
};
