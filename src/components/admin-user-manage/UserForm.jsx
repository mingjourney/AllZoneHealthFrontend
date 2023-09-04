import React, { forwardRef, useEffect, useState } from 'react'
import { Form, Input, Select } from 'antd';
const UserForm = forwardRef((props, ref) => {
    const handleChange = (value) => {
        if (value === 1) {
            setIsForbidden(true);
            ref.current.setFieldsValue({ country: "" })
        }
        else {
            setIsForbidden(false);
        }
    };
    const { roleId, country } = JSON.parse(localStorage.getItem("token"))

    useEffect(() => {
        setIsForbidden(props.isUpdateForbidden);
    }, [props.getTime, props.isUpdateForbidden])
    const [isForbidden, setIsForbidden] = useState(false);
    const checkRole = (item) => {
        if (props.isUpdateForm) {
            if (roleId === 1) {
                return false;
            } else {
                return true;
            }
        } else {
            if (roleId === 1) {
                return false;
            } else {
                return item.id !== roleId;
            }
        }
    }
    // const [form] = Form.useForm();
    return (
        <Form
            // form={form}
            ref={ref}
            layout="vertical"
        >
            <Form.Item
                name="username"
                label="用户名"
                rules={[{ required: true, message: "请输入用户名" }]}>
                <Input />
            </Form.Item>

            <Form.Item
                name="password"
                label="密码"
                rules={[{ required: true, message: "请输入密码" }]}>
                <Input />
            </Form.Item>

            <Form.Item
                name="country"
                label="国家"
                rules={isForbidden ? [] : [{ required: true, message: "请输入国家" }]}>
                <Select
                    options={props.countryList.map((item) => ({
                        value: item.value,
                        lable: item.title
                    }))}
                    disabled={isForbidden}
                />
            </Form.Item>

            <Form.Item
                name="roleId"
                label="角色"
                rules={[{ required: true, message: "请输入角色" }]}>
                <Select
                    onChange={handleChange}
                    options={props.roleList.map((item) => ({
                        value: item.roleType,
                        label: item.roleName,
                        key: item.id,
                        disabled: checkRole(item)
                    }))}
                />
            </Form.Item>

        </Form>
    )
})

export default UserForm;