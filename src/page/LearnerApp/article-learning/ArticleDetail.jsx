import React, { useEffect, useState } from 'react'
import { PageHeader, Descriptions } from 'antd';
import moment from 'moment'
import axios from 'axios';
import { HeartTwoTone } from '@ant-design/icons'
export default function ArticleDetail(props) {
    const [knowledgeInfo, setKnowledgeInfo] = useState(null)
    useEffect(() => {
        // console.log()
        axios.get(`/knowledge/${props.match.params.id}?_expand=category&_expand=role`).then(res => {
            setKnowledgeInfo({
                ...res.data,
                view: res.data.view + 1
            })

            //同步后端
            return res.data
        }).then(res => {
            axios.patch(`/knowledge/${props.match.params.id}`, {
                view: res.view + 1
            })
        })
    }, [props.match.params.id])
    const handleStar = () => {
        setKnowledgeInfo({
            ...knowledgeInfo,
            star: knowledgeInfo.star + 1
        })

        axios.patch(`/knowledge/${props.match.params.id}`, {
            star: knowledgeInfo.star + 1
        })
    }
    return (
        <div>
            {
                knowledgeInfo && <div>

                    <PageHeader
                        onBack={() => window.history.back()}
                        title={knowledgeInfo.title}
                        subTitle={<div>
                            {knowledgeInfo.category.title}
                            <HeartTwoTone twoToneColor="#eb2f96" onClick={() => handleStar()} />

                        </div>}
                    >
                        <Descriptions size="small" column={3}>
                            <Descriptions.Item label="创建者">{knowledgeInfo.author}</Descriptions.Item>

                            <Descriptions.Item label="发布时间">{
                                knowledgeInfo.publishTime ? moment(knowledgeInfo.publishTime).format("YYYY/MM/DD HH:mm:ss") : "-"
                            }</Descriptions.Item>
                            <Descriptions.Item label="区域">{knowledgeInfo.region}</Descriptions.Item>

                            <Descriptions.Item label="访问数量">{knowledgeInfo.view}</Descriptions.Item>
                            <Descriptions.Item label="点赞数量">{knowledgeInfo.star}</Descriptions.Item>
                            <Descriptions.Item label="评论数量">0</Descriptions.Item>

                        </Descriptions>
                    </PageHeader>

                    <div dangerouslySetInnerHTML={{
                        __html: knowledgeInfo.content
                    }} style={{
                        margin: "0 24px",
                        border: "1px solid gray",
                        padding: "20px 15px"
                    }}>
                    </div>
                </div>
            }
        </div>
    )
}
