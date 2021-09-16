import React, { useMemo } from 'react';
import { Menu, Input } from 'antd';
import Link from 'next/link';

export default function TopMenu(): JSX.Element {

  const searchInputStyle = useMemo(() => ({
    verticalAlign: 'middle'
  }), []);

  return (
    <Menu mode="horizontal">
      <Menu.Item>
        <Link href="/">노드버드</Link>
      </Menu.Item>
      <Menu.Item>
        <Link href="/profile">프로필</Link>
      </Menu.Item>
      <Menu.Item>
        <Input.Search
          style={ searchInputStyle }
          enterButton
        />
      </Menu.Item>
      <Menu.Item>
        <Link href="/signup">회원가입</Link>
      </Menu.Item>
    </Menu>
  );
}
