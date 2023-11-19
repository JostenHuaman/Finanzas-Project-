import * as actionTypes from './actionTypes';
import axios from 'axios'

const apiUrl = process.env.REACT_APP_API_URL;


export const authStart= () =>{
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = token => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token
    }
}

export const authFail = error => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}
export const checkAuthTimeout = expirationDate => {
    return dispatch => {
        setTimeout(()=>{
            dispatch(logout());
        },expirationDate *1000)
    }
}
export const logout = () =>{
    localStorage.removeItem('user');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('username');
    localStorage.removeItem('token');
    localStorage.removeItem('loggenIn');
    localStorage.removeItem('userId');
    return {
        type: actionTypes.AUTH_LOGOUT
    };
}
// export const nav=()=>{
//     const navigate = useNavigate();
//     navigate('/login/')
// }

export const authLogin = (username, password) => {
    return dispatch =>
     {
        dispatch(authStart());
        axios.post(`${apiUrl}/dj-rest-auth/login/`,{
            username:username,
            password:password
        })
        .then(res=>{
            const token = res.data.key;
            const expirationDate= new Date( new Date().getTime() +3600*1000);
            localStorage.setItem('token',token);
            localStorage.setItem('username',username);
            localStorage.setItem('loggenIn',true);
            localStorage.setItem('expirationDate',expirationDate);
            
            dispatch(authSuccess(token));
            dispatch(checkAuthTimeout(3600))
        })
        .catch(err => {
            dispatch(authFail(err))
        })
       
    }
}

export const authSignup = (username, email, password1, password2) => {
    return dispatch =>
     {
        dispatch(authStart());
        axios.post(`${apiUrl}/dj-rest-auth/registration/`,{
            username:username,
            email: email,
            password1:password1,
            password2:password2,
        })
        .then(res=>{
            const token = res.data.key;
            const expirationDate= new Date( new Date().getTime() +3600*1000);
            localStorage.setItem('token',token);
            localStorage.setItem('username',username);
            localStorage.setItem('loggenIn',true);
            localStorage.setItem('expirationDate',expirationDate);
            dispatch(authSuccess(token));
            dispatch(checkAuthTimeout(3600))
        })
        .catch(err => {
            localStorage.setItem('showAlertAfterRefresh',true);
            const errMessage = err.response.data
            const errorString = JSON.stringify(errMessage, null, 2);
            const jsonObject = JSON.parse(errorString);
            console.log(jsonObject)
            // Variable para almacenar los valores
            const valuesArray = [];
            
            // Recorre las propiedades del objeto
            for (const key in jsonObject) {
                if (jsonObject.hasOwnProperty(key)) {
                  // Agrega cada valor asociado a la clave al array
                  const formattedValue = Array.isArray(jsonObject[key]) ? jsonObject[key].join('. ') : jsonObject[key];
                  valuesArray.push(`${key}: ${formattedValue}`);
                }
              }
            const resultString = valuesArray.join('\n');
            console.log(resultString);
            console.log(valuesArray)
            localStorage.setItem('errMessage',resultString);
            //console.log(jsonObject)
            dispatch(authFail(err))
        })
    }
}


export const authCheckState = () =>{
    return dispatch =>{
        const token = localStorage.getItem('token');

        if(token===undefined){
            dispatch(logout());

        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'))
            if (expirationDate <= new Date()) {
                dispatch(logout());

            } else {
                dispatch(authSuccess(token));
                dispatch(checkAuthTimeout((expirationDate.getTime()- new Date().getTime()) /1000 ));
            }
        }
    }
}