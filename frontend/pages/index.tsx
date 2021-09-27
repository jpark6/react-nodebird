import React from 'react';
import { useSelector } from 'react-redux';
import AppLayout from '../components/AppLayout';
import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';
import { RootState } from '../reducers';
import { PostState } from '../reducers/post';


export default function Index(): JSX.Element {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const { me } = useSelector((state: RootState) => state.user);

  const mainPosts: PostState[] = useSelector((state: RootState) => state.post.mainPosts);
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return (
    <AppLayout>
      { me && <PostForm /> }
      { mainPosts.map((post) => (<PostCard  key={post.id} post={post} />))}
    </AppLayout>
  );
}
