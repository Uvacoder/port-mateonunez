import { useUI } from 'components/ui/UIContext';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import nProgress from 'nprogress';

export default function MainLayout({ children }) {
  const { loading, setLoading } = useUI();
  const router = useRouter();

  useEffect(() => {
    const handleStart = url => {
      console.log(`Loading: ${url}`);
      nProgress.start();
      setLoading(true);
    };
    const handleStop = () => {
      nProgress.done();
      setLoading(false);
    };

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleStop);
    router.events.on('routeChangeError', handleStop);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleStop);
      router.events.off('routeChangeError', handleStop);
    };
  }, [router]);

  return (
    <>
      {loading && <div className="loading-overlay" />}

      {/* Main  */}
      <main>{children}</main>
    </>
  );
}
