import React, { useState } from 'react';
import { Button, Space, Table, Popconfirm } from 'antd';
import UserCreateForm from './UserCreateForm';
import { DeleteOutlined } from '@ant-design/icons';
import s from './Users.module.css';
import { ColumnsType } from 'antd/lib/table';
import { usersType } from '../../types/types';

const handleDelete = (key: string) => {
//    const newData = dataSource.filter((item) => item.key !== key);
  //  setDataSource(newData);
  };

const columns: ColumnsType<usersType> = [
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
        <Popconfirm title="Подвердите удаление" onConfirm={() => handleDelete(record.login)}>
        <a>{<DeleteOutlined style={{color: 'blue'}}/>}</a>
        </Popconfirm>
    ),
  },
];

type PropsType = {
  users: Array<usersType>
  spin: boolean
  createUser: (user: usersType) => void
};

const Users: React.FC<PropsType> = (props) => {
    const [open, setOpen] = useState(false);

    const onCreate = (user: any) => {
      console.log('Received values of form: ', user);
      props.createUser(user);
      setOpen(false);
    };

    return (
        <div className={s.table}>
            <Table loading={props.spin}  columns={columns} dataSource={props.users} bordered title={() => 'Список пользователей'} />
            <Button style={{float: 'right'}} type="primary" onClick={() => {setOpen(true);}}>Добавить</Button>
            <UserCreateForm open={open} onCreate={onCreate} onCancel={() => {setOpen(false);}}/>
        </div>)}
export default Users;