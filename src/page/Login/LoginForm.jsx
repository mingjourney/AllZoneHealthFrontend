import React, { useState } from 'react';
import { Form, Input, Checkbox, Button, Select, message } from 'antd';
import { LockOutlined, MobileOutlined, MailOutlined } from '@ant-design/icons';
import { loginUser } from '../../api/auth/login';
import { handleApiResponse } from '../../utils/apiHelpers';
// import axios from 'axios';

const LoginForm = ({ loginMethod, history }) => {
    const emailSuffixOptions = ['@qq.com', '@163.com', '@gmail.com', '@outlook.com', '@hotmail.com'];
    // ...
    const [emailSuffix, setEmailSuffix] = useState('@qq.com');
    const handleEmailSuffixChange = (value) => {
        setEmailSuffix(value);
    };
    const validatePhone = (rule, value) => {
        if (!value) {
            return Promise.reject('请输入手机号');
        }
        if (!/^1[3-9]\d{9}$/.test(value)) {
            return Promise.reject('请输入正确的手机号');
        }
        return Promise.resolve();
    };
    const validateEmail = async (_, value) => {

        const emailPrefixRegex = /^(?![_.])[a-zA-Z0-9._]+(?<![_.])$/;

        if (value && emailPrefixRegex.test(value)) {
            return Promise.resolve(); // 验证通过
        } else {
            return Promise.reject('请输入正确的邮箱前缀'); // 验证失败，返回错误信息
        }
    };

    //邮箱前缀-后缀拼接
    const handleEmailInput = (values) => {
        if (values.emailPrefix && values.emailSuffix) {
            const fullEmail = `${values.emailPrefix}${values.emailSuffix}`;
            values.email = fullEmail;
            delete values.emailPrefix;
            delete values.emailSuffix;
        }
    };
    const handleLogin = async (values) => {
        handleEmailInput(values);
        try {
            const res = await loginUser(loginMethod, values);
            const result = handleApiResponse(res);
            if (result.success) {
                // 保存用户的token到浏览器的localStorage
                localStorage.setItem('token', result.data.token);
                history.push("/");
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

    //点击登录按钮
    const onFinish = async (values) => {
        await handleLogin(values);
    };

    //输入框渲染
    const renderLoginInput = () => {
        if (loginMethod === 'mobile') {
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
                        noStyle // 添加此属性以隐藏 Form.Item 的样式
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
        <Form name="normal_login" className="login-form" onFinish={onFinish}>
            {renderLoginInput()}
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
                    <Checkbox checked={true}>保持登陆</Checkbox>
                </Form.Item>
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button">
                    登录
                </Button>
                <div className="register-line">
                    <span>没有账号？</span>
                    <a className="login-form-register-link" href="#/register">
                        注册
                    </a>
                </div>
            </Form.Item>
        </Form>
    );
};

export default LoginForm;
