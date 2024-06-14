import { useCurrentAccount } from '@mysten/dapp-kit';
import { useZkLogin } from '@mysten/enoki/react';

export const useAccount = () => {
  const currentAccount = useCurrentAccount();
  const zklogin = useZkLogin();
  const address = currentAccount?.address || zklogin.address;

  return {
    address: address ?? null,
    isEnoki: !!zklogin.address,
  };
};
