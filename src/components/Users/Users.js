import React, { useState } from 'react';
import { Button, Space, Table, Popconfirm } from 'antd';
import UserCreateForm from './UserCreateForm';
import { DeleteOutlined } from '@ant-design/icons';
import s from './Users.module.css';

const handleDelete = (key) => {
//    const newData = dataSource.filter((item) => item.key !== key);
  //  setDataSource(newData);
  };

const columns = [
  {
    title: 'Полное имя',
    dataIndex: 'name',
    key: 'name',
    width: '30%'
  },
  {
    title: 'Логин',
    dataIndex: 'login',
    key: 'login',
    width: '15%'
  },
  {
    title: 'Должность',
    dataIndex: 'post',
    key: 'post',
    width: '35%'
  },
  {
    title: 'Роль',
    dataIndex: 'вап',
    key: 'авпв',
    width: '15%'
  },
  {
    title: ' ',
    key: 'action',
    render: (_, record) => (
        <Popconfirm title="Подвердите удаление" onConfirm={() => handleDelete(record.key)}>
        <a>{<DeleteOutlined/>}</a>
        </Popconfirm>
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
        <div className={s.table}>
            <Table  columns={columns} dataSource={props.users.users} bordered title={() => 'Список пользователей'} />
            <Button style={{float: 'right'}} type="primary" onClick={() => {setOpen(true);}}>Добавить</Button>
            <UserCreateForm open={open} onCreate={onCreate} onCancel={() => {setOpen(false);}}/>
        </div>)}
export default Users;