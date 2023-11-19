import React, {useState, useEffect} from 'react';
import { Button, Form, Input, InputNumber, Row, Col, Slider, Select, Switch, Space, Checkbox, Radio } from 'antd';
import { CSSTransition } from 'react-transition-group';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import {CheckOutlined, CloseOutlined} from '@ant-design/icons';


const FormCredits=(props)=> {
  const navigate =useNavigate()
  const params = useParams();
  const { Option } = Select;
  const { register } = useForm();
  const [form] = Form.useForm();
  const [AnualTax, setAnualTax] = useState(typeof props.AnualTax === 'undefined' ? 1 : props.AnualTax);
  const [sellingPrice, setSellingPrice] = useState(typeof props.SellingPriceCar === 'undefined' ? null : props.SellingPriceCar);
  const [ValueBank, setValueBank] = useState(typeof props.Desgra === 'undefined' ? null : props.Desgra);

// const onSubmit=(data)=> console.log(data);
  const [NMonths, setNMonths] = useState(typeof props.NMonths === 'undefined' ? 24 : props.NMonths); //usar en vez del values._number_months
  const [Token, setToken] = useState(localStorage.getItem('token')); //usar en vez del values._number_months
  const [inputValueGraceMonths, setInputValueGraceMonths] = useState(typeof props.GraceMotnhs === 'undefined' ? 1 : props.GraceMotnhs);
  const [VisibleGrace, setVisibleGrace] = useState(props.SwitchGrace === 3 || typeof props.SwitchGrace === 'undefined' ? false : true);
  const [TypeGrace, setTypeGrace] = useState(typeof props.OptionGrace === 'undefined' ? 'total' : props.OptionGrace);
  const [TypeCurr, setTypeCurr] = useState(typeof props.Currency === 'undefined' ? 'USD' : props.Currency);
  const [signCurr, setSignCurr] = useState(' $');
  const [TypeTax, setTypeTax] = useState(typeof props.TaxType === 'undefined' ? 'NOM' : props.TaxType);
  const [InitialAmount, setInitialAmount] = useState(typeof props.InitialAmount === 'undefined' ? 10 : props.InitialAmount);
  const [percentIxT, setPercentIxT] = useState("");
  const [Desgravamen, setDesgra] = useState(typeof props.Desgra === 'undefined' ? false : props.Desgra);
  const [OptionGrace, setOptionGrace] = useState(typeof props.OptionGrace === 'undefined' ? 'total' : props.OptionGrace);
  const [OptionTax, setOptionTax] = useState(typeof props.TaxType === 'undefined' ? 'NOM' : props.TaxType);
  const [UserId, setUserId] = useState([]);
  const apiUrl= process.env.REACT_APP_API_URL;


  async function fecthDatauser() {
    let responseId = await axios.get(`${apiUrl}/dj-rest-auth/user/`,{headers:{"Authorization": `Token ${Token}`}})
    console.log(responseId)
    setUserId(responseId.data.pk)
  }
  useEffect(() => {
    console.log(props.Desgra)
    fecthDatauser()
  }, []);
  const handleFromSubmit=(values, requestType, productID)=>{
    console.log(values)
    console.log(NMonths)
    console.log(TypeGrace)
    console.log(TypeCurr)
    console.log(requestType)
    let _id_type_curr=0

    let _id_type_tax=""

    let _id_type_grace=""

    let _graceMonths=""
    let _desgraType=ValueBank

    let taxName=""
    let graceName=""
    let currencyName=TypeCurr
    //TYPECURR
    if (TypeCurr=='USD'){
      _id_type_curr=1
    }else{
      _id_type_curr=2
    }
    //TYPEGRACE
    if(VisibleGrace==false){
      _id_type_grace=3
      _graceMonths=0
      graceName='Sin'
    }else {
      if(TypeGrace=='total'){
        _id_type_grace=1
        _graceMonths=inputValueGraceMonths
        graceName='Total'
      }else if(TypeGrace=='partial'){
        _id_type_grace=2
        _graceMonths=inputValueGraceMonths
        graceName='Partial'
      }
    }
    if(VisibleGrace==false){
      _id_type_grace=3
      _graceMonths=0
      graceName='Sin'
    }else {
      if(TypeGrace=='total'){
        _id_type_grace=1
        _graceMonths=inputValueGraceMonths
        graceName='Total'
      }else if(TypeGrace=='partial'){
        _id_type_grace=2
        _graceMonths=inputValueGraceMonths
        graceName='Partial'
      }
    }
    const graceMonths = _graceMonths
    //TYPETAX
    if(TypeTax=='NOM'){
      _id_type_tax=1
      taxName='Nominal'
    }else{
      _id_type_tax=2
      taxName='Effective'
    }
     //TYPETAX_PUT

    //DESGRAVAMEN
    // if(Desgravamen==false){
    //   _desgraType=1
    // }else{
    //   _desgraType=2
    // }
    console.log(_id_type_curr)
    console.log(_id_type_grace)
    //event.preventDefault(); //-> no deja refrescar la pagina automaticamente

    switch (requestType){
      case 'post':
        return axios.post(`${apiUrl}/api/calculation/loan_calculation_input/`,{
          amount: InitialAmount,
          anual_tax: values._anual_tax,
          quantity_months: NMonths,
          selling_price_car: sellingPrice,
          id_currency_type: _id_type_curr,
          id_tax_type: _id_type_tax,
          id_grace_period_type: _id_type_grace,
          months_grace_period: _graceMonths,
          id_desgravamen_type: _desgraType,
          user_id: UserId
        },  { headers: {"Authorization" : `Token ${Token}`}})
        .then(res=> 
          //console.log(res);
          navigate(`/credits/${res.data.id}`,{ state: { currencyName, taxName, graceName, graceMonths } })
          )
        .catch(error=> console.error(error))

      case 'put':
        console.log("Put")
        return axios.put(`${apiUrl}/api/calculation/loan_calculation_input/${params.creditID}/`,{
          amount: InitialAmount,
          anual_tax: AnualTax,
          quantity_months: NMonths,
          selling_price_car: sellingPrice,
          id_currency_type: _id_type_curr,
          id_tax_type: _id_type_tax,
          id_grace_period_type: _id_type_grace,
          months_grace_period: _graceMonths,
          id_desgravamen_type: _desgraType,
          user_id: UserId
        },  { headers: {"Authorization" : `Token ${Token}`}})
        .then(res=> {
          //console.log(res);
          const ParamID=params.creditID
          navigate(`/credits/`,{ state: { ParamID,currencyName, taxName, graceName} })
        }
          )
        .catch(error=> console.error(error))
        
    }

    //console.log(nscope)
  }
  const OnClickBack =()=>{
    navigate('/credits/')
  }
    
  
  const onChangeNMonths = (newValue) => {
    setNMonths(newValue);
  };
  const OnChangeAnualTax = (newValue) => {
    setAnualTax(newValue);
  };
  const onChangeDesgra = (e) => {
    console.log(e.target.checked)
    setDesgra(e.target.checked);
  };
  const onChangeGrace = (newValue) => {
    //console.log(newValue)
    setInputValueGraceMonths(newValue);
  };
  const onChangeVisibility = (checked)=>{
    if(checked==false){
      setInputValueGraceMonths(1)
    }
    setVisibleGrace(checked)
  }
  const onChangeTipeGrace = (values)=>{
    console.log(values)
    setOptionGrace(values)
    setTypeGrace(values)
  }
  const OnChangeCurr = (values)=>{
    setTypeCurr(values)
    if(values=='USD'){
      setSignCurr(' $')
    }else{
      setSignCurr(' S./')
    }
  }
  const OnChangeTypeTax = (values)=>{
    setOptionTax(values)
    setTypeTax(values)
  }
  const OnChangeInitialAmount = (values)=>{
    setInitialAmount(values)
    const percent=values*sellingPrice/100
    setPercentIxT(percent)
  }

  const handleSellingPriceChange = (values) => {
    //console.log(values[0].name)
    console.log(values)
    if(values!=''){
      setSellingPrice(values)
      const percent=values*InitialAmount/100
      setPercentIxT(percent)
    }else{
      setPercentIxT("")
    }
  };
  
  const onChangeBank = (e) => {
    console.log('radio checked', e.target.value);
    setValueBank(e.target.value);
  }

  const marksMonths = {
    24: '24 Months',
    36: '36 Months',
  }
  const marksMonthsGrace = {
    1: '1 Months',
    6: '6 Months',
  }
  const optionsCurr = [
    { value: 'USD', label: 'USD', image: '/images/estados-unidos.png' },
    //{ value: 'USD2', label: 'USD', image: '/images/estados-unidos-rounded.png' },
    { value: 'PEN', label: 'PEN', image: '/images/peru.png' },
    //{ value: 'PEN2', label: 'PEN', image: '/images/peru-rounded.png' },
  ];
  const optionsTax = [
    { value: 'NOM', label: 'Nominal'},
    { value: 'EFE', label: 'Effective'},
  ];
  const optionsGrace = [
    { value: 'total', label: 'Total'},
    { value: 'partial', label: 'Partial'},
  ];
  const optionsBank = [
    { value: 1, label: 'BCP', image:'/images/bcp-seeklogo.svg',tax:"0.077%"},
    { value: 2, label: 'BBVA', image:'/images/bbva-2019.svg',tax:"0.05511%"},
    { value: 3, label: 'ScotiaBank', image:'/images/scotiabank-logo.png',tax:"0.1045%"},
  ];

  // const handleAnimationEnd = () => {
  //   if (!VisibleGrace && isAnimating) {
  //     setIsAnimating(false);
  //   } else if (!VisibleGrace) {
  //     setVisibleGrace(false); // Ocultar el elemento después de la animación de desaparición
  //   }
  // };
  // useEffect(() => {
  //   if (isAnimating) {
  //     const timeout = setTimeout(() => {
  //       setIsAnimating(false);
  //     }, 500); // Duración de la animación en milisegundos (0.5 segundos en este ejemplo)
  //     return () => clearTimeout(timeout);
  //   }
  // }, [isAnimating]);

  return (
    <>
    {
          props.requestType == "put" ?         
          <></> 
          :
          <Button type='primary' onClick={OnClickBack} style={{width:'70px',marginTop: '3vh',marginLeft:'3vh'}}>Back</Button>
    }
    <div style={{display:'flex', justifyContent:'center',height:'auto', alignItems:'center',marginTop:'-6vh'}}> 
      <Form form={form} name="control-hooks" layout='vertical' 
      style={{display:'flex',width:'40%',marginTop:'5vh',marginBottom:'5vh',height:'93.4%', borderRadius:'25px', backgroundColor:'white',flexDirection:'column', justifyContent:'center', alignItems:'center'}} 
      onFinish={(values) => handleFromSubmit(
        values,
        props.requestType
        )}
        initialValues={{
          ["_selling_price"]: 0,
          ["_number_months"]: 24,
        }}
        >
          {
          props.requestType == "put" ?
          <>
          
          <Form.Item name="_grace" label="Grace Period:" style={{width: 500 + 'px', paddingLeft: 50+'px', marginBottom:'5px', marginTop:'4vh'}}>
            <Row>
              <Col span={20} style={{display:'flex', flexDirection:'column'}}>
                <Space direction='vertical'>
                  <Switch
                    checkedChildren={<CheckOutlined style={{position:'relative', top:'-3px'}} />}
                    unCheckedChildren={<CloseOutlined style={{position:'relative', top:'-3px'}}/>}
                    defaultChecked={props.SwitchGrace === 3 || typeof props.SwitchGrace === 'undefined' ? false : true}
                    onChange={onChangeVisibility}
                    style={{width:'50px'}}
                    />
                </Space>
                <CSSTransition in={VisibleGrace} timeout={250} classNames="fade" unmountOnExit>
                    <div className={'animated-div'}
                    style={{width:'100%'}}>
                      <Col span={20} style={{display:'flex', flexDirection:'column'}}>
                        <Select defaultValue={OptionGrace} value={OptionGrace} onChange={onChangeTipeGrace} style={{ width: 200, marginTop:'8px',zIndex:1500}}>
                          {optionsGrace.map((option) => (
                            <Option key={option.value} value={option.value} style={{zIndex:1500}}>
                              <div style={{ display: 'flex', alignItems: 'center' }}>
                                {option.label}
                              </div>
                            </Option>
                          ))}
                        </Select>
                        <div style={{display:'flex', justifyContent:'center', marginTop:'5px'}}>
                          {inputValueGraceMonths} Months
                        </div>
                        <Slider
                          min={1}
                          max={6}
                          marks={marksMonthsGrace}
                          onChange={onChangeGrace}
                          value={typeof inputValueGraceMonths === 'number' ? inputValueGraceMonths : 0}
                          style={{marginLeft:'25px',width:'100%'}}
                          />
                        </Col>
                    </div>
                </CSSTransition>
              </Col>
            </Row>
              {/* <Input type="CompoundedComponent" name="namount" {...register('namount')} placeholder="Put Amount here" /> */}
          </Form.Item>
          <Form.Item name={"_currency"} label="Currency:" style={{width: 500 + 'px', marginBottom:'5px', paddingLeft:50+'px' ,display:'flex', flexDirection:'column'}}>
            <Select 
            defaultValue={TypeCurr} style={{ width: 200 }}
            onChange={OnChangeCurr}
            >
              {optionsCurr.map((option) => (
                <Option key={option.value} value={option.value}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <img
                      src={option.image}
                      alt={option.label}
                      style={{ width: '24px', height: '24px', marginRight: '8px' }}
                    />
                    {option.label}
                  </div>
                </Option>
              ))}
            </Select>
              {/* <Input type="CompoundedComponent" name="namount" {...register('namount')} placeholder="Put Amount here" /> */}
          </Form.Item>
          <Form.Item 
           name="_initial_amount"
           label="Initial Amount:"
           style={{width: 500 + 'px', paddingLeft: 50+'px', marginBottom:'5px'}}>
              <InputNumber
                  min={10}
                  max={30}
                  name="_initial_amount"
                  value={InitialAmount}
                  formatter={(value) => `${value}%`}
                  parser={(value) => value.replace('%', '')}
                  onChange={OnChangeInitialAmount}
                  placeholder="Put Amount here"
                  />
              {percentIxT}
          </Form.Item>
          <Form.Item 
            name="_selling_price" 
            label="Selling Price of the Car:" 
            rules={[
              {
                required: true,
              },
            ]}
            style={{width: 500 + 'px', paddingLeft: 50+'px', marginBottom:'5px'}}>
              <InputNumber
                  name="_selling_price"
                  min={0}
                  max={250000}
                  defaultValue={props.SellingPriceCar}
                  //value={sellingPrice}
                  formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                  placeholder="Put Amount here"
                  onChange={handleSellingPriceChange}
                  style={{width:"150px"}}
              />
              {signCurr}
          </Form.Item>
          <Form.Item name="_type_tax" label="Type Tax:" style={{width: 500 + 'px', paddingLeft: 50+'px', marginBottom:'5px'}}>
            <Select defaultValue={OptionTax} value={OptionTax} style={{ width: 200 }} onChange={OnChangeTypeTax}>
              {optionsTax.map((option) => (
                <Option key={option.value} value={option.value}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    {option.label}
                  </div>
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="_anual_tax" label="Anual Tax:" style={{width: 500 + 'px', paddingLeft: 50+'px', marginBottom:'5px'}}>
              <InputNumber
                  defaultValue={AnualTax}
                  value={AnualTax}
                  onChange={OnChangeAnualTax}
                  min={0}
                  max={100}
                  formatter={(value) => `${value}%`}
                  parser={(value) => value.replace('%', '')}
                  />
          </Form.Item>

          <Form.Item name="_desgra_bank" label="Select the discount rate:" style={{width: 400 + 'px', marginBottom:'5px'}}>
              <Radio.Group onChange={onChangeBank} defaultValue={ValueBank} value={ValueBank} style={{display:'flex', flexDirection:'row'}}>
                {optionsBank.map((option) => (
                  <>
                    <div style={{ display: 'flex', alignItems: 'center', flexDirection:'column',marginLeft:'20px'}}>
                      <img
                        src={option.image}
                        alt={option.label}
                        style={{ width: '60px', height: '24px', marginRight: '25px', marginLeft:'25px' }}
                      />
                      <div style={{ display: 'flex', fontSize:'14px' }}>
                        {option.label}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                          {option.tax}
                      </div>
                      <Radio 
                      value={option.value}
                      style={{marginRight: '25px',marginLeft:'25px' }}
                      >
                      </Radio>
                    </div>
                  </>
                  ))}
              </Radio.Group>
          </Form.Item>

          <Form.Item name="_number_months" label="Number of Months:" style={{width: 500 + 'px', marginLeft: 100+'px', marginBottom:'5px'}}>
          <Row>
            <Col span={18} style={{marginLeft:'25px'}}>
              <div style={{display:'flex', justifyContent:'center'}}>
                {NMonths} Months
              </div>
              <Slider
                min={24}
                max={36}
                marks={marksMonths}
                step={null}
                onChange={onChangeNMonths}
                value={typeof NMonths === 'number' ? NMonths : 0}
                />
            </Col>
          </Row>
          </Form.Item>
          <Form.Item style={{width: 500 + 'px', paddingLeft: 50+'px', marginBottom:'5px'}}>
          <Button type="primary" htmlType="submit" disabled={sellingPrice === null}>
            Update
          </Button>
          </Form.Item>
          </>
          :
          <>
          
          <Form.Item name="_grace" label="Grace Period:" style={{width: 500 + 'px', paddingLeft: 50+'px', marginBottom:'5px', marginTop:'4vh'}}>
            <Row>
              <Col span={20} style={{display:'flex', flexDirection:'column'}}>
                <Space direction='vertical'>
                  <Switch
                    checkedChildren={<CheckOutlined style={{position:'relative', top:'-3px'}} />}
                    unCheckedChildren={<CloseOutlined style={{position:'relative', top:'-3px'}}/>}
                    defaultChecked={false}
                    onChange={onChangeVisibility}
                    style={{width:'50px'}}
                    />
                </Space>
                <CSSTransition in={VisibleGrace} timeout={250} classNames="fade" unmountOnExit>
                    <div className={'animated-div'}
                    style={{width:'100%'}}>
                      <Col span={20} style={{display:'flex', flexDirection:'column'}}>
                        <Select defaultValue="total" onChange={onChangeTipeGrace} style={{ width: 200, marginTop:'8px'}}>
                          {optionsGrace.map((option) => (
                            <Option key={option.value} value={option.value}>
                              <div style={{ display: 'flex', alignItems: 'center' }}>
                                {option.label}
                              </div>
                              <div style={{ display: 'flex', alignItems: 'center' }}>
                                {option.tax}
                              </div>
                            </Option>
                          ))}
                        </Select>
                        <div style={{display:'flex', justifyContent:'center', marginTop:'5px'}}>
                          {inputValueGraceMonths} Months
                        </div>
                        <Slider
                          min={1}
                          max={6}
                          marks={marksMonthsGrace}
                          onChange={onChangeGrace}
                          value={typeof inputValueGraceMonths === 'number' ? inputValueGraceMonths : 0}
                          style={{marginLeft:'25px',width:'100%'}}
                          />
                        </Col>
                    </div>
                </CSSTransition>
              </Col>
            </Row>
              {/* <Input type="CompoundedComponent" name="namount" {...register('namount')} placeholder="Put Amount here" /> */}
          </Form.Item>
          <Form.Item name={"_currency"} label="Currency:" style={{width: 500 + 'px', marginBottom:'5px', paddingLeft:50+'px' ,display:'flex', flexDirection:'column'}}>
            <Select 
            defaultValue="USD" style={{ width: 200 }}
            onChange={OnChangeCurr}
            >
              {optionsCurr.map((option) => (
                <Option key={option.value} value={option.value}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <img
                      src={option.image}
                      alt={option.label}
                      style={{ width: '24px', height: '24px', marginRight: '8px' }}
                    />
                    {option.label}
                  </div>
                </Option>
              ))}
            </Select>
              {/* <Input type="CompoundedComponent" name="namount" {...register('namount')} placeholder="Put Amount here" /> */}
          </Form.Item>
          <Form.Item 
           name="_initial_amount"
           label="Initial Amount:"
           style={{width: 500 + 'px', paddingLeft: 50+'px', marginBottom:'5px'}}>
              <InputNumber
                  min={10}
                  max={30}
                  name="_initial_amount"
                  value={InitialAmount}
                  formatter={(value) => `${value}%`}
                  parser={(value) => value.replace('%', '')}
                  onChange={OnChangeInitialAmount}
                  placeholder="Put Amount here"
                  />
              {percentIxT}
          </Form.Item>
          <Form.Item 
            name="_selling_price" 
            label="Selling Price of the Car:" 
            rules={[
              {
                required: true,
              },
            ]}
            style={{width: 500 + 'px', paddingLeft: 50+'px', marginBottom:'5px'}}>
              <InputNumber
                  name="_selling_price"
                  min={0}
                  formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                  placeholder="Put Amount here"
                  onChange={handleSellingPriceChange}
                  style={{width:"150px"}}
              />
              {signCurr}
          </Form.Item>
          <Form.Item name="_type_tax" label="Type Tax:" style={{width: 500 + 'px', paddingLeft: 50+'px', marginBottom:'5px'}}>
            <Select defaultValue="NOM" style={{ width: 200 }} onChange={OnChangeTypeTax}>
              {optionsTax.map((option) => (
                <Option key={option.value} value={option.value}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    {option.label}
                  </div>
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="_anual_tax" label="Anual Tax:" style={{width: 500 + 'px', paddingLeft: 50+'px', marginBottom:'5px'}}>
              <InputNumber
                  defaultValue={1}
                  min={0}
                  max={100}
                  formatter={(value) => `${value}%`}
                  parser={(value) => value.replace('%', '')}
                  />
          </Form.Item>

          <Form.Item name="_desgra_bank" label="Select the discount rate:" style={{width: 400 + 'px', marginBottom:'5px'}}>
              <Radio.Group onChange={onChangeBank} defaultValue={1} style={{display:'flex', flexDirection:'row'}}>
                {optionsBank.map((option) => (
                  <>
                    <div style={{ display: 'flex', alignItems: 'center', flexDirection:'column',marginLeft:'20px'}}>
                      <img
                        src={option.image}
                        alt={option.label}
                        style={{ width: '60px', height: '24px', marginRight: '25px', marginLeft:'25px' }}
                      />
                      <div style={{ display: 'flex', fontSize:'14px' }}>
                        {option.label}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                          {option.tax}
                      </div>
                      <Radio 
                      key={option.value} 
                      value={option.value}
                      style={{marginRight: '25px',marginLeft:'25px' }}
                      >
                      </Radio>
                    </div>
                  </>
                  ))}
              </Radio.Group>
          </Form.Item>

          <Form.Item name="_number_months" label="Number of Months:" style={{width: 500 + 'px', marginLeft: 100+'px', marginBottom:'5px'}}>
          <Row>
            <Col span={18} style={{marginLeft:'25px'}}>
              <div style={{display:'flex', justifyContent:'center'}}>
                {NMonths} Months
              </div>
              <Slider
                min={24}
                max={36}
                marks={marksMonths}
                step={null}
                onChange={onChangeNMonths}
                value={typeof NMonths === 'number' ? NMonths : 0}
                />
            </Col>
          </Row>
          </Form.Item>
          <Form.Item style={{width: 500 + 'px', paddingLeft: 50+'px', marginBottom:'5px'}}>
          <Button type="primary" htmlType="submit" disabled={sellingPrice === null}>
            Create
          </Button>
          </Form.Item>
          </>
       }
      </Form>
    </div>
    </>
  );
}
export default FormCredits;