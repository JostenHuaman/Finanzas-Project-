import React from 'react';
import { Button, Spin, Form, Input } from 'antd';
import { NavLink, useNavigate } from 'react-router-dom'
import { LockOutlined, UserOutlined, LoadingOutlined } from '@ant-design/icons';
import { connect } from 'react-redux'
import * as actions from '../store/actions/auth';

const antIcon = (<LoadingOutlined style={{ fontSize: 24, }} spin />
);

const Landing = (props) => {
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
        ReturnPage('/home')
        //console.log(DateNow)
        //console.log(expirationDate)
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
        
    };
    return (
        
        <div class="content-container">
            <div class="image-section">
                <img 
                decoding="async" 
               
                src="https://sellcarmazon.com/wp-content/uploads/2023/03/selling-car.png" 
                class="attachment-large size-large wp-image-121 entered lazyloaded" 
                alt="" 
                data-lazy-srcset="https://sellcarmazon.com/wp-content/uploads/2023/03/selling-car.png 800w, https://sellcarmazon.com/wp-content/uploads/2023/03/selling-car-300x225.png 300w, https://sellcarmazon.com/wp-content/uploads/2023/03/selling-car-768x576.png 768w" 
                data-lazy-sizes="(max-width: 800px) 100vw, 800px" 
                data-lazy-src="https://sellcarmazon.com/wp-content/uploads/2023/03/selling-car.png" 
                data-ll-status="loaded" sizes="(max-width: 800px) 100vw, 800px" 
                srcset="https://sellcarmazon.com/wp-content/uploads/2023/03/selling-car.png 800w, https://sellcarmazon.com/wp-content/uploads/2023/03/selling-car-300x225.png 300w, https://sellcarmazon.com/wp-content/uploads/2023/03/selling-car-768x576.png 768w"
                />
            </div>
            <div class="text-section">
                <h1 id="nombre-empresa">RuedaFinanciera</h1>
                <div class="desktop-home-text12">
                    <p>
                      ¡Bienvenido a tu camino hacia el vehículo de tus sueños! En Rueda Financiera,
                      estamos aquí para convertir tus anhelos en realidad. Imagina
                      conducir el automóvil que siempre quisiste, y ahora imagina
                      hacerlo realidad con facilidad.      
                    </p>
                    
                    <p>
                      En nuestra plataforma, te brindamos el poder de acceder a los
                      mejores créditos vehiculares de manera sencilla y conveniente.
                      Navegar por el proceso de financiamiento nunca ha sido tan
                      emocionante y sin complicaciones. ¿Listo para dar el primer paso
                      hacia esa nueva aventura en la carretera?
                    </p>
                    
                    <p>
                      Explora nuestras opciones de crédito, calcula tus pagos, y
                      descubre una experiencia de solicitud de préstamo que es rápida,
                      transparente y adaptada a tus necesidades. Estamos aquí para
                      poner las llaves de tu futuro vehículo en tus manos. ¿Qué
                      esperas? ¡Comencemos el viaje hoy mismo!
                    </p>       
                </div>
                
            </div>
        </div>
    
    );
};

export default Landing;