import React, { useEffect, useState } from 'react'
import moment from 'moment';
import { Card, Form, Input, Timeline, message, Button } from 'antd';
import { fetchDayPlan } from '../../../api/auth/fetchDayPlan';
import { handleApiResponse } from '../../../utils/apiHelpers';
import Title from 'antd/lib/skeleton/Title';


const DishToDetail = ({ level }) => {
  const [dayPlan, setDayPlan] = useState(null);
  const [form] = Form.useForm();
  const [recipe, setRecipe] = useState(null);
  const handleSubmit = (values) => {
    const { dishName } = values;
    if (recipeData[dishName]) {
      setRecipe(recipeData[dishName]);
    } else {
      setRecipe(null);
    }
  };
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

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await fetchDayPlan(level, token);
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
  const recipeData = {
    "西红柿炒鸡蛋": {
      ingredients: [
        { unicode: "🍅", name: "西红柿", quantity: "2个" },
        { unicode: "🥚", name: "鸡蛋", quantity: "3个" },
        { unicode: "🧂", name: "盐", quantity: "适量" },
      ],
      steps: ["将西红柿切片，鸡蛋打散。", "热锅，倒入油，先炒鸡蛋。", "加入西红柿翻炒。", "加入适量盐，出锅。"],
      tips: "加入适量的糖可以提味。",
    },
  };

  return (
    <div className="day-plan" >
      <Title level={3}>输入菜名，获取菜谱</Title>
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          name="dishName"
          label="菜名"
          rules={[{ required: true, message: "请输入菜名" }]}
        >
          <Input placeholder="输入菜名" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            获取菜谱
          </Button>
        </Form.Item>
      </Form>
      {recipe ? <>
        <div className="content-wrapper">
          <div className="left-column">
            <Card className='outCard' title="步骤如下" style={{ marginBottom: 16 }}>
              <Timeline>
                {recipe.steps.map((step, index) => {
                  // const isCurrent = isCurrentTimeSlot(step);
                  // const isNext = nextSlot && step.time === nextSlot.time;
                  return (
                    <Timeline.Item
                      key={index}
                    // color={isCurrent || isNext ? "red" : "green"}
                    >
                      <Card
                        // className={`timeCard${isCurrent || isNext ? " current" : ""}`}>
                        className='timeCard'>
                        {`第${index + 1}步`}
                      </Card>
                      <Card
                        size="small"
                        className='activityCard'
                      // className={`activityCard${isCurrent || isNext ? " current" : ""}`}
                      >
                        {step}
                      </Card>
                    </Timeline.Item>
                  );
                })}
              </Timeline>



            </Card>


          </div>
          <div className="right-column">
            <Card className='outCard' title="配料表" style={{ marginBottom: 16 }}>
            {recipe.ingredients.map((ingredient)=>{
              return <span style={{marginRight:"5px"}}>{`${ingredient.unicode} ${ingredient.name}${ingredient.quantity}`}</span>
            })}
            </Card>
            <div className="next-slot-info">
              <div className="leftTip">
                <div className="label">小帖士：</div>

              </div>
              <div className="rightTip">
                <div>{recipe.tips ? `${recipe.tips} ` : "无"}
                </div>
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
                  <Input.TextArea style={{ height: "60px" }} placeholder="请描述您的调整需求" />
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
export default DishToDetail;