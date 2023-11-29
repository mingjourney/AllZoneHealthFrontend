import React, { useState, useEffect, useRef } from 'react';
import ReactECharts from 'echarts-for-react';
import { Button, Card, Col, Form, Input, Modal, Progress, Row, Statistic, message, notification } from 'antd';
import {
  CheckCircleTwoTone,
}
from '@ant-design/icons';
import { submitWeight } from '../../../api/auth/submitWeight';
import { handleApiResponse } from '../../../utils/apiHelpers';
import { getRecentWeight } from '../../../api/auth/getRecentWeight';
import styles from './home.module.css';

const Home = () => {
  const [weightData, setWeightData] = useState([]);
  const chartRef = useRef(); // 添加这一行以引用图表实例
  const [hasWeightSubmitted, setHasWeightSubmitted] = useState(); // 添加这一行

  useEffect(() => {
    // 生成30天的假数据
    // const fakeData = Array.from({ length: 10 }, (_, i) => ({
    //   date: new Date(Date.now() - (i+1) * 24 * 60 * 60 * 1000).toLocaleDateString(),
    //   weight: Math.floor(Math.random() * 20 + 60),
    // })).reverse();    
    // console.log(JSON.stringify(fakeData));
    (async () => {
      try {
        const token = localStorage.getItem('token');
        const weightList = await getRecentWeight(token);
        const result = handleApiResponse(weightList);
        console.log(result);
        if (result.success) {
          setWeightData(result.data);
          message.success('获取体重数据成功');
        } else {
          message.error(result.message);
        }
      } catch (error) {
        message.error(error.message );
      }
    })();



    const handleWindowResize = () => {
      if (chartRef.current) {
        chartRef.current.getEchartsInstance().resize();
      }
    };

    window.addEventListener('resize', handleWindowResize);

    // 在组件卸载时删除监听器
    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  //校验当日是否更新体重
  useEffect(() => {
    //今天的日期
    const today = new Date().toLocaleDateString();
    //最后的日期
    const lastRecordDate = weightData.length
      ? weightData[weightData.length - 1].date
      : null;
    setHasWeightSubmitted(today === lastRecordDate);
  }, [weightData])


  const onFinish = async (values) => {
    // 更新weightData并关闭模态框
    const newWeightData = {
      date: new Date().toLocaleDateString(),
      weight: parseFloat(values.weight),
    };
    setWeightData([...weightData, newWeightData]);
    setHasWeightSubmitted(true);

    // 从localStorage获取token
    const token = localStorage.getItem('token');

    // 发送数据到API
    try {
      const response = await submitWeight(newWeightData, token);
      const result = handleApiResponse(response);
      if (result.success) {
        message.success("成功提交今日体重");
        notification.info({
          message: '请不要忘记每日的数据录入！',
          placement: 'topRight',
        });
      } else {
        message.error(result.message);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const calorieData = [
    { activity: '跑步', calories: 300 },
    { activity: '游泳', calories: 250 },
    { activity: '骑自行车', calories: 150 },
    { activity: '自然代谢消耗', calories: 1500 },
  ];

  const totalCalories = calorieData.reduce((sum, data) => sum + data.calories, 0);

  const getOption = () => {
    return {
      grid: {
        top: 40,
        bottom: 60,
        left: '10%',
        right: '15%',
      },
      xAxis: {
        type: 'category',
        data: weightData.map((d) => d.date
        ),
        axisLabel: {
          interval: 3,
          rotate: 45,
        },
      },
      yAxis: {
        type: 'value',
        min: 40, // 设置y轴的最小值
        max: 100, // 设置y轴的最大值
      },
      series: [
        {
          data: weightData.map((d) => d.weight),
          type: 'line',
          smooth: true,
        },
      ],
    };
  };

  const exerciseData = [
    { date: '2023-04-21', running: 2.5, swimming: 1.2, cycling: 0 },
    { date: '2023-04-22', running: 1.8, swimming: 0, cycling: 0 },
    { date: '2023-04-23', running: 0, swimming: 1.5, cycling: 1.8 },
    { date: '2023-04-24', running: 3, swimming: 0, cycling: 0 },
    { date: '2023-04-25', running: 2.2, swimming: 0, cycling: 1.6 },
    { date: '2023-04-26', running: 0, swimming: 1.1, cycling: 0 },
    { date: '2023-04-27', running: 1.5, swimming: 0.8, cycling: 0 },
  ];

  const exerciseChartOptions = {
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
    },
    grid: {
      top: 40,
      bottom: 60,
      left: '5%',
      right: '20%',
    },
    legend: {
      data: ['跑步', '游泳', '骑自行车'],
    },
    xAxis: {
      type: 'category',
      data: exerciseData.map((data) => data.date),
    },
    yAxis: {
      type: 'value',
      name: '小时',
    },
    series: [
      {
        name: '跑步',
        type: 'bar',
        stack: '总量',
        data: exerciseData.map((data) => data.running),
      },
      {
        name: '游泳',
        type: 'bar',
        stack: '总量',
        data: exerciseData.map((data) => data.swimming),
      },
      {
        name: '骑自行车',
        type: 'bar',
        stack: '总量',
        data: exerciseData.map((data) => data.cycling),
      },
    ],
  };
  const monthlyGoal = {
    target: 10000,
    completed: 7500,
  };

  const goalPercentage = (monthlyGoal.completed / monthlyGoal.target) * 100;

  return (
    <div className={styles.container}>
      <Modal
        title="请输入今天的体重"
        open={!hasWeightSubmitted}
        footer={[
          <Button key="submit" type="primary" form="weightForm" htmlType="submit">
            提交
          </Button>,
        ]}
      >
        <Form id="weightForm" layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="体重"
            name="weight"
            rules={[
              {
                required: true,
                message: '请输入体重',
              },
              {
                pattern: /^\d+(\.\d{1,2})?$/,
                message: '请输入有效的体重（最多两位小数）',
              },
              {
                validator: (_, value) => {
                  if (value && (value < 2 || value > 500)) {
                    return Promise.reject('请输入合理的体重范围（2-500kg）');
                  } else {
                    return Promise.resolve();
                  }
                },
              },
            ]}
          >
            <Input addonAfter="kg" />
          </Form.Item>
        </Form>
      </Modal>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={8}>
          <Card className={styles.block}>
            <h3>近期体重变化</h3>
            <ReactECharts ref={chartRef} option={getOption()} />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card title="当日卡路里消耗" className={styles.block}>
            <Statistic
              title="总消耗"
              value={totalCalories}
              suffix="千卡"
              valueStyle={{ color: '#3f8600' }}
            />
            {calorieData.map((data) => (
              <div key={data.activity} style={{ marginTop: 16 }}>
                <CheckCircleTwoTone twoToneColor="#52c41a" />
                {` ${data.activity}：${data.calories} 千卡`}
              </div>
            ))}
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card title="7天运动统计" className={styles.block}>
            <ReactECharts option={exerciseChartOptions} style={{ height: '300px' }} />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card title="本月目标进度" className={styles.block}>
            <Progress
              type="circle"
              percent={goalPercentage}
              format={(percent) => `${percent.toFixed(1)}%`}
              width={120}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card title="日均率睡眠及额外数据" className={styles.block}>

          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card title="健康建议和提示" className={styles.block}>
            健康建议和提示
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Home;


// import { List, Card, Col, Row, Result, Statistic } from 'antd';
// import axios from 'axios';
// import * as Echarts from 'echarts';
// import style from './home.module.css'
// import _ from 'lodash'
// import { SmileOutlined, LikeOutlined } from '@ant-design/icons';
// export default function Home() {
//   const barRef = useRef()
//   const [hotList, setHotList] = useState([]);

//   const [categoryList, setCategoryList] = useState([])
//   useEffect(() => {
//     axios.get(`/knowledge?publishState=2&_expand=category&_sout=view&_order=desc&_limit=6`).then(
//       res => {
//         console.log(res.data)
//         setHotList(res.data);
//       }
//     )
//   }, [])
//   const renderBarView = (obj) => {
//     var myChart = Echarts.init(barRef.current);

//     // 指定图表的配置项和数据
//     var option = {
//       tooltip: {
//         trigger: 'item'
//       },
//       legend: {
//         data: ['数量']
//       },
//       xAxis: {
//         data: Object.keys(obj),
//         axisLabel: {
//           margin: 20,
//           rotate: "0",
//           interval: 0
//         }

//       },
//       yAxis: {
//         minInterval: 1
//       },
//       series: [{
//         name: '数量',
//         type: 'bar',
//         data: Object.values(obj).map(item => item.length),
//       }]
//     };

//     // 使用刚指定的配置项和数据显示图表。
//     myChart.setOption(option);


//     window.onresize = () => {
//       // console.log("resize")
//       myChart.resize()
//     }
//   }
//   const { username } = JSON.parse(localStorage.getItem("token"))

//   useEffect(() => {
//     axios.get("/knowledge?publishState=2&_expand=category").then(res => {
//       // console.log(res.data)
//       // console.log()
//       renderBarView(_.groupBy(res.data, item => item.category.title))
//       setCategoryList(res.data)
//     })
//     return () => {
//       window.onresize = null
//     }
//   }, [])
//   const message = '管理员' + username + '！你已经处理完所有审核发布,目前没有新处理';
//   return (
//     <div>
//       <Row gutter={16}>
//         <Col span={8}>
//           <Card title="用户最多点击" bordered={true}>
//             <List
//               size='small'
//               dataSource={hotList}
//               renderItem={
//                 item =>
//                   <List.Item>
//                     <a href={`#/knowledge-manage/preview/${item.id}`}>
//                       {item.title}
//                     </a>
//                   </List.Item>
//               }
//             />
//           </Card>
//         </Col>
//         <Col span={8}>
//           <Card title="成就" bordered={true}>
//             <Statistic title="发布文章总点击" value={893} />
//             <br />
//             <Statistic title="获得点赞量" value={1128} prefix={<LikeOutlined />} />

//             <br></br>
//             <Statistic title="未处理条目" value={93} suffix="/ 100" />

//           </Card>
//         </Col>
//         <Col span={8}>
//           <Card title="个人发布类别" bordered={true} >
//             <div className={style.charts} ref={barRef}></div>
//           </Card>
//         </Col>
//       </Row>
//       <Result
//         icon={<SmileOutlined />}
//         title={message}
//       />
//     </div>
//   )
// }




