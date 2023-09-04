import React, { useState, useEffect, useRef } from 'react'
import { Button, Table, Modal, Switch } from 'antd';
import { DeleteOutlined, EditOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import axios from 'axios';
import UserForm from '../../../components/admin-user-manage/UserForm';
import './userList.css';
const { confirm } = Modal;
export default function UserList() {
  const addForm = useRef(null);
  const updateForm = useRef(null);
  const [isUpdateForbidden, setIsUpdateForbidden] = useState(false);
  const [timestamp, setTimestamp] = useState(Date.now());
  const [currentItem, setcurrentItem] = useState(null);
  const [roleList, setRoleList] = useState([]);
  const [countryList, setContryList] = useState([]);
  const { roleId, country } = JSON.parse(localStorage.getItem("token"));
  useEffect(() => {
    axios.get("/users?_expand=role").then(res => {
      const userList = res.data;
      if (roleId === 1) {
        setDataSource(userList);
      } else {
        setDataSource([
          ...res.data.filter((item) => item.country === country && item.roleId === roleId),
          ...res.data.filter((item) => item.roleId === 3)
        ]
        )
      }
    })
  }, [roleId, country])
  useEffect(() => {
    axios.get("/countries").then(res => {
      setContryList(res.data);
    })
  }, [])
  useEffect(() => {
    axios.get("/roles").then(res => {
      setRoleList(res.data);
    })
  }, [])
  const [dataSource, setDataSource] = useState([]);
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
    },
    {
      title: '角色名',
      dataIndex: 'role',
      render: (role) => {
        return role.roleName;
      }
    },
    {
      title: '用户名',
      dataIndex: 'username',
    },
    {
      title: '国家',
      dataIndex: 'country',
      filters: [
        ...countryList.map(item => ({
          text: item.title,
          value: item.value
        }))
        , { text: "世界", value: "世界" }
      ]
      ,
      onFilter: (value, item) => {
        if (value === "世界") return item.country === ""
        return item.country === value
      }
    },
    {
      title: '用户状态',
      dataIndex: 'username',
      render: (roleState, item) => {
        return <Switch checked={item.roleState} disabled={item.default} onChange={() => {
          handleSwitchChange(item);
        }}></Switch>
      }
    },
    {
      title: '操作',
      render: (item) => {
        return <div>
          <Button danger shape="circle" icon={<DeleteOutlined />} disabled={item.default} onClick={() => confirmMethod(item)} />
          {"\u00a0\u00a0\u00a0\u00a0"}
          <Button type='primary' shape='circle' icon=<EditOutlined /> disabled={item.default} onClick={() => handleUpdate(item)} />
        </div>
      }
    }
  ];

  const handleSwitchChange = (item) => {
    console.log(item);
    item.roleState = !item.roleState;
    setDataSource([...dataSource]);
    axios.patch(`/users/${item.id}`, { roleState: item.roleState })
  }
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
    setDataSource(dataSource.filter((data) => data.id !== item.id));
    axios.delete(`/users/${item.id}`);

  }
  const [addOpen, setAddOpen] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(false);
  const addFormOk = () => {
    console.log(addForm);
    addForm.current.validateFields().then(value => {
      setAddOpen(false);
      addForm.current.resetFields();
      console.log("res.data", { ...value })
      axios.post(`/users`,
        { ...value, "roleState": true, "default": false })
        .then((res) =>
          setDataSource([...dataSource, {
            ...res.data,
            role: roleList.filter(
              (item) => {
                return item.id === res.data.roleId
              }
            )[0]
          }])
        )
    }).catch(err => {
      console.log(err);
    })
  }

  const handleUpdate = async (item) => {
    await setUpdateOpen(true)
    if (item.roleId === 1) {
      setIsUpdateForbidden(true);
    } else {
      setIsUpdateForbidden(false);
    }
    setcurrentItem(item);
    await updateForm.current.setFieldsValue(item)
  }

  const updateFormOk = () => {
    console.log(updateForm);
    updateForm.current.validateFields().then(value => {
      setUpdateOpen(false);
      axios.patch(`/users/${currentItem.id}`, value).then(response => {
        axios.get(`/users?_expand=role`).then(response => {
          setDataSource(response.data);
        })
      })
      console.log(value);
    })
  }
  return (
    <div>
      <Button onClick={() => {
        setAddOpen(true);
      }}>添加用户</Button>
      <Table dataSource={dataSource} columns={columns} pagination={{ pageSize: 8 }} rowKey={item => item.id} />
      <Modal
        open={addOpen}
        title="添加用户"
        okText="确定"
        cancelText="取消"
        onCancel={() => {
          setAddOpen(false);
        }}
        onOk={() => {
          addFormOk()
        }}
      >
        <UserForm countryList={countryList} roleList={roleList} ref={addForm} />
      </Modal>

      <Modal
        open={updateOpen}
        title="更新用户"
        okText="更新"
        cancelText="取消"
        onCancel={() => {
          setTimestamp(Date.now())
          setUpdateOpen(false);
        }}
        onOk={() => updateFormOk()}
      >
        <UserForm countryList={countryList}
          roleList={roleList}
          ref={updateForm}
          isUpdateForbidden={isUpdateForbidden}
          getTime={timestamp}
          isUpdateForm={true}
        />
      </Modal>
    </div >
  )
}

