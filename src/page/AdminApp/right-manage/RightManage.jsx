import React, { useState, useEffect } from 'react'
import { Button, Table, Tag, Modal, Popover, Switch } from 'antd';
import { DeleteOutlined, EditOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import axios from 'axios';
const { confirm } = Modal;
export default function RightManage() {
  useEffect(() => {
    axios.get("/rights?_embed=children").then(res => {
      const list = res.data;
      console.log(list);
      list.forEach(item => {
        if (item.children.length === 0) {
          item.children = "";
        }
      })
      setDataSource(list);
    })
  }, [])
  const [dataSource, setDataSource] = useState([]);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
    },
    {
      title: '权限名',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: '权限路径',
      dataIndex: 'key',
      key: 'key',
      render: (key) => {
        return <Tag color='volcano'>{key}</Tag>
      }
    },
    {
      title: '操作',
      render: (item) => {
        return <div>
          <Popover content={
            <div style={{ textAlign: "center" }}>
              <Switch checked={item.pagepermission} onChange={() => switchPagepermission(item)} >
              </Switch>
            </div>
          } title="配置项" trigger={item.pagepermission === undefined ? "" : "hover"} >
            <Button shape="circle" icon={<EditOutlined />} disabled={item.pagepermission === undefined} />
          </Popover>

          <Button danger shape="circle" icon={<DeleteOutlined />} onClick={() => confirmMethod(item)} />
        </div>
      }
    }
  ];
  const switchPagepermission = (item) => {
    item.pagepermission = item.pagepermission === 1 ? 0 : 1;
    setDataSource([...dataSource]);
    if (item.grade === 1) {
      axios.patch(`/right${item.id}`, { pagepermission: item.pagepermission })
    } else {
      axios.patch(`/right${item.id}`, { pagepermission: item.pagepermission })
    }

  }

  const confirmMethod = (item) => {
    confirm({
      title: '确定要删除吗？',
      icon: <ExclamationCircleOutlined />,
      content: 'Some descriptions',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        deleteMethod(item);
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }
  const deleteMethod = (item) => {
    if (item.grade === 1) {
      setDataSource(dataSource.filter(data => data.id !== item.id));
      axios.delete(`/rights/${item.id}`);
    } else {
      console.log(item.rightId);
      let list = dataSource.filter(data => data.id === item.rightId);
      list[0].children = list[0].children.filter((data) => data.id !== item.id);
      setDataSource([...dataSource]);
      axios.delete(`/children/${item.id}`);
    }
  }

  return (
    <Table dataSource={dataSource} columns={columns} pagination={{ pageSize: 5 }} />
  )
}

