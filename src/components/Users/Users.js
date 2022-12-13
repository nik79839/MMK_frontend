import React, { useState } from 'react';
import { Button, Space, Table, Tag } from 'antd';
import UserCreateForm from './UserCreateForm';
const columns = [
  {
    title: 'Полное имя',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Логин',
    dataIndex: 'login',
    key: 'login',
  },
  {
    title: 'Должность',
    dataIndex: 'post',
    key: 'post',
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <a>Invite {record.name}</a>
        <a>Delete</a>
      </Space>
    ),
  },
];
const Users = (props) => {
    const [open, setOpen] = useState(false);
    const onCreate = (user) => {
      console.log('Received values of form: ', user);
      props.createUser(user);
      setOpen(false);
    };

    return (
        <div>
            <Button type="primary" onClick={() => {setOpen(true);}}>Добавить</Button>
            <Table columns={columns} dataSource={props.users.users} bordered title={() => 'Список пользователей'} />
            <UserCreateForm open={open} onCreate={onCreate} onCancel={() => {setOpen(false);}}/>
        </div>)}
export default Users;