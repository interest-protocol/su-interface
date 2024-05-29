import { UseCoinsResponse } from './../use-coins/use-coins.types';

export interface UseWeb3Response
  extends Pick<UseCoinsResponse, 'coinsMap' | 'coins'> {
  error: boolean;
  loading: boolean;
  mutate: () => void;
  delay: number | undefined;
  setDelay: (internal: number | undefined) => void;
}
