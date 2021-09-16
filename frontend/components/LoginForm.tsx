import React, { ChangeEvent, useCallback, useMemo, useState } from 'react';
import { Button, Form, Input } from 'antd';
import Link from 'next/link';
import styled from '@emotion/styled';

const ButtonWrapper = styled.div`
  margin-top: 10px;
`;

interface LoginFormProps {
  setIsLoggedIn: (login:boolean)=>void;
}

export default function LoginForm({ setIsLoggedIn }: LoginFormProps): JSX.Element {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  const formStyle = useMemo(()=>({padding: 10}), []);

  const onChangeId = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setId(e.target.value);
  }, []);

  const onChangePassword = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  }, []);

  const onSubmitForm = useCallback(() => {
    console.log(id, ':', password);
    setIsLoggedIn(true);

  }, []);
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
      <ButtonWrapper>
        <Button type="primary" htmlType="submit" loading={false}>
          로그인
        </Button>
        <Link href="/signup">
          <Button>회원가입</Button>
        </Link>
      </ButtonWrapper>
    </Form>
  );
}
