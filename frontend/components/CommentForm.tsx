import { Button, Form, Input } from 'antd';
import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useInput from '../hooks/useInput';
import { RootState } from '../reducers';
import { ADD_COMMENT_REQUEST } from '../reducers/post';

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
  const { addCommentDone } = useSelector((state: RootState) => state.post);
  const [commentText, onChangeCommentText, setCommentText] = useInput('');

  const dispatch = useDispatch();

  useEffect(() => {
    if (addCommentDone) {
      setCommentText('');
    }
  }, [addCommentDone]);

  const onSubmitComment = useCallback(() => {
    dispatch({
      type: ADD_COMMENT_REQUEST,
      data: { content: commentText, postId: post.id, userId: id },
    });
  }, [commentText, id]);
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
