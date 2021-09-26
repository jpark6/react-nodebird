import React, { ChangeEvent, useCallback, useMemo, useState } from 'react';
import { Button, Form, Input } from 'antd';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { loginRequestAction } from '../reducers/user';
import userInput from '../hooks/userInput';
import { RootState } from '../reducers';

export default function LoginForm(): JSX.Element {
  const dispatch = useDispatch();
  const { isLoggingIn } = useSelector((state: RootState) => state.user);
  const [id, onChangeId] = userInput('');
  const [password, onChangePassword] = userInput('');

  const btnWrapperStyle = useMemo(()=>({
    marginTop: '10px',
  }), []);

  const formStyle = useMemo(()=>({
    padding: '10px',
  }), []);

  const onSubmitForm = useCallback(() => {
    console.log(id, ':', password);
    dispatch(loginRequestAction({ id, password }));

  }, [id, password]);
  return (
    <Form onFinish={onSubmitForm} style={formStyle}>
      <div>
        <label htmlFor="user-id">아이디</label>
        <br />
        <Input
          name="user-id"
          value={id}
          onChange={onChangeId}
          required
        />
      </div>
      <div>
        <label htmlFor="user-password">비밀번호</label>
        <br />
        <Input
          name="user-password"
          value={password}
          onChange={onChangePassword}
          required
        />
      </div>
      <div style={ btnWrapperStyle }>
        <Button type="primary" htmlType="submit" loading={isLoggingIn}>
          로그인
        </Button>
        <Link href="/signup">
          <Button>회원가입</Button>
        </Link>
      </div>
    </Form>
  );
}
