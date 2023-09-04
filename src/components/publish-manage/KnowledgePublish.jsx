import React from 'react'
import { Table } from 'antd'

export default function KnowledgePublish(props) {

    const columns = [
        {
            title: '学习内容标题',
            dataIndex: 'title',
            render: (title, item) => {
                return <a href={`#/knowledge-manage/preview/${item.id}`}>{title}</a>
            }
        },
        {
            title: '作者',
            dataIndex: 'author'
        },
        {
            title: "学习内容分类",
            dataIndex: 'category',
            render: (category) => {
                return <div>{category.title}</div>
            }
        },
        {
            title: "操作",
            render: (item) => {
                return <div>
                    {props.button(item.id)}
                </div>
            }
        }
    ];

    return (
        <div>

            <Table dataSource={props.dataSource} columns={columns}
                pagination={{
                    pageSize: 5
                }}
                rowKey={item => item.id}
            />
        </div>
    )
}
