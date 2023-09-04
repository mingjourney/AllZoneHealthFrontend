import React, { useCallback, useEffect, useState } from 'react';
import { Form, Input, Button, Checkbox, Select, message } from 'antd';
import { MobileOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import { registerUser } from '../../api/auth/register';
import { emailSuffixOptions } from '../../utils/constants';
import { validatePhone, validateEmail } from '../../utils/validator';
import { sendCode } from '../../api/auth/sendCode';
import { handleApiResponse } from '../../utils/apiHelpers';
import { getUserInfo } from '../../api/auth/getUserInfo';


const RegisterForm = ({ registerMethod, history }) => {
  // ...
  const [emailSuffix, setEmailSuffix] = useState('@qq.com');
  const handleEmailSuffixChange = (value) => {
    setEmailSuffix(value);
  };
  const [form] = Form.useForm();
  const [countdown, setCountdown] = useState(0);

  //发送验证码处理
  const handleSendCode = useCallback(async () => {
    if (registerMethod === 'mobile') {
      const mobileRegex = /^1[3456789]\d{9}$/;
      if (!mobileRegex.test(form.getFieldValue('mobile'))) {
        message.error('手机号格式不正确');
        return;
      }
    } else if (registerMethod === 'email') {
      const email = form.getFieldValue('emailPrefix') + emailSuffix;
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(email)) {
        message.error('邮箱格式不正确');
        return;
      }
    } else {
      message.error('注册方式错误');
      return;
    }
    try {
      const requestData = registerMethod === 'mobile'
        ? new URLSearchParams({ mobile: form.getFieldValue('mobile') })
        : new URLSearchParams({ email: form.getFieldValue('emailPrefix') + form.getFieldValue('emailSuffix') });

      const response = await sendCode(registerMethod, requestData);
      const result = handleApiResponse(response);
      if (result.success) {
        const endTime = Date.now() + 60 * 1000;
        localStorage.setItem('countdownEndTime', endTime);
        setCountdown(60);
        message.success('验证码已发送，请注意查收');
      } else {
        message.error(result.message);
      }
    } catch (error) {
      message.error('服务器响应错误');
    }
  }, [form, registerMethod, emailSuffix]);

  // 在组件挂载时，检查倒计时是否仍在进行，并设置剩余时间
  useEffect(() => {
    if (countdown === 0) {
      const endTime = localStorage.getItem('countdownEndTime');
      if (endTime) {
        const remainingTime = Math.ceil((endTime - Date.now()) / 1000);
        if (remainingTime > 0) {
          setCountdown(remainingTime);
        }
      }
    }
  }, [countdown]);

  //发送验证码，60递减到0
  useEffect(() => {
    if (countdown > 0) {
      const interval = setInterval(() => {
        setCountdown((countdown) => countdown - 1);
      }, 1000);

      return () => {
        clearInterval(interval);
      };
    }
  }, [countdown]);

// 处理注册发送API,和处理响应
const handleRegister = async (userData, autologin) => {
  try {
    const response = await registerUser(userData);
    const result = handleApiResponse(response);
    if (result.success) {
      if (autologin) {
        message.success('自动登录');
        localStorage.setItem('token', JSON.stringify(result.data.token));
        history.push('/');
      } else {
        message.success('注册成功，请登录');
        history.push('/login');
      }
      return true;
    } else {
      message.error(result.message);
      return false;
    }
  } catch (error) {
    message.error('服务器响应错误');
    return false;
  }
};

//点击注册按钮
const onFinish = async (values) => {
  console.log(values);
  //对象字典，以便更简洁地构造 userData
  const userDataBuilders = {
    mobile: (values) => new URLSearchParams({
      mobile: values.mobile,
      code: values.code,
      password: values.password,
      autologin: values.remember,
    }),
    email: (values) => new URLSearchParams({
      email: `${values.emailPrefix}${values.emailSuffix}`,
      code: values.code,
      password: values.password,
      autologin: values.remember,
    }),
  };

  const buildUserData = userDataBuilders[registerMethod];

  if (!buildUserData) {
    message.error('注册方式错误');
    return;
  }

  const userData = buildUserData(values);
  await handleRegister(userData, values.remember);
};


  //渲染注册的输入框
  const renderRegisterInput = () => {
    if (registerMethod === 'mobile') {
      return (
        <Form.Item
          name="mobile"
          rules={[
            {
              required: true,
              validator: validatePhone,
              message: '请输入手机号',
            },
          ]}
        >
          <Input prefix={<MobileOutlined className="site-form-item-icon" />} placeholder="请输入手机号" />
        </Form.Item>
      );
    }

    return (
      <Form.Item
        name="emailPrefix"
        rules={[
          {
            required: true,
            validator: validateEmail,
            message: '请输入邮箱',
          },
        ]}

      >
        <Input.Group compact>
          <Form.Item
            name="emailPrefix"
            noStyle
          >
            <Input
              style={{ width: '60%' }}
              prefix={<MailOutlined className="site-form-item-icon" />}
              placeholder="请输入邮箱"
            />
          </Form.Item>
          <Form.Item
            name="emailSuffix"
            noStyle
            initialValue={emailSuffix}
          >
            <Select onChange={handleEmailSuffixChange} style={{ width: '40%' }}>
              {emailSuffixOptions.map((suffix) => (
                <Select.Option key={suffix} value={suffix}>
                  {suffix}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Input.Group>

      </Form.Item>
    );
  };
  return (
    <Form name={`${registerMethod}_register`} form={form} className="login-form" onFinish={onFinish}>
      {renderRegisterInput()}
      <Form.Item
        name="code"
        rules={[
          {
            required: true,
            message: '请输入验证码',
          },
        ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="text"
          placeholder="验证码"
          suffix={
            <Button
              size="small"
              disabled={countdown > 0} // 如果倒计时大于 0，则按钮不可用
              onClick={handleSendCode}
              type='link'
              style={{ paddingLeft: "12px", borderLeft: "1px solid #d9d9d9" }}
            >
              {countdown > 0 ? `（ ${countdown} 秒）` : '获取验证码'}
            </Button>
          }
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: '请输入密码',
          },
        ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="请输入密码"
        />
      </Form.Item>
      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox checked={false}>自动登陆</Checkbox>
        </Form.Item>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          注册
        </Button>
        <div className="register-line">
          <span>已有账号？</span>
          <a className="login-form-register-link" href="#/login">
            登录
          </a>
        </div>
      </Form.Item>
    </Form>
  );
};

export default RegisterForm;
