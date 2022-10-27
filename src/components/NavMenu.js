import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { Menu } from 'antd';

const NavMenu = (props) => {

  return <>
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['home']}>
        <Menu.Item key="home" > 
          <NavLink tag={Link} className="tags" to="/" style={{ textDecoration: 'none' }}>Расчеты</NavLink>
        </Menu.Item>
        <Menu.Item key="calculation" > 
          <NavLink tag={Link} className="text-white" to="/counter" style={{ textDecoration: 'none' }}>Выполнить расчет</NavLink>
        </Menu.Item>
        <Menu.Item key="files" > 
          <NavLink tag={Link} className="text-white" to="/rastrFiles" style={{ textDecoration: 'none' }}>Режимы</NavLink>
        </Menu.Item>
      </Menu>
      </>
  }
  export default NavMenu
