import type { AppProps } from 'next/app';
import { Layout, Notification } from 'components';
import NotificationProvider from 'store/NotificationProvider';
import 'styles/globals.css';

const MyApp = ({ Component, pageProps }: AppProps) => (
  <NotificationProvider>
    <Layout>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <Component {...pageProps} />
      <Notification title='Hello' message='world' status='pending' />
    </Layout>
  </NotificationProvider>
);

export default MyApp;
