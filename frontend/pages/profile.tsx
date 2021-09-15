import React from 'react';
import Head from 'next/head';
import AppLayout from '../components/AppLayout';

export default function profile():JSX.Element {
  return (
    <AppLayout>
      <Head>
        <title>내 프로필 | NodeBird</title>
      </Head>
      <div>내 프로필</div>
    </AppLayout>
  );
}
