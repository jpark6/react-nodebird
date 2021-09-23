import React, { useCallback } from 'react';
import { Avatar, Button, Card } from 'antd';
import { useDispatch } from 'react-redux';
import { logoutAction } from '../reducers/user';


export default function UserProfile(): JSX.Element {
  const dispatch = useDispatch();
  const onLogout = useCallback(() => {
    dispatch(logoutAction());
  }, []);
  return (
    <Card
      actions={[
        <div key="twit">트윗<br/>0</div>,
        <div key="followings">팔로잉<br/>0</div>,
        <div key="follower">팔로워<br/>0</div>,
      ]}
    >
      <Card.Meta
        avatar={<Avatar>JP</Avatar>}
        title="bspark"
      />
      <Button onClick={onLogout}>로그아웃</Button>
    </Card>
  );
}
