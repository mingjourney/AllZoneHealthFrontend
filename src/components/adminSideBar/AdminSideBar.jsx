import React, { useEffect, useState } from 'react'
import { Layout, Menu } from 'antd';
import './index.css'
import { withRouter } from 'react-router-dom';

import {
  UserOutlined,
  HomeOutlined,
  TeamOutlined,
  AuditOutlined,
  EditOutlined,
  UploadOutlined,
  HeartOutlined,
  ProfileOutlined
} from '@ant-design/icons';
import { connect } from 'react-redux';
const { Sider } = Layout;
const iconList = {
  "/home": <HomeOutlined />,
  "/user-manage": <UserOutlined />,
  "/right-manage": <TeamOutlined />,
  "/right-manage/role/list": '',
  "/right-manage/right/list": '',
  "/knowledge-manage": <EditOutlined />,
  "/audit-manage": <AuditOutlined />,
  "/publish-manage": <UploadOutlined />,
  "/persondata-manage": <ProfileOutlined />
}
function AdminSideBar(props) {
  const [menuList, setMenuList] = useState([]);
  // useEffect(() => {
  //   axios.get("/rights?_embed=children").then(
  //     (res) => {
  //       setMenuList(res.data);
  //     })
  // }
  //   , [])
  useEffect(()=>{
    setMenuList([
      {
        "key": "/admin/home",
        "title": "首页",
        "pagepermission": true
      },
      {
        "key": "/admin/user-manage",
        "title": "用户管理",
        "pagepermission": true
      },
      {
        "key": "/admin/persondata-manage",
        "title": "个人数据管理",
        "children": [
          {
            "key": "/admin/persondata-manage/targetEntering",
            "title": "目标录入与修改",
            "pagepermission": true
          },
          {
            "key": "/admin/persondata-manage/physicalSignentry",
            "title": "每日达成录入",
            "pagepermission": true
          }
        ]
      },
      {
        "key": "/admin/right-manage",
        "title": "权限管理",
        "pagepermission": true,
        "children": [
          {
            "key": "/admin/right-manage/role/list",
            "title": "角色列表",
            "pagepermission": true
          },
          {
            "key": "/admin/right-manage/right/list",
            "title": "权限列表",
            "pagepermission": true
          }
        ]
      },
      {
        "key": "/admin/knowledge-manage",
        "title": "课程管理",
        "pagepermission": true
      },
      {
        "key": "/admin/audit-manage",
        "title": "审核管理",
        "pagepermission": true
      },
      {
        "key": "/admin/publish-manage",
        "title": "发布管理",
        "pagepermission": true
      }
    ]
    )
  },[])
  const isPagePermission = (item) => {
    return 1;
    // return item.pagepermission && rights.includes(item.key);
  }
  // const { role: { rights } } = JSON.parse(localStorage.getItem("token") || '');
  const renderMenuItems = (menuList) => {
    return menuList.map((item) => {
      if (item.children?.length > 0 && isPagePermission(item)) {
        return {
          label: item.title,
          key: item.key,
          icon: iconList[item.key],
          children: renderMenuItems(item.children),
        };
      }
  
      if (isPagePermission(item)) {
        return {
          label: item.title,
          key: item.key,
          icon: iconList[item.key],
          onClick: () => {
            props.history.push(item.key);
          },
        };
      }
  
      return null;
    }).filter(item => item !== null);
  };
  const selectKeys = props.location ? [props.location.pathname] : [];
  const openKeys = props.location ? ["/" + props.location.pathname.split("/")[1]] : [];
  const menuItems = renderMenuItems(menuList);

  return (
    <Sider style={{ height: "100%" }} trigger={null} collapsible collapsed={props.isFold}>
    <div style={{ minHeight: "100%", display: "flex", flexDirection: "column" }}>
      <div className="logo" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <HeartOutlined />
        {props.isFold ? '': <span style={{'marginLeft':"10px" ,"marginRight":"10px"}}>平台个人页面</span>}
      </div>
      <div style={{ flex: 1, overflow: "auto" }}>
        <Menu theme='dark' mode="inline" selectedKeys={selectKeys} defaultOpenKeys={openKeys} items={menuItems}>
        </Menu>
      </div>
    </div>
  </Sider>
  )
}
const mapStateToProps = ({ FoldReducer: { isFold } }) => ({ isFold })

export default connect(mapStateToProps)(withRouter(AdminSideBar));
