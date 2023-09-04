import React, { useState } from 'react';
import { List, Card, Input } from 'antd';

const fakeData = [
  {
    id: 1,
    title: '对话 1',
    content: [
      { sender: 'A', message: '你好' },
      { sender: 'B', message: '你好！有什么需要帮助的吗' },
      { sender: 'A', message: '今天天气很好，有什么推荐的运动' },
      { sender: 'B', message: `如果天气很好，进行户外运动是一个不错的选择。以下是几种推荐的户外运动：

      跑步：跑步是一种简单而有效的运动方式，可以在户外空气清新的环境中进行。适合初学者和有一定运动基础的人。注意保持正确的跑步姿势，避免运动伤害。
      
      骑自行车：骑自行车是一种锻炼心肺功能和增强身体耐力的好方法。在户外环境中骑车可以享受美景和新鲜空气。记得佩戴头盔和其他适当的防护装备。
      
      爬山：爬山可以提高心肺功能和耐力，同时还可以欣赏美丽的自然风光。但是需要注意安全，选择适当的山路和时间，随时注意天气和身体状况。
      
      游泳：游泳是一种低冲击性的全身运动，适合所有年龄段的人。在阳光明媚的天气里游泳也是一种非常惬意的运动方式。
      
      总的来说，户外运动是一种非常健康和有益的运动方式，但是需要注意身体状况和安全问题，适度进行。` },
    ],
  },
  {
    id: 2,
    title: '对话 2',
    content: [
      { sender: 'A', message: '这是对话 2 的内容。' },
      { sender: 'B', message: '这是对话 2 的回复。' },
    ],
  },
  {
    id: 3,
    title: '对话 3',
    content: [
      { sender: 'A', message: '这是对话 3 的内容。' },
      { sender: 'B', message: '这是对话 3 的回复。' },
    ],
  },
];

const Conversation = () => {
  const [selectedConversation, setSelectedConversation] = useState(fakeData[0]);
  const [inputValue, setInputValue] = useState('');

  const handleSelectConversation = (conversation) => {
    setSelectedConversation(conversation);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      setSelectedConversation((prevConversation) => ({
        ...prevConversation,
        content: [
          ...prevConversation.content,
          { sender: 'A', message: inputValue.trim() },
        ],
      }));
      setInputValue('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        gap: '20px',
        height:"85vh",
        marginTop: '20px',
        width: '100%',
      }}
    >
      <Card
        style={{
          flex: 1,
          marginRight: '10px',
          overflowY: 'auto',
          height: 'calc(100% - 40px)',
        }}
      >
        <List
          itemLayout='horizontal'
          dataSource={fakeData}
          renderItem={(item) => (
            <List.Item
              onClick={() => handleSelectConversation(item)}
              style={{ cursor: 'pointer' }}
            >
              <List.Item.Meta title={item.title} />
            </List.Item>
          )}
        />
      </Card>
      <Card
        style={{
          flex: 4,
          marginLeft: '10px',
          overflowY: 'auto',
          height: 'calc(100% - 40px)',
        }}
        title={selectedConversation.title}
      >
        {selectedConversation.content.map((msg, index) => (
          <div
            key={index}
            style={{
              marginBottom: '20px',
              textAlign: msg.sender === 'B' ? 'left' : 'right',
            }}
          >
            <span
              style={{
                display: 'inline-block',
                borderRadius: '5px',
                padding: '5px 10px',
                maxWidth:"90%",
                backgroundColor: msg.sender === 'B' ? '#f0f0f0' : '#1890ff',
                color: msg.sender === 'B' ? 'black' : 'white',
              }}
            >
              {msg.message}
            </span>
          </div>
        ))}
      </Card>
      <div
        style={{
          width: '80%',
          display: 'flex',
          justifyContent: 'center',
          marginTop: '40px',
          position: 'absolute',
          left:"40vh",
          bottom: '-20px',
        }}
      >
        <Input
          placeholder="请输入您的消息"
          value={inputValue}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          style={{ width: '75%',borderRadius:"8px",height:"40px" }}
        />
      </div>
    </div>
  );
};

export default Conversation;