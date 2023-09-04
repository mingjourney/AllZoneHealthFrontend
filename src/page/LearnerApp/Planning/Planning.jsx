import { Breadcrumb, Layout, Menu } from 'antd'
import React, { useEffect, useState } from 'react'
import Sider from 'antd/lib/layout/Sider';
import { Content } from 'antd/lib/layout/layout';
import { Route, Switch } from 'react-router-dom';
// import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import './planning.css'
import DayPlanContent from './DayPlanContent';
import WeekPlanContent from './WeekPlanContent';
import MonthPlanContent from './MonthPlanContent';
import {  renderMenuItems } from '../../../utils/menuUtils'
export default function Planning(props) {

  const [menuList, setMenuList] = useState([]);

  useEffect(() => {
    setMenuList([
      {
        "key": "/planning/day",
        "title": "日计划",
        "pagepermission": true,
        "children": [
          {
            "key": "/planning/day/hard",
            "title": "困难",
            "pagepermission": true
          },
          {
            "key": "/planning/day/medium",
            "title": "适中",
            "pagepermission": true
          },
          {
            "key": "/planning/day/easy",
            "title": "简单",
            "pagepermission": true
          }
        ]
      },
      {
        "key": "/planning/week",
        "title": "周计划",
        "pagepermission": true,
        "children": [

        ]
      },
      {
        "key": "/planning/month",
        "title": "月计划",
        "children": [

        ]
      },
    ]);
  }, [])

  const selectKeys = props.location ? [props.location.pathname] : [];
  const openKeys = props.location ? ["/" + props.location.pathname.split("/")[1]] : [];
  const menuItems = renderMenuItems(menuList, props.history);

  return (
    <>
      <Breadcrumb
        style={{
          margin: '16px 0',
        }}
      >
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>List</Breadcrumb.Item>
        <Breadcrumb.Item>App</Breadcrumb.Item>
      </Breadcrumb>
      <Layout
        className="site-layout-background"
        style={{
          padding: '24px 0',
          display: "flex",
          flexDirection: 'row',
          height:"82vh",
          overflow:"auto"
        }}
      >
        <Sider className="site-layout-background" width={200}>
          <Menu
            mode="inline"
            selectedKeys={selectKeys}
            defaultOpenKeys={openKeys}
            items={menuItems}
            style={{
              height: '100%',
            }}
          />
        </Sider>
        <Content
          style={{
            width: "500px",
            padding: '0 24px',
            minHeight: "800px",
          }}
        >
          <Switch>
            <Route path="/planning/day/hard" render={() => <DayPlanContent level="hard" />} />
            <Route path="/planning/day/medium" render={() => <DayPlanContent level="medium" />} />
            <Route path="/planning/day/easy" render={() => <DayPlanContent level="easy" />} />
            <Route path="/planning/week" component={WeekPlanContent} />
            <Route path="/planning/month" component={MonthPlanContent} />
          </Switch>
        </Content>
      </Layout>
    </>
  )
}
