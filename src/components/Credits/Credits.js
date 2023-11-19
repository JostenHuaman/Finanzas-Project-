import React, {useEffect, useState} from 'react';
import { Button, Spin, Form, Input, Table, Card } from 'antd';
import { NavLink, useNavigate, useLocation } from 'react-router-dom'
import { LockOutlined, UserOutlined, LoadingOutlined } from '@ant-design/icons';
import moment from 'moment';
import { connect } from 'react-redux'
import axios from 'axios'
import * as actions from '../../store/actions/auth';

const antIcon = (<LoadingOutlined style={{ fontSize: 24, }} spin />
);


const Credits = (props) => {
    const navigate = useNavigate();
    const [Token, setToken] = useState(localStorage.getItem('token'))
    const apiUrl= process.env.REACT_APP_API_URL;
    const location = useLocation();
    const { ParamID = null,currencyName,taxName,graceName, graceMonths } = location.state || {};
    const gridStyle = {
        width: "25%",
        textAlign: "center",
        marginRight: "5vh",
        marginLeft: "5vh",
        marginBottom: "3vh",
        backgroundColor:'white',
        borderRadius: '20px'
      };
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
        navigate('/home')
        //console.log(DateNow)
        //console.log(expirationDate)
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    const OnClickNew = (e) => {
        navigate('/credits/new/')
    };
    const OnClicknav = (e) => {
        navigate('/credits/3')
    };
    const OnClickNavCredist = (e,key, id) => {
        console.log(key)
        console.log(id)

       const currencyName = props.data[key].id_currency_type.name_currency
       const taxName = props.data[key].id_tax_type.name_tax
       const graceName = props.data[key].id_grace_period_type.name_grace_period
       const graceMonths = props.data[key].months_grace_period

       navigate(`/credits/${id}`,{ state: { currencyName, taxName, graceName, graceMonths} })
       
       console.log(props.data[key]); 
       console.log(props.data[key].id_tax_type.name_tax); 
    };
    useEffect(() => {
        console.log(props.data)
        if(ParamID!=null){
            navigate(`/credits/${ParamID}`,{ state: { currencyName, taxName, graceName, graceMonths} })
        }
      }, []);

    return (
        <div style={{height:'93.4vh',paddingTop:"3vh",paddingLeft:"3vh", marginBottom:"4vh"}}>
            <Button type="primary" onClick={OnClickNew} >New Credit </Button>
            {/* <Button type="primary" onClick={OnClicknav} >3 </Button> */}
            <>
                <Card style={{backgroundColor:'#f5f5f5',borderStyle: 'none', marginTop:'3vh'}}>
                 {props.data.map((credit) => (
                   <Card.Grid title={credit.id} style={gridStyle} key={credit.key} onClick={(e) => OnClickNavCredist(e, credit.key, credit.id)}>
                     <p key={credit.key} style={{margin:"0"}}>Credit Calculation Created</p>
                     <p key={credit.key} style={{margin:"0"}}>{moment(credit.created_at).format('HH:mm:ss')}</p> 
                     <p key={credit.key} style={{margin:"0"}}>{moment(credit.created_at).format('DD-MM-YYYY')}</p> 
                   </Card.Grid>
                 ))}
                </Card>
             </>
            {/* <Table columns={columns} dataSource={props.data} size="small" pagination={{ pageSize: 37 }} style={{width:'70%'}}/> */}
        </div>

    );
};

export default Credits;