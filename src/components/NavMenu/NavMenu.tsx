import React from 'react';
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { Menu } from 'antd';
import { MenuOutlined, UserOutlined, LogoutOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { AppStateType } from '../../redux/redux-store';
import { useSelector } from 'react-redux';

const NavMenu: React.FC = () => {

  const user = useSelector((state: AppStateType) => state.auth.user);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }
  
  return <>
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['home']} style={{lineHeight: '57px'}} overflowedIndicator={<MenuOutlined />}>
        <Menu.Item key="home" > 
          <NavLink className="tags" to="/" style={{ textDecoration: 'none' }}>Расчеты</NavLink>
        </Menu.Item>
        <Menu.Item key="calculation" > 
          <NavLink className="text-white" to="/counter" style={{ textDecoration: 'none' }}>Выполнить расчет</NavLink>
        </Menu.Item>
        <Menu.Item key="files" > 
          <NavLink className="text-white" to="/rastrFiles" style={{ textDecoration: 'none' }}>Режимы</NavLink>
        </Menu.Item>
        <Menu.Item key="users" > 
          <NavLink className="text-white" to="/users" style={{ textDecoration: 'none' }}>Пользователи</NavLink>
        </Menu.Item>
        <Menu.Item key="help" > 
          <QuestionCircleOutlined />
        </Menu.Item>
        <Menu.SubMenu title={localStorage.getItem('user')} icon={<UserOutlined/>} style={{float:'right',marginLeft:'auto'}}>
        <Menu.Item icon={<LogoutOutlined />} >
          <a onClick={logout} href='/'>Выйти</a>
          </Menu.Item>
          </Menu.SubMenu>
      </Menu>
      </>
  }
  export default NavMenu
