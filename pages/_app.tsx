import type { AppProps } from 'next/app';
import { NotificationProvider } from 'store';
import { Layout } from 'components';
import 'styles/globals.css';

const MyApp = ({ Component, pageProps }: AppProps) => (
  <NotificationProvider>
    <Layout>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <Component {...pageProps} />
    </Layout>
  </NotificationProvider>
);

export default MyApp;
