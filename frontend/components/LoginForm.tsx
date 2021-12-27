import React, { useCallback, useEffect, useMemo } from 'react';
import { Button, Form, Input } from 'antd';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { logInRequestAction } from '../reducers/user';
import useInput from '../hooks/useInput';
import { RootState } from '../reducers';

export default function LoginForm(): JSX.Element {
  const dispatch = useDispatch();
  const { logInLoading, logInError } = useSelector((state: RootState) => state.user);
  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');

  useEffect(() => {
    if(logInError) {
      // eslint-disable-next-line no-alert
      alert(logInError);
    }
  }, [logInError]);
  const btnWrapperStyle = useMemo(()=>({
    marginTop: '10px',
  }), []);

  const formStyle = useMemo(()=>({
    padding: '10px',
  }), []);

  const onSubmitForm = useCallback(() => {
    dispatch(logInRequestAction({ email, password }));

  }, [email, password]);
  return (
    <Form onFinish={onSubmitForm} style={formStyle}>
      <div>
        <label htmlFor="user-email">이메일</label>
        <br />
        <Input
          name="user-email"
          type="email"
          value={email}
          onChange={onChangeEmail}
          required
        />
      </div>
      <div>
        <label htmlFor="user-password">비밀번호</label>
        <br />
        <Input
          name="user-password"
          type="password"
          value={password}
          onChange={onChangePassword}
          required
        />
      </div>
      <div style={ btnWrapperStyle }>
        <Button type="primary" htmlType="submit" loading={logInLoading}>
          로그인
        </Button>
        <Link href="/signup">
          <Button>회원가입</Button>
        </Link>
      </div>
    </Form>
  );
}
