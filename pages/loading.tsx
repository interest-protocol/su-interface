import { Box, ProgressIndicator } from '@interest-protocol/ui-kit';
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
      <Box
        height="100%"
        display="flex"
        gridColumn="1/-1"
        alignItems="center"
        justifyContent="center"
      >
        <ProgressIndicator size={56} variant="loading" />
      </Box>
    </Layout>
  );
};

export default EnokiLoadingPage;
