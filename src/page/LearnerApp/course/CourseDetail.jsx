import React, { useEffect, useState } from 'react';
import { Breadcrumb, Card, message } from 'antd';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import remarkGfm from 'remark-gfm'
import { fetchEssayDetailById } from '../../../api/eaasy/essayApi';
import { handleApiResponse } from '../../../utils/apiHelpers';
const CourseDetail = ({ match }) => {
  const { courseId } = match.params;
  const [courseDetail, setCourseDetail] = useState(null);
  const Image = styled.img`
  max-width: 50%; // 设置图像最大宽度为原始宽度的50%
  height: auto; // 高度自动，保持宽高比
  `;
  const markdown = `### 
  
  ## 营养价值
  
  蓝莓含有丰富的维生素、矿物质和抗氧化剂。它们富含维生素C、维生素K、锰、纤维等营养成分。

  ![testImage](https://images.unsplash.com/photo-1606757389667-45c2024f9fa4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80)

  ## 健康益处
  
  1. **抗氧化**：蓝莓含有大量的抗氧化剂，有助于对抗自由基，保护身体免受氧化应激和炎症的侵害。
  2. **心血管健康**：蓝莓有助于降低心血管疾病的风险，因为它们有助于降低血压、改善胆固醇水平和支持动脉健康。
  3. **认知功能**：研究表明，蓝莓有助于改善大脑功能，保持良好的记忆和注意力。
  4. **消化健康**：蓝莓含有大量纤维，有助于维持消化道健康，预防便秘。
  
  ## 食用方法
  
  蓝莓可以以多种形式食用，如新鲜水果、果酱、果汁、冷冻食品、干果等。可以将其添加到燕麦、酸奶、沙拉、烘焙食品等中，创造美味而健康的食谱。
  
  
  `
 

  const components = {
    img: ({ node, ...props }) => (
      <Image
        css={css`
          // 添加任何其他样式，例如圆角、边框等。
        `}
        {...props}
      />
    )
  };

  useEffect(() => {
    const fetchCourseDetailById = async (courseId) => {
      try {
        const response = await fetchEssayDetailById(courseId);
        const result = handleApiResponse(response);
        if (result.success) {
          message.success("获取课程内容成功");
          setCourseDetail(result.data);
        } else {
          message.error(result.message);
        }
      } catch (error) {
        message.error('获取课程内容失败', error);
      }
    };
    fetchCourseDetailById(courseId);
  }, [courseId,markdown]);

  return (
    <div>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>
          <Link to="/">首页</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to="/course">课程</Link>
        </Breadcrumb.Item>
        {/* <Breadcrumb.Item>
          <Link to={`/course/${category}`}>{category}</Link>
        </Breadcrumb.Item> */}
        <Breadcrumb.Item>{courseId}</Breadcrumb.Item>
      </Breadcrumb>
      {courseDetail ? (
        <Card style={{ margin: 16 }}>
          <h2>{courseDetail.title}</h2>
          <p>{courseDetail.description}</p>
          <ReactMarkdown
            className='markdown-body'
            children={courseDetail.content}
            remarkPlugins={[remarkGfm]}
            components={components}
          />
        </Card>
      ) : (
        <div>加载中...</div>
      )}
    </div>
  );
};

export default CourseDetail;
