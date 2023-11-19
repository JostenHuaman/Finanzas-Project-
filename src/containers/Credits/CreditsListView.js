import React, { useState, useEffect } from "react";
import {
  Button,
  Form,
  Input,
  InputNumber,
  Row,
  Col,
  Slider,
  Select,
  Switch,
  Space,
} from "antd";
import { CSSTransition } from "react-transition-group";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { Table } from 'antd';
import axios from "axios";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import Credits from "../../components/Credits/Credits";

const CreditsList = (props) => {
  const navigate = useNavigate();
  const params = useParams();
  const [Token, setToken] = useState(localStorage.getItem("token"));
  const [dataLoanIn, setDataLoanIn] = useState([])
  const apiUrl= process.env.REACT_APP_API_URL;
  

  async function fecthDataLoanInput() {
    let responseId = await axios.get(`${apiUrl}/dj-rest-auth/user/`,{headers:{"Authorization": `Token ${Token}`}})
    console.log(responseId)
    let res = await axios(
      `${apiUrl}/api/calculation/loan_calculation_input/?user_id_id=${responseId.data.pk}`,
      { headers: { Authorization: `Token ${Token}` } }
    );
    for (let i = 0; i < res.data.length; i++) {
      res.data[i].key=i 
    }
    console.log(res.data)
    setDataLoanIn(res.data);
  }
//mostrar lista de  calculos

  useEffect(() => {
    fecthDataLoanInput()
  }, []);

  return <div style={{  width:'100%' }}>
    <Credits data={dataLoanIn}></Credits>
  </div>;
};
export default CreditsList;
