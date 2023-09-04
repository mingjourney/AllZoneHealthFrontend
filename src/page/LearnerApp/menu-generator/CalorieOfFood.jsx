import React, { useState } from "react";
import { Button, Card, DatePicker, Form, Select, Typography } from "antd";
import "./menu-generator.css";
import moment from "moment";
const { Option } = Select;
const { Title } = Typography;

export default function CalorieOfFood() {
  const yesterday = moment().subtract(1, 'days');
  const [form] = Form.useForm();
  const [recipes, setRecipes] = useState([]);
  const [selectedDate, setSelectedDate] = useState(yesterday);
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleSelectDateSubmit = () => {
    if (selectedDate) {
      console.log('选中的日期:', selectedDate.format('YYYY-MM-DD'));
      // 在这里处理提交逻辑
    } else {
      console.log('请先选择一个日期');
    }
  };
  const handleSubmit = (values) => {
    console.log(values);
    setRecipes([
      "西红柿炖牛肉",
      "土豆牛肉烧",
      "西红柿土豆炖牛肉",
    ]);
  };

  return (
    <div className="menuform-container">
      <Title level={3}>输入菜名和大致重量</Title>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        className="menu-generator-form"
      >
        <Form.Item
          style={{ "borderRadius": "15px" }}
          name="ingredients"
          label="食材（在菜名后详细描述菜 结果会更准确，如：西红柿炒蛋（3个蛋两个西红柿一勺糖一勺番茄酱））"
          rules={[{ required: true, message: "请输入至少一个食材" }]}
        >
          <Select
            mode="tags"
            className="menu-input"
            placeholder="输入多个食材 用回车分隔 "
          >
            <Option value="西红柿">西红柿</Option>
            <Option value="牛肉">牛肉</Option>
            <Option value="土豆">土豆</Option>
          </Select>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="menu-generator-btn">
            获取热量估值（卡路里）
          </Button>
        </Form.Item>
      </Form>

      {recipes.length > 0 ? (
        <div className="recipe-suggestions">
          <Title level={4}>菜谱建议：</Title>
          <ul>
            {recipes.map((recipe, index) => (
              <Card key={index} className="recipeCard">
                {recipe}
              </Card>
            ))}
          </ul>
        </div>

      ) : (
        <div className="day-plan" style={{ display: "flex", }}>
          <Card className='outCard' title='详细描述菜，结果更准确' style={{ width: "300px", marginRight: "20px" }}>
            <Card
              size="small"
              className='activityCard'
            // className={`activityCard${isCurrent || isNext ? " current" : ""}`}
            >  如：西红柿炒蛋（3个蛋两个西红柿一勺糖一勺番茄酱）
            </Card>
          </Card>
          <Card
            className='outCard'
            title='点击载入昨日菜单'
            style={{ width: '300px', marginRight: '20px' }}
            extra={
              <Button size='small' onClick={handleSelectDateSubmit}>
                提交
              </Button>
            }
          >
            <Card size='small' className='activityCard'>
              <DatePicker
              style={{borderRadius:"5px"}}
                onChange={handleDateChange}
                format='YYYY-MM-DD'
                placeholder='选择日期'
                defaultValue={yesterday}
              />
            </Card>
          </Card>
        </div>

      )
      }

    </div>
  );
}
