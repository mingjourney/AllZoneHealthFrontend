import React, { useState } from 'react';
import { Button, Card, Form, Input, DatePicker, message } from 'antd';
import { submitTargetEntering } from '../../../api/auth/submitTargetEntering';
import { handleApiResponse } from '../../../utils/apiHelpers';

const { Meta } = Card;

const goals = [
    { title: '健身', placeholder: '请输入健身细节' },
    { title: '减脂', placeholder: '请输入减脂细节' },
    { title: '养生', placeholder: '请输入养生细节' },
    { title: '耐力', placeholder: '请输入耐力细节' },
];

const TargetEntering = () => {
    const [selectedGoals, setSelectedGoals] = useState([]);
    const [form] = Form.useForm();
    const [selectedDetails, setSelectedDetails] = useState('');
    const [selectedDate, setSelectedDate] = useState(null);

    // const handleFormSubmit = (values) => {
    //     const selectedDetailsString = selectedGoals
    //         .map((goal) => `${goal.title}: ${values[goal.title]}`)
    //         .join(', ');
    //     setSelectedDetails(selectedDetailsString);
    //     setSelectedDate(values.date.format('YYYY-MM-DD'));
    // };
    const handleFormSubmit = async (values) => {
        const data = {
          goals: selectedGoals.map((goal) => ({
            HealthGoalCategory: goal.title,
            detail: values[goal.title],
          })),
          targetDate: values.date.format('YYYY-MM-DD'),
          punishment:values.punishment,
          reward:values.reward,
        };
        // console.log(JSON.stringify(data));
        const selectedDetailsString = selectedGoals
                .map((goal) => `${goal.title}: ${values[goal.title]}`)
                .join(', ');
            setSelectedDetails(selectedDetailsString);
            setSelectedDate(values.date.format('YYYY-MM-DD'));
        try {
          const token = localStorage.getItem("token");
          const response = await submitTargetEntering(data, token);
          const result = handleApiResponse(response);
          if (result.success) {
        
            message.success('提交成功');
          } else {
            message.error('提交失败，请重试');
          }
        } catch (error) {
          message.error('提交失败，请重试');
        }
    
      };

    const handleGoalClick = (goal) => {
        if (selectedGoals.includes(goal)) {
            setSelectedGoals(selectedGoals.filter((g) => g !== goal));
        } else {
            setSelectedGoals([...selectedGoals, goal]);
        }
    };

    return (
        <div style={{ display: 'flex' }}>
            <div style={{ flex: 1 }}>
                <Card title="已选择的目标和细节">
                    {selectedGoals.length === 0 ? (
                        <p>请在右侧选择您的健康目标</p>
                    ) : (
                        <p>{`您选择了${selectedGoals
                            .map((goal) => ` ${goal.title} `)
                            .join('和')}`}</p>
                    )}
                    {selectedDetails && <p>{`目标具体细节：${selectedDetails}`}</p>}
                    {selectedDate && <p>{`目标达成时间：${selectedDate}`}</p>}
                </Card>
            </div>
            <div style={{ flex: 2, padding: 20 ,height:"80vh",overflow:"auto"}}>
                {goals.map((goal) => (
                    <Card
                        key={goal.title}
                        hoverable
                        style={{
                            marginBottom: 20,
                            border: selectedGoals.includes(goal) ? '2px solid #1890ff' : 'none',
                        }}
                        onClick={() => handleGoalClick(goal)}
                    >
                        <Meta title={goal.title} description={goal.placeholder} />
                    </Card>
                ))}
                {selectedGoals.length > 0 && (
                    <Form form={form} onFinish={handleFormSubmit} layout="vertical">
                        {selectedGoals.map((goal) => (
                            <Form.Item
                                key={goal.title}
                                name={goal.title}
                                label={goal.title}
                                rules={[
                                    {
                                        required: true,
                                        message: `请输入${goal.title}细节`,
                                    },
                                ]}
                            >
                                <Input placeholder={goal.placeholder} />
                            </Form.Item>
                        ))}
                        <Form.Item
                            name="date"
                            label="目标达成时间"
                            rules={[{ required: true, message: '请选择目标达成时间' }]}
                        >
                            <DatePicker style={{ width: '100%' }} />
                        </Form.Item>
                        <Form.Item
                            name="punishment"
                            label="惩罚"
                            rules={[{ required: true, message: '输入可能的惩罚' }]}
                        >
                            <Input style={{ width: '80%' }} placeholder='请输入未达成目标的惩罚'/>
                        </Form.Item>
                        <Form.Item
                            name="reward"
                            label="奖励"
                            rules={[{ required: true, message: '输入达成的奖励' }]}
                        >
                            <Input style={{ width: '80%' }} placeholder='请输入达成目标后的奖励'/>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                提交
                            </Button>
                        </Form.Item>
                    </Form>
                )}
            </div>
        </div>
    );
};

export default TargetEntering;