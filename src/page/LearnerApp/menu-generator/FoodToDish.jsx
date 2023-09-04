import React, { useState } from "react";
import { Button, Card, Form, Select, Typography } from "antd";
import "./menu-generator.css";
const { Option } = Select;
const { Title } = Typography;

export default function FoodToDish() {
  const [form] = Form.useForm();
  const [recipes, setRecipes] = useState([]);

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
      <Title level={3}>输入食材和口味需求，获取菜谱建议</Title>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        className="menu-generator-form"
      >
        <Form.Item
          style={{"borderRadius":"15px"}}
          name="ingredients"
          label="食材"
          rules={[{ required: true, message: "请输入至少一个食材" }]}
        >
          <Select
            mode="tags"
            className="menu-input"
            placeholder="输入多个食材，用逗号分隔"
          >
            <Option value="西红柿">西红柿</Option>
            <Option value="牛肉">牛肉</Option>
            <Option value="土豆">土豆</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="flavor"
          label="口味需求"
          className="menu-input"
          rules={[{ required: true, message: "请选择一个口味" }]}
        >
          <Select placeholder="选择一个口味">
            <Option value="麻辣">麻辣</Option>
            <Option value="酸辣">酸辣</Option>
            <Option value="清淡">清淡</Option>
            <Option value="咸鲜">咸鲜</Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="menu-generator-btn">
            获取菜谱建议
          </Button>
        </Form.Item>
      </Form>
      {recipes.length > 0 && (
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
      )}

    </div>
  );
}
