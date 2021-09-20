import React from 'react';
import { useSelector } from 'react-redux';
import { Row, Col } from 'antd';
import LoginForm from './LoginForm';
import UserProfile from './UserProfile';
import TopMenu from './TopMenu';

interface AppLayoutProps {
  children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps): JSX.Element {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  return (
    <div>
      <TopMenu />
      <Row gutter={8}>
        <Col xs={24} md={6}>
          { isLoggedIn ? <UserProfile /> : <LoginForm /> }
        </Col>
        <Col xs={24} md={12}>
          {children}
        </Col>
        <Col xs={24} md={6}>
          Right
        </Col>
      </Row>
    </div>
  );
}
