import React, {StrictMode} from 'react';
import ReactDOM from 'react-dom/client';
import './styles/styles.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import {Provider} from 'react-redux'
import reducers from './store/reducers/auth'

const persistConfig={
  key:'root',
  vesion:1,
  storage,
}

const persistedReducer = persistReducer(persistConfig, reducers)

const store= configureStore({
  reducer:persistedReducer,
  middleware: (getDefaultMiddleware)=>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

const app=(
  <StrictMode>
     <Provider store={store}>
      <App />
     </Provider>
  </StrictMode>
 
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(app);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
