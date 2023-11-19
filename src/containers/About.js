import React from 'react';
import { Button, Spin, Form, Input } from 'antd';
import { NavLink, useNavigate } from 'react-router-dom'
import { LockOutlined, UserOutlined, LoadingOutlined } from '@ant-design/icons';
import { connect } from 'react-redux'
import * as actions from '../store/actions/auth';

const antIcon = (<LoadingOutlined style={{ fontSize: 24, }} spin />
);

const About = (props) => {
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
        
        <div class="container-cardint">
        <span class="desktop-about-us-text20"><span>INTEGRANTES</span></span>
        <div class="card-container">        
            <div class="card-fr" style={{backgroundColor:"#f2f2f2"}}>
                <div class="card-top">
                    <img src="/images/jostin.jpg" jsaction="VQAsE"  jsname="kn3ccd" alt="Foto de persona 1" class="profile-pic"/>
                </div>
                <div class="card-middle">
                    <p class="name">Huaman Bellido, Josten</p>
                </div>
                <div class="card-bottom">
                    <p class="description">Mi nombre es Josten Marc Huamán Bellido, tengo 25 años y estoy
                        cursando la carrera de Ingeniería de Software. Me encuentro
                        cursando el 5to ciclo, con conocimientos en lenguajes de
                        programación como C + + , JavaScript, Python. Me estoy
                        especializando en Front-End, adquiriendo nuevos conocimientos de
                        HTML y CSS.</p>
                </div>
            </div>
            <div class="card-fr">
                <div class="card-top">
                    <img src="/images/andre.jpg" jsaction="VQAsE"  jsname="kn3ccd" alt="Foto de persona 2" class="profile-pic"/>
                </div>
                <div class="card-middle">
                    <p class="name">Alata Calle, Andre Elian</p>
                </div>
                <div class="card-bottom">
                    <p class="description">Mi nombre es Andre Alata Calle, curso la carrera de Ing de sistemas de informacion. Actualmente me encuentro en 8vo ciclo y tengo conocimientos en lenguajes de programación como C#, C++, JavaScript ,entre otros. Actualmente estudio cursos de programación y redes y en mi tiempo libre me gusta escuchar audiolibros.</p>
                </div>
            </div>            
            <div class="card-fr">
                <div class="card-top">
                    <img src="/images/omar.jpg" jsaction="VQAsE" jsname="kn3ccd" alt="Foto_de_persona_3" class="profile-pic-omar"/>
                </div>
                <div class="card-middle">
                    <p class="name">Rumiche Hernández, Omar</p>
                </div>
                <div class="card-bottom">
                    <p class="description">Mi nombre es Omar Alejandro Rumiche Hernández, Soy estudiante de la carrera de Ingeniería de Sistemas de Información. Me encuentro Cursando el 8vo ciclo y Actualmente cuento con conocimientos de distintos lenguajes de programación con C++, C#, Java, JavaScript y Python. Además en mis tiempos libres estudio respecto a la Ciber Seguridad</p>
                </div>
            </div>
            <div class="card-fr">
                <div class="card-top">
                    <img src="/images/wiston.jpg" jsaction="VQAsE"  jsname="kn3ccd" alt="Foto de persona 4" class="profile-pic"/>
                </div>
                <div class="card-middle">
                    <p class="name">Wiston Junior,Marcelon</p>
                </div>
                <div class="card-bottom">
                    <p class="description">Mi nombre es Wiston Junior Marcelo Pichen, curso la carrera de Ing de sistemas. Actualmente me encuentro en 8vo ciclo y tengo conocimientos en lenguajes de programación como Python, JavaScript,C# me encuentro haciendo prácticas en el área de ciencia de datos y mis ratos libres practico deporte(futbol)</p>
                </div>
            </div>
        </div>
    
    </div>

    );
};

export default About;