import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { Button, Form, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { addPost } from '../reducers/post';
import { RootState } from '../reducers';
import useInput from '../hooks/useInput';

export default function PostForm(): JSX.Element {
  const [text, onChangeText, setText] = useInput('');

  const { imagePaths, addPostDone } = useSelector((state: RootState)=> state.post);
  useEffect(() => {
    if (addPostDone) {
      setText('');
    }
  }, [addPostDone]);
  const dispatch = useDispatch();
  const imageInput = useRef<HTMLInputElement>(null);

  const onClickImageUpload = useCallback(() =>
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
     imageInput.current.click()
  , [imageInput.current]);

  const formStyle = useMemo(() => ({ margin: '10px 0 20px', }), []);

  const onSubmit = useCallback(() => {
    dispatch(addPost(text));
  }, [text]);
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return (
    <Form
      style={formStyle}
      encType="multipart/form-data"
      onFinish={onSubmit}
    >
      <Input.TextArea
        value={text}
        onChange={onChangeText}
        maxLength={140}
        placeholder="어떤 일이 있었나요?"
      />

      <div>
        <input type="file" hidden multiple ref={imageInput} />
        <Button onClick={onClickImageUpload}>이미지 업로드</Button>
        <Button
          type="primary"
          style={{ float: 'right' }}
          htmlType="submit"
        >
          업로드
        </Button>
      </div>
      <div>
        {imagePaths && imagePaths.map((v: any) => (
          <div key={v} style={{ display: 'inline-block' }}>
            <img src={v} alt="" style={{ width: '200px' }} />
            <Button>제거</Button>
          </div>
        ))}
      </div>
    </Form>
  );
}
