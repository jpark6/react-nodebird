import React, { useCallback } from 'react';
import { Avatar, Button, Card } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { logoutRequestAction } from '../reducers/user';
import { RootState } from '../reducers';


// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export default function UserProfile(): JSX.Element {
  const dispatch = useDispatch();
  const { me } = useSelector((state: RootState) => state.user);
  const { logOutLoading } = useSelector((state: RootState) => state.user);

  const onLogout = useCallback(() => {
    dispatch(logoutRequestAction());
  }, []);
  return (
    <Card
      actions={[
        <div key="twit">트윗<br/>{me?.Posts.length}</div>,
        <div key="followings">팔로잉<br/>{me?.Followings.length}</div>,
        <div key="follower">팔로워<br/>{me?.Followers.length}</div>,
      ]}
    >
      <Card.Meta
        avatar={<Avatar>{ me?.nickname[0] }</Avatar>}
        title={ me?.nickname }
      />
      <Button onClick={onLogout} loading={logOutLoading}>로그아웃</Button>
    </Card>
  );
}
