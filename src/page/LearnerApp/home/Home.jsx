import React, { useEffect, useMemo, useState } from 'react'
import { Card, Col,  Row, message} from 'antd';
import Meta from 'antd/lib/card/Meta';
import './home.css'
import { getRecommendedCategories } from '../../../api/auth/getRecommendedCategories';
import { handleApiResponse } from '../../../utils/apiHelpers';

const Home = (props) => {
    const [strategies, setStrategies] = useState([]);
    useEffect(() => {
        const token = localStorage.getItem("token");
        const fetchStrategies = async () => {
          try {
            const response = await getRecommendedCategories(token); // 请确保您有正确的 token
            const result = handleApiResponse(response);
            if (result.success) {
              setStrategies(result.data);
              message.success("获取策略列表成功");
            } else {
              console.error(result.message);
            }
          } catch (error) {
            console.error('获取策略列表失败', error);
          }
        };
      
        fetchStrategies();
      }, []); 
    // const coursesCategory = useMemo(()=>[
    //     {
    //         id: 1,
    //         title: '营养学入门',
    //         key: 'nutritionIntroduction',
    //         cover: 'https://picsum.photos/id/237/300/200',
    //         description: '本课程主要介绍营养学的基本概念和知识，包括营养素、代谢、能量等方面的内容。',
    //     },
    //     {
    //         id: 2,
    //         title: '健康饮食指南',
    //         key: 'healthydiet',
    //         cover: 'https://picsum.photos/id/238/300/200',
    //         description: '本课程主要介绍健康饮食的原则和方法，包括膳食平衡、食物搭配、烹饪技巧等方面的内容。',
    //     },
    //     {
    //         id: 3,
    //         title: '减肥秘籍',
    //         key: 'Slimming',
    //         cover: 'https://picsum.photos/id/239/300/200',
    //         description: '本课程主要介绍减肥的方法和技巧，包括饮食、运动、生活方式等方面的内容。',
    //     },
    // ],[]) 
    // useEffect(()=>{
    //     console.log(JSON.stringify(coursesCategory));
    // },[coursesCategory])
    const intelligentPlans = [
        {
            id: 1,
            title: '今天精力充沛',
            key:'/planning/day/hard',
            description: '多努力一点，之后几天轻松一点',
            cover: '/path/to/cover-image1.jpg',
        },
        {
            id: 2,
            title: '今天按指标来',
            key:'/planning/day/medium',
            description: '持之以恒才是王者之道',
            cover: '/path/to/cover-image2.jpg',
        },
        {
            id: 3,
            title: '今天想摸鱼',
            key:'/planning/day/easy',
            description: '明天就要打鱼了',
            cover: '/path/to/cover-image3.jpg',
        },
    ];
    const handleCourseCardClick = (categoryName) => {
        // 在这里执行其他操作（记录点击次数等）
        console.log(categoryName);
        //导航到相应类别课程
        props.history.push({
            pathname: `/course`,
            state: { category: categoryName },
          });
    };
    const handlePlanningCardClick = (planType) => {
        // 在这里执行其他操作（记录点击次数等）
        //导航到相应类别课程
        props.history.push(`${planType}`);
    };

    return (
        <div className="site-layout-content" style={{height:"85vh" ,overflow:"auto"}}>
            <Row gutter={[16, 16]}>
                <Col xs={24} sm={24} md={24} lg={24}>
                    <h1>欢迎来到 ChatGPT 健康平台</h1>
                    <p>本平台集成了 ChatGPT 智能聊天机器人，为用户提供全面、专业的健康管理和生活方式指导。</p>
                    <h2>智能规划</h2>
                    <Row gutter={[16, 16]} className="card-list">
                        {intelligentPlans.map((plan) => (
                            <Col xs={24} sm={12} md={8} lg={6} key={plan.id}>
                                <Card
                                    hoverable
                                    // cover={<img alt={plan.title} src={plan.cover} />}
                                    onClick={() => handlePlanningCardClick(plan.key)}
                                >
                                    <Meta title={plan.title} description={plan.description} />
                                </Card>
                            </Col>
                        ))}
                    </Row>
                    <h2 style={{"marginTop":"10px"}}>推荐课程</h2>
                    <Row gutter={[16, 16]} className="card-list">
                        {strategies.map(course => (
                            <Col xs={24} sm={12} md={8} lg={6} key={course.id}>
                                <Card
                                    hoverable
                                    cover={<img alt={course.title} src={course.cover} />}
                                    onClick={() => handleCourseCardClick(course.title)}
                                >
                                    <Meta title={course.title} description={course.description} />
                                </Card>
                            </Col>
                        ))}
                    </Row>
                    <h2 style={{"marginTop":"10px"}}>推荐文章</h2>
                    <Row gutter={[16, 16]} className="card-list">
                        {strategies.map(course => (
                            <Col xs={24} sm={12} md={8} lg={6} key={course.id}>
                                <Card
                                    hoverable
                                    onClick={() => handleCourseCardClick(course.title)}
                                >
                                    <Meta title={course.title} description={course.description} />
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Col>

            </Row>
        </div>
    );
};
export default Home;