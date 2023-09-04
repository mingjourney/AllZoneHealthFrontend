import { Button, Select, Input, PageHeader, Steps, Form, message, notification } from 'antd'
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import style from './knowledge.module.css'
import WordsContentEdit from './WordsContentEdit';
const { Option } = Select;
export default function KnowledgeUpdate(props) {
    const [currentStep, setCurrentStep] = useState(0);
    const [categoryList, setCategoryList] = useState([])
    const user = JSON.parse(localStorage.getItem("token"))
    const [content, setContent] = useState("")
    const [formInfo, setformInfo] = useState({})
    const handleBtnNext = () => {
        if (currentStep === 0) {
            knowledgeForm.current.validateFields().then(res => {
                // console.log(res)
                setformInfo(res)
                setCurrentStep(currentStep + 1)
            }).catch(error => {
                console.log(error)
            })
        } else {
            console.log(content)
            if (content === "" || content.trim() === "<p></p>") {
                message.error("学习内容内容不能为空")
            } else {
                setCurrentStep(currentStep + 1)
            }
        }
    }
    useEffect(() => {
        // console.log()
        axios.get(`/knowledge/${props.match.params.id}?_expand=category&_expand=role`).then(res => {
            const { title, categoryId, content } = res.data;
            knowledgeForm.current.setFieldsValue({
                title,
                categoryId
            })
            setContent(content);
        })
    }, [props.match.params.id])
    const handleBtnBefore = () => {
        setCurrentStep(currentStep - 1);
    }
    const onFinish = (values) => {
        console.log('Success:', values);
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    const layout = {
        labelCol: { span: 2.7 },
        wrapperCol: { span: 18 },
    }

    const handleSave = (auditState) => {

        axios.patch(`/knowledge/${props.match.params.id}`, {
            ...formInfo,
            "content": content,
            "auditState": auditState,
        }).then(res => {
            props.history.push(auditState === 0 ? '/knowledge-manage/temp' : '/knowledge-manage/list')

            notification.info({
                message: `通知`,
                description:
                    `您可以到${auditState === 0 ? '草稿箱' : '审核列表'}中查看您的文章`,
                placement: "bottomRight"
            });
        })
    }
    const knowledgeForm = useRef(null)
    useEffect(() => {
        axios.get("/categories").then(res => {
            setCategoryList(res.data)
        })
    }, [])
    return (
        <div>
            <PageHeader
                className="site-page-header"
                onBack={() => props.history.goBack()}
                title="修改发布内容"
                subTitle="This is a subtitle"
            />

            <Steps
                current={currentStep}
                items={[
                    {
                        title: '概要描述选择',
                        description: "标题 分类",
                    },
                    {
                        title: '学习内容撰写',
                        description: "内容编辑",
                    },
                    {
                        title: '内容提交',
                        description: "上传审核库",
                    },]}
            />

            <div className={style.content}>
                <div className={currentStep === 0 ? "" : style.hidden}>
                    <div className={style.formContainer}>
                        <Form
                            {...layout}
                            name="basic"
                            initialValues={{
                                remember: true,
                            }}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            autoComplete="off"
                            ref={knowledgeForm}
                        >
                            <Form.Item
                                label="内容标题"
                                name="title"
                                rules={[
                                    {
                                        required: true,
                                        message: '请输入要发布标题',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                label="内容类别"
                                name="categoryId"
                                rules={[{ required: true, message: '选择发布的类别' }]}
                            >
                                <Select>
                                    {
                                        categoryList.map(item =>
                                            <Option value={item.id} key={item.id}>{item.title}</Option>
                                        )
                                    }
                                </Select>
                            </Form.Item>
                        </Form>
                    </div>

                </div>
                <div className={currentStep === 1 ? "" : style.hidden}>
                    <WordsContentEdit getContent={(value) => {
                        setContent(value)
                    }}
                        content={content}
                    />
                </div>
                <div className={currentStep === 2 ? "" : style.hidden}>3333</div>
            </div>
            <div className="button">
                {currentStep > 0 && <Button type='primary' onClick={handleBtnBefore}>上一步</Button>}
                {
                    currentStep === 2 && <span>
                        <Button type="primary" onClick={() => handleSave(0)}>保存草稿箱</Button>
                        <Button danger onClick={() => handleSave(1)}>提交审核</Button>
                    </span>
                }
                {currentStep < 2 && <Button type='primary' onClick={handleBtnNext}>下一步</Button>}
            </div>
        </div >
    )
}
