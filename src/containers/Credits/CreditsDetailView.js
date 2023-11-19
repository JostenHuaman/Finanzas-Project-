import React, { useState, useEffect } from "react";
import { CSSTransition } from "react-transition-group";
import { useForm } from "react-hook-form";
import { useNavigate, useParams, useLocation, json } from "react-router-dom";
import { Table, Descriptions, Button  } from 'antd';
import {Modal as BootstrapModal } from 'react-bootstrap';
import axios from "axios";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import FormCredits from "../../components/Credits/FormCredits";

const CreditsDetail = (props) => {
  const navigate = useNavigate();
  const params = useParams();
  const [SwitchGrace, setSwitchGrace] = useState();
  const [OptionGrace, setOptionGrace] = useState();
  const [GraceMotnhsUP, setGraceMonths] = useState();
  const [TaxType, setTaxType] = useState();
  const [AnualTax, setAnualTax] = useState();
  const [Desgra, setDesgra] = useState();
  const [name_bank, setNameBank] = useState();


  const [ModalOpen, setOpen] = useState(false);
  const [Token, setToken] = useState(localStorage.getItem("token"));
  const [dataLoan, setDataLoan] = useState([])
  const [dataLoanIn, setDataLoanIn] = useState([])
  const [Van, setVan] = useState("")
  const [Tir, setTir] = useState("")
  const [GraceCorrectName, setGraceCorrectName] = useState("")
  const [requestT, setRequest] = useState("")
  const location = useLocation();
  const { currencyName,taxName,graceName, graceMonths } = location.state;
  const apiUrl= process.env.REACT_APP_API_URL;

  console.log(currencyName)
  console.log(taxName)
  console.log(graceName)
  console.log(graceMonths)
  async function fecthDataLoanInput() {
    let res = await axios(
      `${apiUrl}/api/calculation/loan_calculation_input/${params.creditID}`,
      { headers: { Authorization: `Token ${Token}` } }
    );
    console.log(res.data)
    setDataLoanIn(res.data);
    if(res.data.id_tax_type.id==2){
      setTaxType("EFE")
    }else{
      setTaxType("NOM")
    }
    setAnualTax(res.data.anual_tax)

    setDesgra(res.data.id_desgravamen_type.id)
    setNameBank(`${res.data.id_desgravamen_type.name_bank} ${res.data.id_desgravamen_type.value_desgravamen}`)

    if(res.data.months_grace_period==0){
      setGraceMonths(1)
    }else{
      setGraceMonths(res.data.months_grace_period)
    }

  }

  async function fecthDataLoanOutput() {
    let res = await axios(
      `${apiUrl}/api/calculation/loan_calculation_output/?id_loan_calculation_input_id=${params.creditID}`,
      { headers: { Authorization: `Token ${Token}` } }
    );
    console.log(res.data[0].calculation)
    let resData1 = res.data[0].calculation;
    try {
      const jsonData = JSON.parse(resData1);
      const van_tir = jsonData.Amortization_Schedule[jsonData.Amortization_Schedule.length-1]
      setVan(van_tir.VAN)
      setTir(van_tir.TIR)
      delete jsonData.Amortization_Schedule[jsonData.Amortization_Schedule.length-1]
      
      console.log(van_tir)
      console.log(jsonData.Amortization_Schedule)
      // Ahora puedes usar jsonData en tu aplicación de React para recorrer y mostrar los datos.
      jsonData.Amortization_Schedule.forEach(item => {
        item.TEA = parseFloat((item.TEA).toFixed(5)); // Redondea TEP a 2 decimales
        item.TEP = parseFloat((item.TEP).toFixed(5)); // Redondea TEP a 2 decimales
        item.Saldo_Inicial = parseFloat(item.Saldo_Inicial.toFixed(2)); // Redondea Saldo_Inicial a 2 decimales
        item.Interes = parseFloat(item.Interes.toFixed(2)); // Redondea Interes a 2 decimales
        item.Cuota = parseFloat(item.Cuota.toFixed(2)); // Redondea Cuota a 2 decimales
        item.Amort = parseFloat(item.Amort.toFixed(2)); // Redondea Amort a 2 decimales
        item.Desgravamen = parseFloat(item.Desgravamen.toFixed(2)); // Redondea Saldo_Final a 2 decimales
        item.Saldo_Final = parseFloat(item.Saldo_Final.toFixed(2)); // Redondea Saldo_Final a 2 decimales
        item.Flujo = parseFloat(item.Flujo.toFixed(2)); // Redondea Saldo_Final a 2 decimales
      });      
      var nuevoElemento = {
        Month: 0,
        TNA: '',
        TEA: '',
        TEP: '',
        Saldo_Inicial: '',
        Interes: '',  // Ajusta el valor del interés según tus necesidades
        Cuota: '',   // Ajusta el valor de la cuota según tus necesidades
        Amort: '',   // Ajusta el valor de la amortización según tus necesidades
        Saldo_Final: '',  // Ajusta el valor del saldo final según tus necesidades
        BoolDesgravamen: '',
        Desgravamen: '',  // Ajusta el valor del desgravamen según tus necesidades
        Flujo: jsonData.Amortization_Schedule[0].Saldo_Inicial  // Este valor debe ser igual a 148000
    };
      if(graceName=='Total'){
        setSwitchGrace(1) 
        setOptionGrace("total")   
      }else if(graceName=='Partial'){
        setSwitchGrace(2)
        setOptionGrace("partial")   
      }else if(graceName=="Sin"){
        setOptionGrace("total")   
      }
      
      jsonData.Amortization_Schedule.unshift(nuevoElemento)
      setDataLoan(jsonData.Amortization_Schedule);
      console.log(jsonData.Amortization_Schedule);
    } catch (error) {
      console.error("Error al analizar JSON:", error);
    }
  }
  const handleCancel = () => {
    setOpen( false )
  };

  const handleClickGetValueToDelete = () => {
    //e.preventDefault();
    axios.delete(`${apiUrl}/api/calculation/loan_calculation_input/${params.creditID}` , { headers: {"Authorization" : `Token ${Token}`}})
    .then(res => {
      console.log(res);
      navigate('/credits/')
    }).catch((error) => {
      console.log(error)
    })
  }

  useEffect(() => {
    fecthDataLoanInput();
    fecthDataLoanOutput();
    if(graceName=='Sin'){
      setGraceCorrectName(graceName)
    }else{
      setGraceCorrectName(`${graceName} for ${graceMonths} Months`)
    }
  }, []);

  let items = [
    {
      key: '1',
      label: 'Selling Price of the Car',
      children: dataLoanIn.selling_price_car,
    },
    {
      key: '2',
      label: 'Type of Currency',
      children: currencyName,
    },
    {
      key: '3',
      label: 'Initial Amount',
      children: `${dataLoanIn.amount}%`,
    },
    {
      key: '4',
      label: 'Anual Tax',
      children: `${dataLoanIn.anual_tax}%`,
    },
    {
      key: '5',
      label: 'Type of Tax',
      children: taxName,
    },
    {
      key: '6',
      label: 'Quantity of Months',
      children: dataLoanIn.quantity_months,
    },
    {
      key: '7',
      label: 'Type of Grace Period',
      children: GraceCorrectName,
    },
    {
      key: '8',
      label: 'VAN',
      children: Van,
    },
    {
      key: '9',
      label: 'TIR',
      children: `${Tir}%`,
    },
    {
      key: '10',
      label: 'Discount Rate',
      children: `${name_bank}%`,
    },
  ];

  const columns = [
    {
      title: 'Month',
      dataIndex: 'Month',
      key: 'Month',
    },
    {
      title: 'TEA',
      dataIndex: 'TEA',
      key: 'TEA',
      render: (text) => `${text}%`,
    },
    {
      title: 'TEP',
      dataIndex: 'TEP',
      key: 'TEP',
      render: (text) => `${text}%`,
    },
    {
      title: 'Saldo Inicial',
      dataIndex: 'Saldo_Inicial',
      key: 'Saldo_Inicial',
    },
    {
      title: 'Interes',
      dataIndex: 'Interes',
      key: 'Interes',
    },
    {
      title: 'Cuota',
      dataIndex: 'Cuota',
      key: 'Cuota',
    },
    {
      title: 'Amort',
      dataIndex: 'Amort',
      key: 'Amort',
    },
    {
      title: 'Seg. Desgravamen',
      dataIndex: 'Desgravamen',
      key: 'Desgravamen',
    },
    {
      title: 'Saldo Final',
      dataIndex: 'Saldo_Final',
      key: 'Saldo_Final',
    },
    {
      title: 'Flujo',
      dataIndex: 'Flujo',
      key: 'Flujo',
    },
  ];
  const OnClickBack=()=>{
    navigate('/credits/')
  }

  const handleClickGetValueToEdit = (e) => {
    setOpen(true)
    setRequest("put");
}

  return( 
    <>
  <div style={{display:"flex",flexDirection:"row"}}>
    <Button type='primary' onClick={OnClickBack} style={{width:'70px',marginTop: '3vh',marginLeft:'3vh'}}>Back</Button>
    <div style={{ marginLeft: 'auto', marginRight:'5vh' }}>
      <Button type='primary' onClick={handleClickGetValueToEdit} style={{ width: '70px', marginTop: '3vh', marginLeft: '3vh' }}>Edit</Button>
      <Button type='primary' danger onClick={handleClickGetValueToDelete} style={{ width: '70px', marginTop: '3vh', marginLeft: '3vh' }}>Delete</Button>
    </div>
  </div>  
  <div style={{ display: "flex", justifyContent: "center", flexDirection:'column', alignItems:'center'}}>
        <BootstrapModal
          show={ModalOpen}
          // onOk={this.handleOk}
          style={{}}    
          onHide={handleCancel}  
        >
          <BootstrapModal.Header closeButton> 
              <BootstrapModal.Title>
                  Update Credit
              </BootstrapModal.Title>
          </BootstrapModal.Header>
          <BootstrapModal.Body>
            <FormCredits
            onClose={handleCancel}
            requestType={requestT} 
            SwitchGrace={SwitchGrace}
            OptionGrace={OptionGrace}
            GraceMotnhs={GraceMotnhsUP}
            Currency={currencyName}
            SellingPriceCar={dataLoanIn.selling_price_car}
            InitialAmount={dataLoanIn.amount}
            TaxType={TaxType}
            AnualTax={AnualTax}
            Desgra={Desgra}
            NMonths={dataLoanIn.quantity_months}
            //pasar los props
            />
          </BootstrapModal.Body>
        </BootstrapModal>
    <Descriptions title="Loan Calculation Info" style={{marginLeft:'20vh'}} items={items} /> 
    <Table columns={columns} dataSource={dataLoan} size="small" pagination={{ pageSize: 37 }} style={{width:'70%'}}/>
  </div>
  </>
  )
};
export default CreditsDetail;
