import { Header } from 'antd/lib/layout/layout'
import React from 'react'
import './adminHeader.css'
import { Button, Dropdown } from 'antd'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
function AdminHeader(props) {
  // const { role: { roleName }, username } = JSON.parse(localStorage.getItem("token") || '');
  const changeFold = () => {
    props.changeIsFold();
  }
  const items = [
    {
      key: '1',
      // label: roleName
      label:"roleName静"
    },
    {
      key: '2',
      danger: true,
      label: '退出',
      onClick: () => {
        localStorage.removeItem("token");
        props.history.replace("/login");
      }
    },
  ];
  return (
    <Header
      className="site-layout-background" style={{ padding: "0 16px" }}>
      {
        props.isFold ? <MenuFoldOutlined onClick={changeFold} /> : <MenuUnfoldOutlined onClick={changeFold} />
      }
      <Button type="primary" ghost style={{ marginLeft: "20px", color: "#67bb6e", border: "1px solid #67bb6e" }} onClick={() => props.history.push("/")}>
        健康主页
      </Button>
      <div style={{ float: "right" }}>
        <span>欢迎管理<a >
          {/* {username} */}
          gugu
        </a></span>
        {"\u00a0\u00a0\u00a0\u00a0"}
        <Dropdown menu={{ items }}>
          <a onClick={(e) => e.preventDefault()}>
            <UserOutlined />
          </a>
        </Dropdown>
      </div>
    </Header>
  )
}
//mapStateToProps
//mapDispatchToProps
const mapStateToProps = ({ FoldReducer: { isFold } }) => {
  return { isFold };
}
const mapDispatchToProps = {
  changeIsFold() {
    return {
      type: "change_isFold"
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AdminHeader));