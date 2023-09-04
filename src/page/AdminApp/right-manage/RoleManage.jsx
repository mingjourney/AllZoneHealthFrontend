import { DeleteOutlined, EditOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { Button, Popover, Switch, Modal, Table, Tree } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
const { confirm } = Modal;

export default function RoleManage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rightList, setRightList] = useState([]);
  const [currentRights, setCurrentRights] = useState([]);
  const [dataSource, setDataSource] = useState([]);
  const [currentId, setCurrentId] = useState(0);
  useEffect(() => {
    axios.get(`/roles`).then((res) => {
      console.log(res.data);
      setDataSource(res.data);
    })
  }, [])
  useEffect(() => {
    axios.get(`/rights?_embed=children`).then((res) => {
      console.log(res.data);
      setRightList(res.data);
    })
  }, [])
  const switchPagepermission = () => { }
  const confirmMethod = (item) => {
    confirm({
      title: '确定要删除吗？',
      icon: <ExclamationCircleOutlined />,
      onOk() {
        deleteMethod(item);
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }
  const deleteMethod = (item) => {
    setDataSource(dataSource.filter(data => data.id !== item.id));
    axios.delete(`/roles/${item.id}`);
  }
  const handleOk = () => {
    console.log(currentRights);
    setDataSource(dataSource.map(item => {
      if (item.id === currentId) {
        return {
          ...item,
          rights: currentRights
        }
      }
      return item;
    }))
    axios.patch(`/roles/${currentId}`, { rights: currentRights });
    setIsModalOpen(false);
  }
  const handleCancel = () => {
    setIsModalOpen(false);
  }
  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "角色名称", dataIndex: "roleName", key: "roleName" },
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
            <Button shape="circle" icon={<EditOutlined />} onClick={() => {
              setIsModalOpen(true);
              setCurrentRights(item.rights);
              setCurrentId(item.id);
            }} />
          </Popover>
          <Button danger shape="circle" icon={<DeleteOutlined />} onClick={() => confirmMethod(item)} />
        </div>
      }
    }
  ]
  const onCheck = (checkedKeys) => {
    setCurrentRights(checkedKeys.checked);
  }
  return (
    <div>
      <Table dataSource={dataSource} columns={columns} pagination={{ pageSize: 5 }} rowKey={(item) => item.id}></Table>
      <Modal title="权限分配" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <Tree
          checkable
          checkedKeys={currentRights}
          treeData={rightList}
          onCheck={onCheck}
          checkStrictly={true}
        />
      </Modal>
    </div>

  )
}
