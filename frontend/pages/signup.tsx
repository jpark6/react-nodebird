import React from 'react';
import Head from 'next/head';
import AppLayout from '../components/AppLayout';

export default function Signup(): JSX.Element {
  return (
    <AppLayout>
      <Head>
        <title>회원가입 | NodeBird</title>
      </Head>
      <div>회원가입 페이지</div>

    </AppLayout>
  );
}
