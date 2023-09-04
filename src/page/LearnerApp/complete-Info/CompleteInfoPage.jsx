import React, {  useRef, useState } from 'react'
import { Button, Select, Input, PageHeader, Steps,Typography, Form, message, DatePicker } from 'antd'

import style from '../../AdminApp/knowledge-manage/knowledge.module.css'
import { handleApiResponse } from '../../../utils/apiHelpers';
import { updateBaseInfo } from '../../../api/auth/updateBaseInfo';
// import WordsContentEdit from '../../AdminApp/knowledge-manage/WordsContentEdit';
const { Option } = Select;
const { Text } = Typography;
export default function CompleteInfoPage(props) {
  const [currentStep, setCurrentStep] = useState(0);
  // const user = JSON.parse(localStorage.getItem("token"))

  const handleSave = async (type) => {
    try {
      // 验证表单
      const values = await knowledgeForm.current.validateFields();
      
      // 提取表单数据
      const {
        nickname,
        sex,
        profession,
        birthday,
        height,
        weight,
        age,
      } = values;
  
      const token = localStorage.getItem('token');
  
      // 创建表单数据对象，将表单数据添加到其中
      const formData = {
        nickname,
        sex,
        profession,
        birthday: birthday.format('YYYY-MM-DD'),
        height: parseFloat(height),
        weight: parseFloat(weight),
        age:parseInt(age),
      };
      console.log(formData);
      // 发送 POST 请求
      const response = await updateBaseInfo(formData, token);
      
      // 处理 API 响应
      const { success, message: apiMessage } = handleApiResponse(response);
  
      if (success) {
        // 提示用户数据已成功提交
        message.success('数据提交成功');
        props.history.push('/home');
        // 如果需要在提交数据后执行其他操作，如重置表单或跳转到其他页面，可以在这里添加相应的代码
        if (type === 1) {
          // 重置表单
          knowledgeForm.current.resetFields();
          
        }
      } else {
        // 如果请求失败，提示用户操作失败
        message.error(apiMessage);
      }
    } catch (error) {
      // 如果验证失败，提示用户检查输入
      message.error('请检查输入并完成所有必填项');
    }
  };
  

  const [content, setContent] = useState("")
  const handleBtnNext = (e) => {
    let valid = true;
    let errorMsg = '';
    if (currentStep === 0) {
      const nickname = knowledgeForm.current.getFieldValue("nickname");
      const sex = knowledgeForm.current.getFieldValue("sex");
      const profession = knowledgeForm.current.getFieldValue("profession");
      if (!nickname || nickname.trim() === "") {
        valid = false;
        errorMsg = "请输入你的昵称";
      } else if (!sex) {
        valid = false;
        errorMsg = "请选择性别";
      } else if (!profession || profession.trim() === "") {
        valid = false;
        errorMsg = "请输入职业";
      }
    } else if (currentStep === 1) {
      const birthday = knowledgeForm.current.getFieldValue("birthday");
      const height = knowledgeForm.current.getFieldValue("height");
      const weight = knowledgeForm.current.getFieldValue("weight");

      if (!birthday) {
        valid = false;
        errorMsg = "请输入生日";
      } else if (!height || height.trim() === "") {
        valid = false;
        errorMsg = "请输入身高";
      } else if (!weight || weight.trim() === "") {
        valid = false;
        errorMsg = "请输入体重";
      }
    } else if (currentStep === 2) {
      if (content === "" || content.trim() === "<p></p>") {
        valid = false;
        errorMsg = "学习内容内容不能为空";
      }
    }

    if (valid) {
      setCurrentStep(currentStep + 1);
    } else {
      message.error(errorMsg);
    }
  };

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
    wrapperCol: { span: 10 },
  }

  const knowledgeForm = useRef(null)
  return (
    <div>
      <PageHeader
        className="site-page-header"
        onBack={() => null}
        title="完善基础资料"
        subTitle="输入个人数据"

      />

      <Steps
        current={currentStep}
        style={{ padding: '30px 20px 0 20px' }}
        items={[
          {
            title: '个人基本信息',
            description: "平台显示",
          },
          {
            title: '个人生理数据',
            description: "量身打造计划",
          },
          {
            title: '数据更新',
            description: "上传平台",
          },]}
      />

      <div className={style.content} >
        <div>
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
              <div
                className={currentStep === 0 ? "" : style.hidden}>
                <Form.Item
                  label="昵称"
                  name="nickname"
                  rules={[
                    {
                      required: true,
                      message: '请输入你的昵称',
                    },
                  ]}
                >
                 
                    <Input />
                </Form.Item>

                <Form.Item
                  label="年龄"
                  name="age"
                  rules={[
                    {
                      required: true,
                      message: '请输入你的昵称',
                    },
                  ]}
                >
                 
                    <Input />
                </Form.Item>
                <Form.Item
                  label="性别"
                  name="sex"
                  rules={[
                    {
                      required: true,
                      message: '请选择性别',
                    },
                  ]}
                >
                  <Select>
                    <Option value="male">男</Option>
                    <Option value="female">女</Option>
                  </Select>
                </Form.Item>

                <Form.Item
                  label="职业"
                  name="profession"
                  rules={[
                    {
                      required: true,
                      message: '请输入职业',
                    },
                  ]}
                >
                  <Input />
                </Form.Item>

              </div>

              <div className={currentStep === 1 ? "" : style.hidden}
              >
                <Form.Item
                  label="生日"
                  name="birthday"
                  rules={[
                    {
                      required: true,
                      message: '请输入生日',
                    },
                  ]}

                >
                  <DatePicker />
                </Form.Item>
                <Form.Item
                  label="身高"
                  name="height"
                  rules={[
                    {
                      required: true,
                      message: '请输入身高',
                    },
                    {
                      pattern: /^\d+(\.\d{1,2})?$/,
                      message: '请输入有效的身高（最多两位小数）',
                    },
                    {
                      validator: (_, value) => {
                        if (value && (value < 50 || value > 300)) {
                          return Promise.reject('请输入合理的身高范围（50-300cm）');
                        } else {
                          return Promise.resolve();
                        }
                      },
                    },
                  ]}
                >
                  <Input addonAfter="cm" />
                </Form.Item>

                <Form.Item
                  label="体重"
                  name="weight"
                  rules={[
                    {
                      required: true,
                      message: '请输入体重',
                    },
                    {
                      pattern: /^\d+(\.\d{1,2})?$/,
                      message: '请输入有效的体重（最多两位小数）',
                    },
                    {
                      validator: (_, value) => {
                        if (value && (value < 2 || value > 500)) {
                          return Promise.reject('请输入合理的体重范围（2-500kg）');
                        } else {
                          return Promise.resolve();
                        }
                      },
                    },
                  ]}
                >
                  <Input addonAfter="kg" />
                </Form.Item>

              </div>
              <div className={currentStep === 2 ? "" : style.hidden}></div>
            </Form>
            <Text type="secondary" style={{ display: 'block', marginTop: 8 ,marginBottom: 4}}>
            提交的数据将仅用于制定个性化的健康计划。我们重视您的隐私，所有数据将严格保密。
            </Text>
          </div>
         
        </div>

      </div>
     
      <div className="button" style={{ padding: '20px 20px' }}>
        {currentStep > 0 && <Button type='primary' onClick={handleBtnBefore}>上一步</Button>}
        {
          currentStep === 2 && 
          
          <>
          
          <span>
            <Button style={{marginLeft:"5px"}} danger onClick={() => handleSave(1)}>
              提交数据
            </Button>
          </span>
        </>
        }
        {currentStep < 2 && <Button type='primary' onClick={handleBtnNext}>下一步</Button>}
      </div>
    </div >
  )
}
