import React, { ChangeEvent, useCallback, useMemo, useState } from 'react';
import { Button, Form, Input } from 'antd';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { loginAction } from '../reducers/user';

export default function LoginForm(): JSX.Element {
  const dispatch = useDispatch();

  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  const btnWrapperStyle = useMemo(()=>({
    marginTop: '10px',
  }), []);

  const formStyle = useMemo(()=>({
    padding: '10px',
  }), []);

  const onChangeId = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setId(e.target.value);
  }, [id]);

  const onChangePassword = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  }, [password]);

  const onSubmitForm = useCallback(() => {
    console.log(id, ':', password);
    dispatch(loginAction({ id, password }));

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
        <Button type="primary" htmlType="submit" loading={false}>
          로그인
        </Button>
        <Link href="/signup">
          <Button>회원가입</Button>
        </Link>
      </div>
    </Form>
  );
}
