import React from 'react';
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { Menu, Space,SubMenu } from 'antd';
import { MenuOutlined, UserOutlined, LogoutOutlined } from '@ant-design/icons';

const NavMenu = (props) => {

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }
  
  return <>
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['home']} style={{lineHeight: '57px'}} overflowedIndicator={<MenuOutlined />}>
        <Menu.Item key="home" > 
          <NavLink tag={Link} className="tags" to="/" style={{ textDecoration: 'none' }}>Расчеты</NavLink>
        </Menu.Item>
        <Menu.Item key="calculation" > 
          <NavLink tag={Link} className="text-white" to="/counter" style={{ textDecoration: 'none' }}>Выполнить расчет</NavLink>
        </Menu.Item>
        <Menu.Item key="files" > 
          <NavLink tag={Link} className="text-white" to="/rastrFiles" style={{ textDecoration: 'none' }}>Режимы</NavLink>
        </Menu.Item>
        <Menu.Item key="users" > 
          <NavLink tag={Link} className="text-white" to="/users" style={{ textDecoration: 'none' }}>Пользователи</NavLink>
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
