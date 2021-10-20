import type { AppProps } from 'next/app';
import { Layout } from 'components';
import 'styles/globals.css';

const MyApp = ({ Component, pageProps }: AppProps) => (
  <Layout>
    {/* eslint-disable-next-line react/jsx-props-no-spreading */}
    <Component {...pageProps} />
  </Layout>
);

export default MyApp;
