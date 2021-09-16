import React from 'react';
import Head from 'next/head';
import AppLayout from '../components/AppLayout';
import FollowerList from '../components/FollowerList';
import NicknameEditForm from '../components/NicknameEditForm';


export default function profile(): JSX.Element {
  const followerList = [{ nickname: 'jake' }, { nickname: 'google' }, { nickname: 'apple' }];
  const followingList = [{ nickname: 'maria' }, { nickname: 'postgres' }, { nickname: 'mongo' }];
  return (
    <>
      <Head>
        <title>내 프로필 | NodeBird</title>
      </Head>
      <AppLayout>
        <NicknameEditForm />
        <FollowerList
          header="팔로잉 리스트"
          data={followingList}
        />
        <FollowerList
          header="팔로워 리스트"
          data={followerList}
        />
      </AppLayout>
    </>
  );
}
