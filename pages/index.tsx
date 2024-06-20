import type { InferGetStaticPropsType } from 'next';
import { GetStaticProps } from 'next';
import { pathOr } from 'ramda';

import Layout from '@/components/layout';
import { SUI_CMC_ID } from '@/constants';
import { SuiPriceProvider } from '@/context/sui-price';
import Home from '@/views/home';

const HomePage = ({
  suiPrice,
}: InferGetStaticPropsType<typeof getStaticProps>) => (
  <Layout>
    <SuiPriceProvider price={suiPrice}>
      <Home />
    </SuiPriceProvider>
  </Layout>
);

export default HomePage;

export const getStaticProps = (async () => {
  const res = await fetch('https://www.suprotocol.com/api/v1/sui-price', {
    method: 'GET',
  });
  const rawData = await res.json();
  const suiPrice: number = pathOr(
    0,
    [SUI_CMC_ID, 'quote', 'USD', 'price'],
    rawData
  );
  return { props: { suiPrice } };
}) satisfies GetStaticProps<{
  suiPrice: number;
}>;
