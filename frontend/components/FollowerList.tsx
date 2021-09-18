import React, { useMemo } from 'react';
import { Button, Card, List } from 'antd';
import { StopOutlined } from '@ant-design/icons';

interface FollowerListProps {
  header: string;
  data: { nickname: string }[];
}

export default function FollowerList({ header, data }: FollowerListProps): JSX.Element {
  const listStyle = useMemo(() => ({
    marginBottom: '20px',
  }), []);

  const btnLoadMoreStyle = useMemo(() => ({
    margin: '10px 0',
    display: 'flex',
    justifyContent: 'center'
  }), []);
  return (
    <List
      header={ <div>{header}</div> }
      grid={{ gutter: 4, xs: 2, md: 3 }}
      style={ listStyle }
      loadMore={
        <div
          style={ btnLoadMoreStyle }
        >
          <Button>더 보기</Button>
        </div>
      }
      bordered
      dataSource={data}
      renderItem={ (item) => (
        <List.Item style={{ marginTop: 20 }}>
          <Card actions={[ <StopOutlined key="stop" /> ]}>
            <Card.Meta description={ item.nickname }/>
          </Card>
        </List.Item>
      )}
    />
  );
}
