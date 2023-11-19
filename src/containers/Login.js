import React from 'react';
import { Button, Spin, Form, Input } from 'antd';
import { NavLink, useNavigate } from 'react-router-dom'
import { LockOutlined, UserOutlined, LoadingOutlined } from '@ant-design/icons';
import { connect } from 'react-redux'
import * as actions from '../store/actions/auth';

const antIcon = (<LoadingOutlined style={{ fontSize: 24, }} spin />
);

const Login = (props) => {
    const ReturnPage = useNavigate();
    let errorMessage = null;
    if (props.error) {
        errorMessage = (
            <p>{props.error.message}</p>
        );
    }
    const DateNow= new Date (new Date())
    const expirationDate= new Date( new Date().getTime() +3600*1000);
    const onFinish = (values) => {
        props.onAuth(values.userName, values.password)
        ReturnPage('/credits')
        //console.log(DateNow)
        //console.log(expirationDate)
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
        
    };
    return (
        
        <div className="customFormItem" style={{display: "flex", justifyContent: "center", height: "90vh", alignItems: "center"}}>
            {errorMessage} 
            {
                props.loading ?
                    <Spin indicator={antIcon} />
                    :
                    <Form
                        name="basic"
                        labelCol={{
                            span: 8,
                        }}
                        wrapperCol={{
                            span: 16,
                        }}
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                        style={{display:"flex",width:"550px", justifyContent:"center", alignItems:"center", flexDirection:"column"}}
                    >
                        <Form.Item
                            name="userName"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your username!',
                                },
                            ]}
                            style={{minWidth:305+'px',maxWidth:550+'px',display:"flex", justifyContent:"center", alignItems:"center", flexDirection:"column"}} 
                        >
                            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" style={{width:"250px"}}/>
                        </Form.Item>

                        <Form.Item
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your password!',
                                },
                            ]}
                            style={{minWidth:305+'px',maxWidth:500+'px', paddingLeft: 25+'px',paddingRight: 25+'px' , marginTop: 2+'%'}} 
                        >
                            <Input.Password prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                placeholder="Password" 
                                style={{width:"250px"}}/>
                        </Form.Item>

                        <Form.Item style={{minWidth: 305+'px',maxWidth:"500px", paddingBottom:30+'px', display:"flex", justifyContent:"center"}}>
                            <div style={{width:"150px"}}>
                              <Button type="primary" htmlType='submit' style={{ marginRight: '10px' }}>Login</Button>
                              Or
                              <NavLink
                                  style={{ marginRight: '10px' }}
                                  to='/signup/'> signup
                              </NavLink>
                            </div>
                        </Form.Item>
                    </Form>
            }
        </div>

    );
};

const mapStateToProps = (state) => {
    return {
        loading: state.loading,
        error: state.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (username, password) => dispatch(actions.authLogin(username, password))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);