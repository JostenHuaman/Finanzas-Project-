import React from 'react';
import { BrowserRouter as Router, Routes, Route, Redirect } from 'react-router-dom';
import {Navigate, useNavigate } from "react-router-dom"
import {connect} from 'react-redux'
import 'bootstrap/dist/css/bootstrap.min.css'

import * as actions from "./store/actions/auth"

import ProtectedRoutes from './ProtectedRoutes';
import CustomLayout from './containers/Layout';
import CustomLayoutLogged from './containers/LayoutLogged';
import Login from './containers/Login';
import Home from './containers/Home';
import Signup from './containers/Signup';
import { Switch } from 'antd';
import Credits from './components/Credits/Credits';
import FormCredits from './components/Credits/FormCredits';
import Landing from './containers/Landing';
import About from './containers/About';
import CreditsDetail from './containers/Credits/CreditsDetailView';
import CreditsList from './containers/Credits/CreditsListView';
// import ProductList from './containers/Product/ProductListView';
// import FormProduct from './components/Product/FormProduct';
function NotFoundRedirect() {
  const navigate = useNavigate();
  navigate('/login/');
  return null;
}
function NotFoundRedirect2() {
  const navigate = useNavigate();
  navigate('/credits/');
  return null;
}

function App(props) {
  console.log(props)
  //const navigate= useNavigate()
  React.useEffect(()=>{
    //if (props.isAuthenticated==false){
    //  navigate('/login/')
    //}
    props.onTryAutoSignup();
    console.log(props.onTryAutoSignup())
  })

  return (
    <div>
      <Router>
        <Routes>
            <Route element={<CustomLayoutLogged/>}>
              <Route element={<ProtectedRoutes auth={props.isAuthenticated}/>}>
                <Route path='/home/' element={<Home/>}/>
                <Route path='/credits/' element={<CreditsList/>}/>
                <Route path='/credits/new/' element={<FormCredits requestType={"post"}/>} />
                <Route path='/credits/:creditID' element={<CreditsDetail/>} exact/>
              </Route>
            </Route>
            <Route element={<CustomLayout/>}>
              <Route path='/' element={props.isAuthenticated? <Navigate to="/credits/"/>:<Landing/>} exact />
              <Route path='/login/' element={props.isAuthenticated? <Navigate to="/credits/"/>:<Login/>}  />
              <Route path='/about/' element={<About/>}  />
              <Route path='/signup/' element={props.isAuthenticated? <Navigate to="/credits/"/>:<Signup/>}  />  
            </Route>     
        </Routes>
      </Router>
    </div>
  );
}

const mapStateToProps=state =>{
  return {
    isAuthenticated: state.token !== null
  }
}

const mapDispatchToProps= dispatch =>{
  return{
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  }
}
export default connect(mapStateToProps, mapDispatchToProps) (App);