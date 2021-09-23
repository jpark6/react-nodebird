import React from 'react';
import { useSelector } from 'react-redux';
import AppLayout from '../components/AppLayout';
import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';

export default function Index(): JSX.Element {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const { isLoggedIn } = useSelector((state) => state.user);

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const { mainPosts } = useSelector((state) => state.post);

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return (
    <AppLayout>
      { isLoggedIn && <PostForm /> }
      { mainPosts.map((post: { id: React.Key | null | undefined; }) => (<PostCard  key={post.id} post={post} />))}
    </AppLayout>
  );
}
