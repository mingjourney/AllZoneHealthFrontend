import React, { useState } from 'react';
import {Tabs } from 'antd';
import {  MobileOutlined, MailOutlined } from '@ant-design/icons';
import RegisterForm from './RegisterForm';

export default function Register(props) {
  const [registerMethod, setregisterMethod] = useState('mobile'); // 手机号 / 邮箱
  
  const handleregisterMethodChange = (value) => {
    setregisterMethod(value);
  }
  
  const tabItems = [
    {
      key: 'mobile',
      title: '手机号注册',
      icon: <MobileOutlined className="login-tab-icon" />,
      content: (
        <RegisterForm
          history={props.history}
          registerMethod={registerMethod}
        />
      ),
    },
    {
      key: 'email',
      title: '邮箱注册',
      icon: <MailOutlined className="login-tab-icon" />,
      content: (
        <RegisterForm
          history={props.history}
          registerMethod={registerMethod}
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
        <span className="title-words">欢迎注册全域健康平台</span>
        <Tabs
          activeKey={registerMethod}
          onChange={handleregisterMethodChange}
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