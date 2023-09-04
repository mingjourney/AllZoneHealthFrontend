import React, { useEffect, useState } from 'react'
import moment from 'moment';
import { Card, Form, Input, Timeline, message, Button } from 'antd';
import { fetchDayPlan } from '../../../api/auth/fetchDayPlan';
import { handleApiResponse } from '../../../utils/apiHelpers';

import './dayPlan.css';

const DayPlanContent = ({ level }) => {
  const [dayPlan, setDayPlan] = useState(null);
  const [nextSlot, setNextSlot] = useState(null);
  const isCurrentTimeSlot = (timeSlot) => {
    const currentTime = new Date();
    const [startTime, endTime] = timeSlot.time.split(' - ');
    const start = new Date(currentTime.toLocaleDateString() + ' ' + startTime);
    const end = new Date(currentTime.toLocaleDateString() + ' ' + endTime);
    return currentTime >= start && currentTime <= end;
  };
  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };
  const isFutureTimeSlot = (slot) => {
    const now = moment();
    const [startTime, endTime] = slot.time.split(" - ");
    const start = moment(startTime, "HH:mm");
    const end = moment(endTime, "HH:mm");

    return now.isBefore(start);
  };
  const levelToNumber = {
    hard: 3,
    medium: 2,
    easy: 1,
  }
  const contentMap = {
    hard: '日计划内容-困难',
    medium: '日计划内容-适中',
    easy: '日计划内容-简单',
  };
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await fetchDayPlan(levelToNumber[level], token);
        const result = handleApiResponse(response);
        if (result.success) {
          setDayPlan(result.data);
          message.success("获得日计划成功");

          // Find the next slot
          const next = result.data.timeSlots.find(
            (slot) => !isCurrentTimeSlot(slot) && isFutureTimeSlot(slot)
          );
          setNextSlot(next);
        } else {
          message.error(result.message);
        }
      } catch (error) {
        message.error(error);
      }
    };
    fetchData();
  }, [level]);

  const dayPlan1 = {
    reason: '今天的安排是为了提高你的肌肉力量和心肺功能。',
    slogan: '坚持下去，你会发现自己的无限潜力！',
    timeSlots: [
      {
        time: '07:00 - 08:00',
        activity: '晨跑 (30分钟)',
      },
      {
        time: '12:00 - 13:00',
        activity: '午餐：炒菜花(100g)、红烧鸡块(150g)、米饭(1.5碗)',
      },
      {
        time: '16:30 - 17:00',
        activity: '晚餐：牛排(150g)、沙拉(100g)',
      },
      {
        time: '18:00 - 19:30',
        activity: '健身房锻炼 - 背部 (90分钟)',
      },
      {
        time: '23:00 - 7:00',
        activity: '睡觉'
      },
    ],
  };

  return (
    <div className="day-plan" >
      {dayPlan ? <>
        <h2>{contentMap[level]}</h2>
        <div className="content-wrapper">
          <div className="left-column">
            <Card className='outCard' title="时间线安排" style={{ marginBottom: 16 }}>
              <Timeline>
                {dayPlan.timeSlots.map((slot, index) => {
                  const isCurrent = isCurrentTimeSlot(slot);
                  const isNext = nextSlot && slot.time === nextSlot.time;
                  return (
                    <Timeline.Item
                      key={index}
                      color={isCurrent || isNext ? "red" : "green"}
                    >
                      <Card className={`timeCard${isCurrent || isNext ? " current" : ""}`}>
                        {slot.time}
                        {isCurrent && <span className="label">【正在进行】</span>}
                        {isNext && <span className="label">【即将开始】</span>}
                      </Card>
                      <Card
                        size="small"
                        className={`activityCard${isCurrent || isNext ? " current" : ""}`}
                      >
                        {slot.activity}
                      </Card>
                    </Timeline.Item>
                  );
                })}
              </Timeline>



            </Card>

            
          </div>
          <div className="right-column">
          <Card className='outCard' title="今日安排原因" style={{ marginBottom: 16 }}>
              <p>{dayPlan.reason}</p>
              <p className="slogan">{dayPlan.slogan}</p>
            </Card>
            <div className="next-slot-info">
              <div className="leftTip">
                <div className="label">下一个活动：</div>
            
                </div>
                <div className="rightTip">
                <div>{nextSlot ? `${nextSlot.time} ${nextSlot.activity}` : "无"}
                </div>
                  <div> 昨天您的睡眠时间过短，良好的睡眠能保持一天的动力</div>
                  <a href="/some-link">点击查看详细信息</a>
              </div>
            </div>
            <div className="adjustment-form">
              <Form
                name="adjustment"
                onFinish={onFinish}
                autoComplete="off"
                className="rounded-form"
              >
                <Form.Item
                  name="adjustment"
                  rules={[
                    {
                      required: true,
                      message: '请输入您的调整需求！',
                    },
                  ]}
                >
                  <Input.TextArea style={{height:"60px"}}placeholder="请描述您的调整需求" />
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    提交调整需求
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </div>
        </div>
      </>
        : (
          <div>加载中...</div>
        )}

    </div>
  )
};
export default DayPlanContent;