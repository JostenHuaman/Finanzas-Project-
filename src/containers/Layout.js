import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import { useState } from 'react';
import { connect } from 'react-redux';
import * as actions from '../store/actions/auth'
import { Outlet, useNavigate } from 'react-router-dom';

const { Header, Sider, Content } = Layout;
const CustomLayout = (props) => {
  console.log(props)
  const navigate= useNavigate();
  const handleClickHome = () =>{
    navigate("/")
  }
  const handleClickAbout = () =>{
    navigate("/about/")
  }
  const handleClickLogin = () =>{
    navigate("/login/")
  }
  const handleClickSignUp = () =>{
    navigate("/signup/")
  }
  const items=[
    {
      key:"1",
      label: (<a onClick={handleClickHome}>Home</a>),
    },
    {
      key:"2",
      label: (<a onClick={handleClickAbout}>About Us</a>)
    },
    {
      key:"3",
      label: (<a onClick={handleClickLogin}>Login</a>),
    },
    {
      className:"li-signup",
      key:"4",
      label: (<a onClick={handleClickSignUp} className='button-signup'>Sign Up</a>),
    },
  ]
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout className="layout">
      <Header
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'end',
        }}
      >
        <div className="demo-logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          items={items}
        />
      </Header>
      <Outlet style={{width:100+"%"}}></Outlet>
    </Layout>
  );
};
const mapDispatchToProps = dispatch =>{
    return {
        logout: ()=> dispatch(actions.logout())
    }
}
export default connect(null,mapDispatchToProps)(CustomLayout);