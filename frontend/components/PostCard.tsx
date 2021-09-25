import React, { useCallback, useState } from 'react';
import { Avatar, Button, Card, Popover } from 'antd';
import { EllipsisOutlined, HeartOutlined, HeartTwoTone, MessageOutlined, RetweetOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import PostImages from './PostImages';
import { RootState } from '../reducers';
import ButtonGroup from 'antd/lib/button/button-group';

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
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function PostCard({ post }: PostProps): JSX.Element {
  const [liked, setLiked] = useState(false);
  const onToggleLiked = useCallback(()=> {
    setLiked(prev => !prev);
  }, [liked]);
  const [commentFormOpend, setCommentFormOpend] = useState(false);
  const onToggleCommentFormOpened = useCallback(() => {
    setCommentFormOpend(prev => !prev);
  }, [commentFormOpend]);
  const id = useSelector((state: RootState) => state.user.me?.id);
  return (
    <div>
      <Card
        cover={post.Images && <PostImages images={post.Images}/>}
        actions={[
          <RetweetOutlined key="retweet"/>,
            liked
            ? <HeartTwoTone key="heart_yes" twoToneColor="#eb2f96" onClick={onToggleLiked} />
            : <HeartOutlined key="heart_no" style={{ color: 'rgba(0, 0, 0, 0.45)' }} onClick={onToggleLiked} />
          ,
          <MessageOutlined key="comment" onClick={onToggleCommentFormOpened} />,
          <Popover
            key="more"
            content={(
              <ButtonGroup>
                {id && id === post.User.id ? (
                  <>
                    <Button>수정</Button>
                    <Button>삭제</Button>
                  </>
                ) : (
                  <Button>신고</Button>
                )}
              </ButtonGroup>
            )}
          >
            <EllipsisOutlined/>
          </Popover>,
        ]}
      >
        <Card.Meta
          avatar={<Avatar>{post.User.nickname[0].toUpperCase()}</Avatar>}
          title={post.User.nickname}
          description={post.content}
        />
      </Card>
      { commentFormOpend && (
        <div>
          댓글 부
        </div>
      )}

    </div>
  );
}
