import React, { useEffect, useState } from 'react';
import { Layout, Menu } from 'antd';
import { withRouter } from 'react-router-dom';
import {
    UserOutlined, HomeOutlined, BookOutlined, MessageOutlined
} from '@ant-design/icons';
import './userHeader.css'
const { Header } = Layout;
function UserHeader(props) {
    const [menuList, setMenuList] = useState([]);
    // useEffect(() => {
    //   axios.get("/rights?_embed=children").then(
    //     (res) => {
    //       setMenuList(res.data);
    //     })
    // }
    //   , [])
    const iconList = {
        "/": { icon: <HomeOutlined /> },
        "/course": { icon: <BookOutlined /> },
        "/planning": { icon: <BookOutlined /> },
        "/menu-generator": { icon: <BookOutlined /> },
        "/consultation": { icon: <MessageOutlined /> },
    };
    useEffect(() => {
        setMenuList([
            { key: '/', title: '首页', isPagePermission: true },
            { key: '/course',
              title: '课程',
              isPagePermission: true,
            //   children: [
            //     {
            //         key: '/course/nutritionIntroduction',
            //         title: '营养学入门',
            //         isPagePermission: true,
            //     },
            //     {
            //         key: '/course/healthydiet',
            //         title: '健康饮食指南',
            //         isPagePermission: true,
            //     },
            //     {
            //         key: '/course/Slimming',
            //         title: '减肥秘籍',
            //         isPagePermission: true,
            //     },
            // ],
            },
            { key: '/planning', title: '智能规划', isPagePermission: true },
            { key: '/menu-generator', title: '智能菜谱生成', isPagePermission: true },
            { key: '/consultation', title: '私人咨询', isPagePermission: true }
        ]
        )
    }, [])
    const isPagePermission = (item) => {
        return 1;
        // return item.pagepermission && rights.includes(item.key);
    }
    const renderMenuItems = (menuList) => {
        return menuList.map((item) => {
            // if (item.children?.length > 0 && isPagePermission(item)) {
            //     return {
            //         label: item.title,
            //         key: item.key,
            //         icon: iconList[item.key].icon,
            //         children: renderMenuItems(item.children),
            //     };
            // }
    
            if (isPagePermission(item)) {
                return {
                    label: item.title,
                    key: item.key,
                    icon: iconList[item.key] ? iconList[item.key].icon : <UserOutlined/>,
                    onClick: () => {
                        props.history.push(item.key);
                    },
                };
            }
    
            return null;
        }).filter(item => item !== null);
    };
    //解决二级忽略 与'/'路径的 undefied
    const selectKeys = [props.location.pathname.split("/")[1] ? "/" + props.location.pathname.split("/")[1] : "/"];
    // 未解决'/'
    const openKeys = ["/" + props.location.pathname.split("/")[1]];
    const menuItems = renderMenuItems(menuList);

    return (
        <Header>
            <div className="learner-logo">
                <img src="../../../image/veg-logo.svg" alt="" style={{ width: '33px' }} />
                <span>All Zone Health</span>
            </div>
            <Menu
                theme="dark"
                mode="horizontal"
                selectedKeys={selectKeys}
                defaultOpenKeys={openKeys}
                items={menuItems}
                style={{ display: 'inline-block' }}
                className="top-menu"
            />
            <div style={{ "float": "right" }}>
                <span>欢迎管理<a href='/#/admin'>
                    {/* {username} */}
                    gugu
                </a></span>
                {"\u00a0\u00a0\u00a0\u00a0"}
                <a href='/#/admin'>
                    <UserOutlined />
                </a>
            </div>
        </Header>
    );
}

export default (withRouter(UserHeader));
