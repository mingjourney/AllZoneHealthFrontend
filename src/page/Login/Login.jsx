import React, { useState } from 'react';
import { Tabs } from 'antd';
import { MobileOutlined, MailOutlined } from '@ant-design/icons';
import './login.css';
import LoginForm from './LoginForm';

export default function Login(props) {
  const [loginMethod, setLoginMethod] = useState('mobile'); //  手机号 / 邮箱

  const handleLoginMethodChange = (value) => {
    setLoginMethod(value);
  }

  //登录提交

const tabItems = [
  {
    key: 'mobile',
    icon: <MobileOutlined />,
    title: '手机号登录',
    content: (
      <LoginForm
        loginMethod="mobile"
        history={props.history}
      />
    ),
  },
  {
    key: 'email',
    icon: <MailOutlined />,
    title: '邮箱登录',
    content: (
      <LoginForm
      loginMethod="email"
      history={props.history}
      />
    ),
  },
];

  return (
    <div className="div">
      <div className="loginContainer">
        <div className="top-line">
          <span className="icon icon--circle">
            <img src="../../../image/veg-logo.svg" alt="Veg Logo" width="35" height="35" />
          </span>
          <span className="hello-word">你好</span>
        </div>
        <span className="title-words">欢迎登陆全域健康平台</span>
        <Tabs
          activeKey={loginMethod}
          onChange={handleLoginMethodChange}
          className="login-tabs"
          items={tabItems.map((tab) => ({
            key: tab.key,
            label: (
              <span className="login-tab">
                {tab.icon}
                {tab.title}
              </span>
            ),
            children: tab.content,
          }))}
        />
      </div>
    </div>
  );
  
}
