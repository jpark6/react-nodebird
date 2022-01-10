import React, { useCallback, useMemo } from 'react';
import { Form, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { CHANGE_NICKNAME_REQUEST } from '../reducers/user';
import useInput from '../hooks/useInput';
import { RootState } from '../reducers';

export default function NicknameEditFrom(): JSX.Element {
  const me = useSelector((state: RootState) => state.user.me);
  const [nickname, onChangeNickname] = useInput(me?.nickname || '');
  const formStyle = useMemo(() => ({
    marginBottom: '20px',
    border: '1px solid #d9d9d9',
    padding: '20px',
  }),[]);

  const dispatch = useDispatch();

  const onSubmit = useCallback(() => {
    dispatch({
      type: CHANGE_NICKNAME_REQUEST,
      data: nickname,
    })
  }, [nickname]);

  return (
    <Form style={ formStyle }>
      <Input.Search
      addonBefore="닉네임"
      enterButton="수정"
      onChange={onChangeNickname}
      onSearch={onSubmit}
      value={nickname}
      />
    </Form>
  );
}
