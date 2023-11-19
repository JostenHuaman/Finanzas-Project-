import React, {useEffect, useState} from 'react';
import { Form, Input, Button, Alert } from 'antd';
import { NavLink, useNavigate } from 'react-router-dom'
import { LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import * as actions from '../store/actions/auth';

const RegistrationForm = (props) => {

    const [showAlertError, setShowAlertError] = useState(false);
    const [messageError, setMessageError]= useState("")

    const ReturnPage = useNavigate();
    const [form] = Form.useForm();
    const onFinish = (values) => {
        props.onAuth(
            values.userName,
            values.email,
            values.password,
            values.confirm
        )

        //ReturnPage(0);
    };

    const CloseAlertError=()=>{
        setShowAlertError(false)
      }

    const onSubmitErrorMessage = (Message) => {
        setShowAlertError(true)
        const MessageClean=Message? Message.replace(/[\[\]']/g, '').trim():[];
        setMessageError(MessageClean)
      };

    async function fecthAlertOnRefresh(){
        const showAlertAfterRefresh = localStorage.getItem('showAlertAfterRefresh');
        const errMessage = localStorage.getItem("errMessage")
        const resultString = errMessage
        console.log(showAlertAfterRefresh)
        console.log(resultString)
        if (showAlertAfterRefresh === 'true') {
            setShowAlertError(true);
            setMessageError(resultString)
            localStorage.removeItem('showAlertAfterRefresh');
            localStorage.removeItem('errMessage');
        }
    }
    useEffect(() => {
        fecthAlertOnRefresh();
    }, [])

    return (
        <>
        {showAlertError && (
            <div style={{ display: "flex",
                position: "absolute",
                width:"100%",
                height: "10%",
                top: "1vh",
                left:"1px",
                justifyContent:"center"
                }}>
                <Alert
                message="Error"
                description={<span>{messageError}</span>}
                style={{display: "flex",
                    position: "relative",
                    zIndex: "101",
                    width: "590px",
                    height:"20vh"}}
                type="error"
                showIcon
                closable
                onClose={() => CloseAlertError()}
              />
            </div>
        )}
        <div style={{display: "flex", justifyContent: "center", height: "90vh", alignItems: "center"}}>
            
            <Form
                form={form}
                name="register"
                onFinish={onFinish}
                initialValues={{
                    residence: ['zhejiang', 'hangzhou', 'xihu'],
                    prefix: '86',
                }}
                scrollToFirstError
                style={{display:"flex",width:"100%", justifyContent:"center", alignItems:"center", flexDirection:"column"}}
                >
                <Form.Item
                    name="userName"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your username!',
                        },
                    ]}
                    style={{minWidth:305+'px',maxWidth:500+'px', paddingLeft: 25+'px',  paddingTop: 50+'px',paddingRight: 25+'px'}} 
                    >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                </Form.Item>
                <Form.Item
                    name="email"
                    rules={[
                        {
                            type: 'email',
                            message: 'The input is not valid E-mail!',
                        },
                        {
                            required: true,
                            message: 'Please input your E-mail!',
                        },
                    ]}
                    style={{minWidth:305+'px',maxWidth:500+'px', paddingLeft: 25+'px',paddingRight: 25+'px'}}
                >
                    <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="E-Mail" />
                </Form.Item>

                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true, message: 'Please input your password!',
                            min: 8, message: 'Username must be minimum 8 characters.'
                        },
                    ]}
                    hasFeedback
                    style={{minWidth:305+'px',maxWidth:500+'px', paddingLeft: 25+'px',paddingRight: 25+'px'}}
                    >
                    <Input.Password prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Password" />
                </Form.Item>

                <Form.Item
                    name="confirm"
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                        {
                            required: true, message: 'Please confirm your password!',
                            
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('The two passwords that you entered do not match!'));
                            },
                        }),
                    ]}
                    style={{minWidth:305+'px',maxWidth:500+'px', paddingLeft: 25+'px',paddingRight: 25+'px'}}
                    >
                    <Input.Password prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Password" />
                </Form.Item>
                <Form.Item style={{marginLeft: 30+'px', paddingBottom:30+'px'}}>
                    <Button type="primary" htmlType='submit' style={{ marginRight: '10px' }}>Signup</Button>
                    Or
                    <NavLink
                        style={{ marginRight: '10px' }}
                        to='/login/'> login
                    </NavLink>
                </Form.Item>
            </Form>
        </div>
    </>
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
        onAuth: (username, email, password1, password2) => dispatch(actions.authSignup(username, email, password1, password2))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(RegistrationForm);