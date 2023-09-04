import { Descriptions, PageHeader } from 'antd'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import moment from 'moment'
import "./knowledge.css"
export default function KnowledgePreview(props) {
  const [knowledgeInfo, setKnowledgeInfo] = useState(null)
  useEffect(() => {
    // console.log()
    axios.get(`/knowledge/${props.match.params.id}?_expand=category&_expand=role`).then(res => {
      setKnowledgeInfo(res.data)
    })
  }, [props.match.params.id])

  const auditList = ["未审核", '审核中', '已通过', '未通过']
  const publishList = ["未发布", '待发布', '已上线', '已下线']

  const colorList = ["black", "orange", "green", "red"]
  return (
    <div>
      {
        knowledgeInfo && <div>

          <PageHeader
            onBack={() => window.history.back()}
            title={knowledgeInfo.title}
            subTitle={knowledgeInfo.category.title}
          >
            <Descriptions size="small" column={3}>
              <Descriptions.Item label="创建者">{knowledgeInfo.author}</Descriptions.Item>
              <Descriptions.Item label="创建时间">{moment(knowledgeInfo.createTime).format("YYYY/MM/DD HH:mm:ss")}</Descriptions.Item>
              <Descriptions.Item label="发布时间" color="#a0c1b0">{
                knowledgeInfo.publishTime ? moment(knowledgeInfo.publishTime).format("YYYY/MM/DD HH:mm:ss") : "-"
              }</Descriptions.Item>
              <Descriptions.Item label="区域">{knowledgeInfo.region}</Descriptions.Item>
              <Descriptions.Item label="审核状态" ><span style={{ color: colorList[knowledgeInfo.auditState] }}>{auditList[knowledgeInfo.auditState]}</span></Descriptions.Item>
              <Descriptions.Item label="发布状态" ><span style={{ color: colorList[knowledgeInfo.publishState] }}>{publishList[knowledgeInfo.publishState]}</span></Descriptions.Item>
              <Descriptions.Item label="访问数量">{knowledgeInfo.view}</Descriptions.Item>
              <Descriptions.Item label="点赞数量">{knowledgeInfo.star}</Descriptions.Item>
              <Descriptions.Item label="评论数量">0</Descriptions.Item>

            </Descriptions>
          </PageHeader>

          <div dangerouslySetInnerHTML={{
            __html: knowledgeInfo.content
          }} style={{
            margin: "0 24px",
            padding: "15px",
            border: "0.5px solid gray"
          }}>
          </div>
        </div>
      }
    </div>
  )
}
