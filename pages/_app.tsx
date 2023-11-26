import Header from '@/components/Header'
import Toast from '@/components/Toast'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return <>
    <Toast />
    <Header />
    <Component {...pageProps} />
  </>
}
