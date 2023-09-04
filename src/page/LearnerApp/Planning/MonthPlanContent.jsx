import React, { useEffect, useState } from 'react';
import { Badge, Calendar } from 'antd';
import './monthPlan.css';

const MonthPlan = () => {
  const [monthPlans, setMonthPlans] = useState([]);

  useEffect(() => {
    // 在这里调用 getMonthPlans 函数，并将结果存储在 monthPlans 状态变量中
    // 例如：setMonthPlans(await getMonthPlans());
    setMonthPlans([

      // 5月份
      {
        date: new Date('2023-05-01'),
        calories: -200,
        exercise: '跑步(30分钟)、健身-背(60分钟)',
      },
      {
        date: new Date('2023-05-02'),
        calories: -150,
        exercise: '跑步(25分钟)、健身-胸(45分钟)',
      },
      {
        date: new Date('2023-05-03'),
        calories: -150,
        exercise: '健身-腿部(60分钟)',
      },
      {
        date: new Date('2023-05-04'),
        calories: 0,
        exercise: '',
      },
      {
        date: new Date('2023-05-05'),
        calories: -250,
        exercise: '游泳(30分钟)、健身-背部(60分钟)',
      }, {
        date: new Date('2023-05-06'),
        calories: -200,
        exercise: '跑步(25分钟)、健身-手臂(45分钟)',
      },
      {
        date: new Date('2023-05-07'),
        calories: 0,
        exercise: '',
      },
      {
        date: new Date('2023-05-08'),
        calories: -150,
        exercise: '健身-腿部(60分钟)',
      },
      {
        date: new Date('2023-05-09'),
        calories: -200,
        exercise: '跑步(20分钟)、健身-胸肌和三头肌(45分钟)',
      },
      {
        date: new Date('2023-05-10'),
        calories: -150,
        exercise: '健身-背部(60分钟)',
      },
      {
        date: new Date('2023-05-11'),
        calories: 0,
        exercise: '',
      },
      {
        date: new Date('2023-05-12'),
        calories: -250,
        exercise: '游泳(30分钟)、健身-手臂(45分钟)',
      },

      {
        date: new Date('2023-05-13'),
        calories: -200,
        exercise: '跑步(25分钟)、健身-腹肌(45分钟)',
      },
      {
        date: new Date('2023-05-14'),
        calories: 0,
        exercise: '',
      },
      {
        date: new Date('2023-05-15'),
        calories: -250,
        exercise: '游泳(30分钟)、健身-背部(60分钟)',
      },
      {
        date: new Date('2023-05-16'),
        calories: -200,
        exercise: '跑步(25分钟)、健身-手臂(45分钟)',
      },
      {
        date: new Date('2023-05-17'),
        calories: -150,
        exercise: '健身-腿部(60分钟)',
      },
      {
        date: new Date('2023-05-18'),
        calories: 0,
        exercise: '',
      },
      {
        date: new Date('2023-05-19'),
        calories: -200,
        exercise: '跑步(20分钟)、健身-胸肌和三头肌(45分钟)',
      },
      {
        date: new Date('2023-05-20'),
        calories: -150,
        exercise: '健身-背部(60分钟)',
      },
      {
        date: new Date('2023-05-21'),
        calories: 0,
        exercise: '',
      },
      {
        date: new Date('2023-05-22'),
        calories: -250,
        exercise: '游泳(30分钟)、健身-手臂(45分钟)',
      },
      {
        date: new Date('2023-05-23'),
        calories: -200,
        exercise: '跑步(25分钟)、健身-腹肌(45分钟)',
      },
      {
        date: new Date('2023-05-24'),
        calories: -150,
        exercise: '健身-腿部(60分钟)',
      },
      {
        date: new Date('2023-05-25'),
        calories: 0,
        exercise: '',
      },
      {
        date: new Date('2023-05-26'),
        calories: -200,
        exercise: '跑步(20分钟)、健身-胸肌和三头肌(45分钟)',
      },
      {
        date: new Date('2023-05-27'),
        calories: -150,
        exercise: '健身-背部(60分钟)',
      },
      {
        date: new Date('2023-05-28'),
        calories: 0,
        exercise: '',
      },
      {
        date: new Date('2023-05-29'),
        calories: -250,
        exercise: '游泳(30分钟)、健身-手臂(45分钟)',
      },
      {
        date: new Date('2023-05-30'),
        calories: -200,
        exercise: '跑步(25分钟)、健身-腹肌(45分钟)',
      },]
    )
  }, []);

  const dateCellRender = (value) => {
    const listData = monthPlans.filter(
      (plan) => plan.date.getDate() === value.date()
    );

    return (
      <ul className="events">
        {listData.map((item, index) => (
          <React.Fragment key={index}>
            <li>
              <Badge
                status={item.calories < 0 ? 'success' : 'error'}
                text={`卡路里：${item.calories}`}
              />
            </li>
            <li>
              <Badge status="warning" text={`运动：${item.exercise}`} />
            </li>
          </React.Fragment>
        ))}
      </ul>
    );
  };

  return (
    <div className="month-plan">
      <h2>月计划</h2>
      <Calendar dateCellRender={dateCellRender} />
    </div>
  );
};

export default MonthPlan;
