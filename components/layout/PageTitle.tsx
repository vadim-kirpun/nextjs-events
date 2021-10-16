import React, { memo, PropsWithChildren } from 'react';
import Head from 'next/head';

const PageTitle = ({ children }: PropsWithChildren<{}>) => (
  <Head>
    <title>{children}</title>
  </Head>
);

export default memo(PageTitle);
