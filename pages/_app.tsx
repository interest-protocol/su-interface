import { Analytics } from '@vercel/analytics/react';
import type { AppProps } from 'next/app';
import dynamic from 'next/dynamic';

const Provider = dynamic(() => import('@/components/provider'), {
  ssr: false,
});

const App = ({ Component, pageProps }: AppProps) => (
  <Provider>
    <Component {...pageProps} />
    <Analytics />
  </Provider>
);

export default App;
