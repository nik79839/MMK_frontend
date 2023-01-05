import { Button, Form, Input,Row, Card, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import {useNavigate} from "react-router-dom"
import './Auth.css';
import React from 'react';
import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../../redux/auth-reducer';
import { AppStateType } from '../../redux/redux-store';


export const Auth: React.FC = () => {

  const user = useSelector((state: AppStateType) => state.auth.user);
  const dispatch: Dispatch<any> = useDispatch();
  let navigate = useNavigate();
  const onFinish = async (values: any) => {
      try { 
        await dispatch(getUser(values));
        message.success('Успешный вход');
        navigate("/");}
      catch {
        message.error('Указаны неверные имя пользователя или пароль');
      } 
      };

    return (<div>
        <Row justify='center' align= 'middle' style={{minHeight: '70vh'}}>
          <Card className='card' >
        <Form name="basic"  initialValues={{remember: true,}} 
            autoComplete="on" onFinish={onFinish} className="login-form">
          <Form.Item name="login"rules={[{required: true, message: 'Please input your username!',},]}>
            <Input prefix={<UserOutlined/>} placeholder="Логин"/>
          </Form.Item>
    
          <Form.Item name="password" rules={[{required: true, message: 'Please input your password!',},]}>
            <Input.Password prefix={<LockOutlined className="site-form-item-icon"/>} placeholder="Пароль" />
          </Form.Item>
    
          <Form.Item wrapperCol={{offset: 8,span: 16,}}>
            <Button type="primary" htmlType="submit">
              Вход
            </Button>
          </Form.Item>
        </Form>
        </Card>
        </Row>
        </div>)
}
export default Auth;