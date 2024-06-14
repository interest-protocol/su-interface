import { useEnokiFlow } from '@mysten/enoki/react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import Layout from '@/components/layout';

const EnokiLoadingPage: NextPage = () => {
  const flow = useEnokiFlow();
  const router = useRouter();

  useEffect(() => {
    if (window.location.hash)
      flow.handleAuthCallback().then(() => {
        router.push('/');
      });
  }, []);

  return (
    <Layout>
      <div>loading</div>
    </Layout>
  );
};

export default EnokiLoadingPage;
