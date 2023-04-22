import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, Dropdown } from 'antd';
import { SettingOutlined } from '@ant-design/icons';

const { SubMenu } = Menu;

const menu = (
  <Menu style={{paddingLeft: 30}}>
    <Menu.Item key={"/staff"}>
      <Link to="/staff">
            Danh sách nhân viên
      </Link>
    </Menu.Item>
    <Menu.Item key={"/attendance-management"}>
      <Link to="/attendance-management">
        Quản lý công
      </Link>
    </Menu.Item>
  </Menu>
);

const Navbar = () => {
  const location= useLocation()

  return (
    <Menu mode={"inline"} style={{maxWidth: 350 }} selectedKeys={[location.pathname]} defaultOpenKeys={["sub-menu"]}>
      <Menu.Item key="/">
        <Link to="/">Trang chủ</Link>
      </Menu.Item>
      <Menu.Item key="/time-sheets">
        <Link to="/time-sheets">Bảng công</Link>
      </Menu.Item>
      <SubMenu inline key="sub-menu" icon={<SettingOutlined />} title="Quản lý nhân sự">
        {menu}
      </SubMenu>
      <Menu.Item key="/information">
        <Link to="/information">Thông tin</Link>
      </Menu.Item>
    </Menu>
  );
};

export default Navbar;