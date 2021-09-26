import React, { useCallback, useState } from 'react';
import { Avatar, Button, Card, List, Popover, Comment } from 'antd';
import { EllipsisOutlined, HeartOutlined, HeartTwoTone, MessageOutlined, RetweetOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import ButtonGroup from 'antd/lib/button/button-group';
import PostImages from './PostImages';
import { RootState } from '../reducers';
import CommentForm from './CommentForm';
import PostCardContent from './PostCardContent';

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

export default function PostCard({ post }: PostProps): JSX.Element {
  const [liked, setLiked] = useState(false);
  const onToggleLiked = useCallback(()=> {
    setLiked(prev => !prev);
  }, [liked]);
  const [commentFormOpend, setCommentFormOpend] = useState(false);
  const onToggleCommentFormOpened = useCallback(() => {
    setCommentFormOpend(prev => !prev);
  }, [commentFormOpend]);
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const id = useSelector((state: RootState) => state.user.me?.id);
  return (
    <div>
      <Card
        cover={post.Images && post.Images.length > 0 && <PostImages images={post.Images}/>}
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
          description={ <PostCardContent postData={post.content} />}
        />
      </Card>
      { commentFormOpend && (
        <div>
          <CommentForm post={post} />
          <List
            header={`${post.Comments?.length}개 의 댓글`}
            itemLayout="horizontal"
            dataSource={post.Comments}
            renderItem={(item) => (
              <li>
                <Comment
                  author={item.User.nickname}
                  avatar={<Avatar>{item.User.nickname[0].toUpperCase()}</Avatar>}
                  content={item.content}
                />
              </li>
            )}
          />
        </div>
      )}

    </div>
  );
}
