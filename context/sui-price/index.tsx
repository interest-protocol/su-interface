import { createContext, FC, PropsWithChildren, useContext } from 'react';

interface ISuiPriceContext {
  price: number;
}

interface SuiPriceProviderProps extends PropsWithChildren {
  price: number;
}

const suiPriceContext = createContext<ISuiPriceContext>({} as ISuiPriceContext);

export const SuiPriceProvider: FC<SuiPriceProviderProps> = ({
  children,
  price,
}) => {
  const { Provider } = suiPriceContext;

  return <Provider value={{ price }}>{children}</Provider>;
};

export const useSuiPrice = () => useContext(suiPriceContext);

export default suiPriceContext;
