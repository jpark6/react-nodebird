import React, { useMemo } from 'react';
import { Menu, Input } from 'antd';
import Link from 'next/link';

export default function TopMenu(): JSX.Element {

  const searchInputStyle = useMemo(() => ({
    verticalAlign: 'middle'
  }), []);

  return (
    <Menu mode="horizontal">
      <Menu.Item key="home">
        <Link href="/">노드버드</Link>
      </Menu.Item>
      <Menu.Item key="profile">
        <Link href="/profile">프로필</Link>
      </Menu.Item>
      <Menu.Item key="search">
        <Input.Search
          style={ searchInputStyle }
          enterButton
        />
      </Menu.Item>
      <Menu.Item key="signup">
        <Link href="/signup">회원가입</Link>
      </Menu.Item>
    </Menu>
  );
}
