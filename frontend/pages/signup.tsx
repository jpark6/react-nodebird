import React, { ChangeEvent, useCallback, useState, useMemo, useEffect } from 'react';
import Head from 'next/head';
import { Form, Input, Checkbox, Button } from 'antd';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { useDispatch, useSelector } from 'react-redux';
import AppLayout from '../components/AppLayout';
import useInput from '../hooks/useInput';
import { RootState } from '../reducers';
import { SIGN_UP_REQUEST } from '../reducers/user';
import { useRouter } from 'next/router';

export default function Signup(): JSX.Element {
  const [email, onChangeEmail] = useInput('');
  const [nickname, onChangeNickname] = useInput('');
  const [password, onChangePassword] = useInput('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [term, setTerm] = useState(false);
  const [termError, setTermError] = useState(false);

  const dispatch = useDispatch();
  const router = useRouter();
  const { signUpLoading, signUpDone, signUpError } = useSelector((state: RootState) =>state.user);

  useEffect(() => {
    if(signUpDone) {
      alert('회원가입에 성공했습니다.');

      router.push('/').then(r => console.log('route: ', r));
    }
  }, [signUpDone]);

  useEffect(() => {
    if(signUpError) {
      alert(signUpError);
    }
  }, [signUpError]);

  const onChangePasswordCheck = useCallback((e: ChangeEvent<HTMLInputElement>) => {

    const passwordCheckValue = e.target.value;
    setPasswordCheck(passwordCheckValue);
    setPasswordError(passwordCheckValue !== password);
  }, [passwordCheck]);

  const onSubmit = useCallback(() => {
    if(password !== passwordCheck) {
      setPasswordError(true);
      return;
    }
    if(!term) {
      setTermError(true);
      return;
    }

    dispatch({
      type: SIGN_UP_REQUEST,
      data: { email, password, nickname }
    });
  }, [password, passwordCheck, term]);

  const errorDivStyle = useMemo(()=>({ color: 'red', }), []);
  const btnWrapperStyle = useMemo(()=>({ color: 'red', }), []);

  const onChangeTerm = useCallback((e: CheckboxChangeEvent) => {
    const termChecked = e.target.checked;
    setTerm(termChecked);
    setTermError(!termChecked);
  }, [term]);

  return (
    <>
      <Head>
        <title>회원가입 | NodeBird</title>
      </Head>
      <AppLayout>
        <div>회원가입 페이지</div>
        <Form onFinish={onSubmit}>
          <div>
            <label htmlFor="user-email">이메일</label>
            <br />
            <Input
              name="user-email"
              type="email"
              value={email}
              required
              onChange={onChangeEmail}
            />
          </div>
          <div>
            <label htmlFor="user-nickname">닉네임</label>
            <br />
            <Input
              name="user-nickname"
              value={nickname}
              required
              onChange={onChangeNickname}
            />
          </div>
          <div>
            <label htmlFor="user-password">비밀번호</label>
            <br />
            <Input
              type="password"
              name="user-password"
              value={password}
              required
              onChange={onChangePassword}
            />
          </div>
          <div>
            <label htmlFor="user-password-check">비밀번호 체크</label>
            <br />
            <Input
              type="password"
              name="user-password-check"
              value={passwordCheck}
              required
              onChange={onChangePasswordCheck}
            />
          </div>
          { passwordError && <div style={errorDivStyle}>비밀번호가 일치하지 않습니다.</div>}
          <div>
            <Checkbox
              name="user-term"
              checked={term}
              onChange={onChangeTerm}
            >
              약관에 동의합니다.
            </Checkbox>
            { termError && <div style={errorDivStyle}>약관에 동의하셔야 합니다.</div>}
          </div>
          <div style={btnWrapperStyle}>
            <Button
              type="primary"
              htmlType="submit"
              loading={signUpLoading}
            >
              가입하기
            </Button>
          </div>
        </Form>
      </AppLayout>
    </>
  );
}
