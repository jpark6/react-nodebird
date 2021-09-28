import React, { useEffect } from 'react';
import Head from 'next/head';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import AppLayout from '../components/AppLayout';
import FollowerList from '../components/FollowerList';
import NicknameEditForm from '../components/NicknameEditForm';
import { RootState } from '../reducers';


export default function profile(): JSX.Element {
  const { me } = useSelector((state: RootState) => state.user);
  const router = useRouter();

  useEffect(() => {
    if(!(me && me.id)) {
      router.push('/').then(r => console.log(r));
    }
  }, [me && me.id]);

  return (
    <>
      <Head>
        <title>내 프로필 | NodeBird</title>
      </Head>
      <AppLayout>
        <NicknameEditForm />
        <FollowerList
          header="팔로잉 리스트"
          data={me?.Followings}
        />
        <FollowerList
          header="팔로워 리스트"
          data={me?.Followers}
        />
      </AppLayout>
    </>
  );
}
