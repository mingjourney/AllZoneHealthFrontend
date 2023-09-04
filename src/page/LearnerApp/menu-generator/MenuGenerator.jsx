import { Breadcrumb, Layout, Menu } from 'antd'
import React, { useEffect, useState } from 'react'
import Sider from 'antd/lib/layout/Sider';
import { Content } from 'antd/lib/layout/layout';
import { Route, Switch } from 'react-router-dom';
// import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import '../Planning/planning.css'

import { renderMenuItems } from '../../../utils/menuUtils'
import FoodToDish from './FoodToDish';
import DishToDetail from './DishToDetail';
import AllFood from './AllFood';
import CalorieOfFood from './CalorieOfFood';
export default function MenuGenerator(props) {

  const [menuList, setMenuList] = useState([]);

  useEffect(() => {
    setMenuList([
      {
        "key": "/menu-generaator/generation",
        "title": "智能生成",
        "pagepermission": true,
        "children": [
          {
            "key": "/menu-generator/generation/foodToDish",
            "title": "食物生成菜单",
            "pagepermission": true
          },
          {
            "key": "/menu-generator/generation/dishToDetail",
            "title": "菜品制作指南",
            "pagepermission": true
          },
        ]
      },
      {
        "key": "/menu-generator/allfood",
        "title": "菜谱大全",
        "pagepermission": true,
      },
      {
        "key": "/menu-generator/caroriesOfDish",
        "title": "热量生成",
        "pagepermission": true,
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
            <Route path="/menu-generator/generation/foodToDish" render={() => <FoodToDish/>} />
            <Route path="/menu-generator/generation/dishToDetail" render={() => <DishToDetail/>} />
            <Route path="/menu-generator/allFood" render={() => <AllFood/>} />
            <Route path="/menu-generator/caroriesOfDish" render={() => <CalorieOfFood  />} />
          </Switch>
        </Content>
      </Layout>
    </>
  )
}
