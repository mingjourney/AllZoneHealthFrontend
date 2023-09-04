import { Space, Table, Tag } from 'antd'
import React from 'react'

export default function Favorate() {
    const {id} = JSON.parse(localStorage.getItem("token"));
    const columns = [
        {
            title: '文章名',
            dataIndex: 'title',
            key: 'title',
            render: (text) => <a>{text}</a>,
        },
        {
            title: '文章点击量',
            dataIndex: 'countNum',
            key: 'countNum',
        },
        {
            title: '文章简介',
            dataIndex: 'info',
            key: 'info',
        },
        {
            title: '文章标签',
            key: 'tags',
            dataIndex: 'tags',
            render: (_, { tags }) => (
                <>
                    {tags.map((tag) => {
                        let color = tag.length > 5 ? 'geekblue' : 'green';
                        if (tag === 'loser') {
                            color = 'volcano';
                        }
                        return (
                            <Tag color={color} key={tag}>
                                {tag.toUpperCase()}
                            </Tag>
                        );
                    })}
                </>
            ),
        },
        {
            title: '操作',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <a>标记</a>
                    <a>移出收藏夹</a>
                </Space>
            ),
        },
    ];
    const data = [
        {
            key: '1',
            title: '简单的字形状定义',
            countNum: 32,
            info: '忡，基本释义: 忧虑不安',
            tags: ['文章学习', '音频学习'],
        },
        {
            key: '2',
            title: '成语故事',
            countNum: 42,
            info: '在中国，也许没有一种语言形式',
            tags: ['文章学习', '视频学习'],
        },
        {
            key: '3',
            title: '学习中文从你好开始',
            countNum: 32,
            info: 'Sidney No. 1 Lake Park',
            tags: ['文章学习',],
        },
    ];
    // 未完工
    // useEffect(() => {
    //     axios.get(`/users/${id}?_expand=knowledge`).then(res => console.log(res.data))
    // }, [id])
    return (
        <Table columns={columns} dataSource={data} />
        // <Empty imcountNum={Empty.PRESENTED_IMcountNum_SIMPLE} />
    )
}
