import { Button, Form, Input } from 'antd';
import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import userInput from '../hooks/userInput';
import { RootState } from '../reducers';

interface PostProps {
  post: {
    id: number;
    User: {
      id: number;
      nickname: string;
    };
    content: string;
    Images?: {src: string}[];
    Comments?: {
      User: {
        nickname: string;
      };
      content: string;
    }[];
  }
}
export default function CommentForm({ post }: PostProps): JSX.Element {
  const id = useSelector((state: RootState) => state.user.me?.id);
  const [commentText, onChangeCommentText] = userInput('');

  const onSubmitComment = useCallback(() => {
    console.log(post.id, '::', commentText);
  }, [commentText]);
  return (
    <Form onFinish={onSubmitComment}>
      <Form.Item>
        <Input.TextArea
          value={commentText}
          onChange={onChangeCommentText}
        />
        <Button type="primary" htmlType="submit">댓글 작성</Button>
      </Form.Item>
    </Form>
  );
}
