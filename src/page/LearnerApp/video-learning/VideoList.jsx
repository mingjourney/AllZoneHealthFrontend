import React, { useEffect, useState } from 'react'
import { List, Avatar, Menu, Space } from 'antd'
import {
    StarOutlined,
    LikeOutlined,
}
    from '@ant-design/icons'
import axios from 'axios';
import _ from 'lodash'

const IconText = ({ icon, text }) => (
    <Space>
        {React.createElement(icon)}
        {text}
    </Space>
);
export default function VedioList(props) {
    const [list, setlist] = useState([])
    useEffect(() => {
        axios.get("/knowledge?publishState=2&_expand=category").then(res => {
            setlist(Object.entries(_.groupBy(res.data, item => item.category.title))[1][1])
        })
    }, [])
    const items = [
        {
            label: '首页',
            key: '/learnerhome',
            onClick: (item) => {
                props.history.push(item.key)
            }
        },
        {
            label: '音频学习',
            key: '/audio-learning',
            onClick: (item) => {
                props.history.push(item.key)
            }
        },
        {
            label: '文章学习',
            key: '/article-learning',
            onClick: (item) => {
                props.history.push(item.key)
            }
        },
        {
            label: '视频学习',
            key: '/video-learning',
        },
        {
            label: (
                <a href="https://www.chinese-learning.cn/#/web" target="_blank" rel="noopener noreferrer">
                    参考网站
                </a>
            ),
            key: 'alipay',
        },
    ];
    const [current, setCurrent] = useState('mail');
    const onClick = (e) => {
        console.log('click ', e);
        setCurrent(e.key);
    };
    return (
        <div className='secondContainer'>
            <div className="topBox" style={{ width: "100%", height: "150px" }}>
                <div className="logo">
                    <a href={`#/learnerhome`}>
                        <img src='./image/logo-formal1.png' alt='logo' />
                    </a>

                </div>
                <Menu style={{ position: "absolute", top: "70px" }} onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
            </div>
            <List
                itemLayout="vertical"
                size="large"
                pagination={{
                    onChange: (page) => {
                        console.log(page);
                    },
                    pageSize: 3,
                }}
                dataSource={list}
                renderItem={(item) => (
                    <List.Item
                        key={item.title}
                        actions={[
                            <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
                            <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
                            // <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
                        ]}
                        extra={
                            <img
                                width={272}
                                alt="logo"
                                src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                            />
                        }
                    >
                        <List.Item.Meta
                            avatar={<Avatar src="https://joesch.moe/api/v1/random" />}
                            title={<a href={`#/article-learning/detail/${item.id}`}>{item.title}</a>}
                            description="暂时点进去前看不见内容"
                        />
                        {item.content.replace(/[^\u4e00-\u9fa5]/gi, "").slice(0, 120) + "......"}
                    </List.Item>
                )}
            />
        </div>
    )
}
