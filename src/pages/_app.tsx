import Layout from '@/components/Layout'
import { AuthProvider } from '@/context/AuthContext'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const currentPath = router.asPath;
  useEffect(() => {
    let token = localStorage.getItem('token')
    if (!token) {
      router.push('/login');
    }
    
  }, [])
  
  return <>
    <AuthProvider>
      {currentPath === '/login' || currentPath === '/register' ? (
          <Component {...pageProps} />
      ): (
          <Layout>
            <Component {...pageProps} />
          </Layout>
      )}
    </AuthProvider>
  </>
}
