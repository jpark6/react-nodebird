import React, { useState } from 'react';
import { Row, Col } from 'antd';
import LoginForm from './LoginForm';
import UserProfile from './UserProfile';
import TopMenu from './TopMenu';

interface AppLayoutProps {
  children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps): JSX.Element {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <div>
      <TopMenu />
      <Row gutter={8}>
        <Col xs={24} md={6}>
          { isLoggedIn ? <UserProfile  setIsLoggedIn={setIsLoggedIn} /> : <LoginForm setIsLoggedIn={setIsLoggedIn} /> }
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
