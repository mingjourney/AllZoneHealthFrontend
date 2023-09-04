import React from 'react';
import { Table } from 'antd';
import './weekPlanContent.css'
const columns = [
  {
    title: '日期',
    dataIndex: 'date',
    key: 'date',
  },
  {
    title: '早餐',
    dataIndex: 'breakfast',
    key: 'breakfast',
  },
  {
    title: '午餐',
    dataIndex: 'lunch',
    key: 'lunch',
  },
  {
    title: '晚餐',
    dataIndex: 'dinner',
    key: 'dinner',
  },
  {
    title: '锻炼内容',
    dataIndex: 'exercise',
    key: 'exercise',
  },
  {
    title: '代谢结余卡路里',
    dataIndex: 'calories',
    key: 'calories',
    render: (text) => (
      <span
        className={`calories-cell ${parseInt(text) < 0 ? 'positive' : ''}`}
      >
        {text}
      </span>
    ),
  },
];

const weekData = [
  {
    key: '1',
    date: '星期一',
    breakfast: '燕麦粥(10g)、鸡蛋(1个)、苹果(1个)',
    lunch: '炒菜花(100g)、红烧鸡块(150g)、米饭(1.5碗)',
    dinner: '炖土豆(150g)、清蒸鱼(230g)、米饭(1碗)',
    exercise: '跑步(30分钟)、健身-背(60分钟)',
    calories: '-105kal',
  },
  {
    key: '2',
    date: '星期二',
    breakfast: '全麦面包(50g)、牛奶(250ml)、香蕉(1根)',
    lunch: '炒时蔬(150g)、红烧排骨(200g)、米饭(1.5碗)',
    dinner: '番茄炖牛腩(180g)、烤鸡胸肉(200g)、米饭(1碗)',
    exercise: '游泳(45分钟)、健身-腿(60分钟)',
    calories: '-120kal',
  },
  {
    key: '3',
    date: '星期三',
    breakfast: '酸奶(200g)、煎鸡蛋(1个)、燕麦(20g)',
    lunch: '清炒小白菜(100g)、黑椒牛柳(150g)、米饭(1.5碗)',
    dinner: '凉拌黄瓜(100g)、烤鱼(250g)、米饭(1碗)',
    exercise: '骑行(45分钟)、健身-肩(60分钟)',
    calories: '-110kal',
  },
  {
    key: '4',
    date: '星期四',
    breakfast: '豆浆(250ml)、煎蛋(1个)、红薯(1个)',
    lunch: '清蒸菠菜(100g)、糖醋里脊(200g)、米饭(1.5碗)',
    dinner: '炒西蓝花(100g)、烤鸡腿(200g)、米饭(1碗)',
    exercise: '爬山(60分钟)、健身-胸(60分钟)',
    calories: '-130kal',
  },
  {
    key: '5',
    date: '星期五',
    breakfast: '玉米粥(200g)、煎蛋(1个)、梨(1个)',
    lunch: '蒜蓉空心菜(100g)、红烧狮子头(200g)、米饭(1.5碗)',
    dinner: '凉拌金针菇(100g)、清蒸鲈鱼(200g)、米饭(1碗)',
    exercise: '慢跑(40分钟)、健身-手臂(60分钟)',
    calories: '-115kal',
    },
    {
    key: '6',
    date: '星期六',
    breakfast: '牛奶(250ml)、全麦吐司(50g)、猕猴桃(1个)',
    lunch: '炒豆芽(100g)、红烧鸡翅(200g)、米饭(1.5碗)',
    dinner: '沙拉(200g)、烤鸡胸(200g)、米饭(1碗)',
    exercise: '瑜伽(60分钟)、健身-腹部(60分钟)',
    calories: '-100kal',
    },
    {
    key: '7',
    date: '星期日',
    breakfast: '麦片(30g)、酸奶(200g)、葡萄(20g)',
    lunch: '炒苦瓜(100g)、黑椒猪排(150g)、米饭(1.5碗)',
    dinner: '番茄炖鳕鱼(200g)、烧鹌鹑(100g)、米饭(1碗)',
    exercise: '跳绳(30分钟)、健身-全身(60分钟)',
    calories: '-125kal',
    },
    ];
    const WeekPlanContent = () => {
      return (
        <div className="week-plan-content">
          <h2>周计划</h2>
          <Table
            columns={columns}
            dataSource={weekData}
            pagination={false}
            className="week-plan-table"
            rowClassName={(record, index) => (index % 2 === 0 ? 'even-row' : 'odd-row')}
          />
        </div>
      );
    };
    

export default WeekPlanContent;
