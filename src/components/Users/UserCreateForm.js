import React, { useState } from 'react';
import { Button, Form, Input, Modal, Radio } from 'antd';
const UserCreateForm = ({ open, onCreate, onCancel }) => {
  const [form] = Form.useForm();
  return (
    <Modal open={open} title="Добавить нового опльзователя" okText="Создать" cancelText="Отмена" onCancel={onCancel}
      onOk={() => {
        form.validateFields().then((values) => {
            form.resetFields();
            onCreate(values);
          })
          .catch((info) => {console.log('Validate Failed:', info);});
      }}>
      <Form form={form} layout="vertical" name="form_in_modal" initialValues={{modifier: 'public',}}>
        <Form.Item name="name" label="Имя" rules={[{required: true, message: 'Введите имя',},]}>
          <Input />
        </Form.Item>
        <Form.Item name="surName" label="Фамилия" rules={[{required: true, message: 'Введите фамилию',},]}>
          <Input type="textarea" />
        </Form.Item>
        <Form.Item name="lastName" label="Отчество" rules={[{required: true, message: 'Введите отчество',},]}>
          <Input type="textarea" />
        </Form.Item>
        <Form.Item name="post" label="Должность" rules={[{required: true, message: 'Введите должность',},]}>
          <Input type="textarea" />
        </Form.Item>
        <Form.Item name="login" label="Логин" rules={[{required: true, message: 'Введите логин',},]}>
          <Input type="textarea" />
        </Form.Item>
        <Form.Item name="password" label="Пароль" rules={[{required: true, message: 'Введите пароль',},]}>
          <Input type="textarea" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UserCreateForm;