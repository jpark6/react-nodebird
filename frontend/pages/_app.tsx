import React from 'react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import 'antd/dist/antd.css';
import wrapper from '../store/configureStore';

const App = ({ Component, pageProps }: AppProps): JSX.Element  =>{
  return (
    <>
      <Head>
        <title>NodeBird</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
};

export default wrapper.withRedux(App);
