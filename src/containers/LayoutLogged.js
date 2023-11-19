import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  CarOutlined,
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
const CustomLayoutLogged = (props) => {
  console.log(props)
  const navigate= useNavigate();
  const [username, setUsername]= useState(localStorage.getItem("username"))
  const handleClickHome = () =>{
    navigate("/home/")
  }
  const handleClickAbout = () =>{
    navigate("/about/")
  }
  const handleClickLogin = () =>{
    navigate("/login/")
  }
  const handleClickLogout = () =>{
    props.logout()
    navigate("/login/")
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
      label: (<a onClick={handleClickLogin}>Logout</a>),
    },
  ]
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider 
        style={{
          flex: '0 0 auto',
        }}  
        trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={[
            {
              key: '1',
              icon: <CarOutlined />,
              label: 'Credit Car',
            },
            {
              key: '2',
              icon: <LogoutOutlined />,
              label: (<a onClick={handleClickLogout}> Logout</a>)
            }
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            display:'flex',
            padding: 0,
            background: colorBgContainer,
          
            flexDirection: "row",
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
          <div style={{justifyContent: "end", display:"flex",width:"100%", marginRight:"2vh"}}>{username}</div>
        </Header>
        <Outlet  style={{width:80+"%"}}/>
      </Layout>
    </Layout>
  );
};
const mapDispatchToProps = dispatch =>{
    return {
        logout: ()=> dispatch(actions.logout())
    }
}
export default connect(null,mapDispatchToProps)(CustomLayoutLogged);