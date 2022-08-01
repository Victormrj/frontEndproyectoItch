import React, { useState } from 'react';
import './login.css';
import { useForm } from '../../hooks/userForm';
import { useDispatch, useSelector } from 'react-redux';

import { startLogin, login, startChecking } from '../../actions/auth';
import { fetchSinToken } from '../../helpers/fetch';
import { Navigate } from 'react-router-dom';
import request from 'superagent';
// const baseUrl= process.env.REACT_APP_API_URL;
import Axios from 'axios';
import axios from 'axios';



export const Login = () => {


  const dispatch = useDispatch();
  const [formLoginValues, handleLoginInputChange, reset] = useForm({
    lEmail: '',
    lPassword: ''
  });

  const { lEmail, lPassword } = formLoginValues;

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(startLogin(lEmail, lPassword));
  }

  return (
    <div>
      <div className='cuerpoEncabezados'>
        <img className='imgGral' src='/img/LOGO_TECNM.png' />
        <h1 className='tecnm'>TECNOLOGICO NACIONAL DE MEXICO</h1>
        <img className='imgItch' src='/img/LOGO-IT-CHILPANCINGO.jpg' />
        <h1 className='itch'>Campus Chilpancingo</h1>
        {/* AQUI VA TODO DEL ENCABEZADO */}
      </div>
      {/* AQUI VA EL FORMULARIO */}
      <div className='contenedor'>
        <img className='imgLogin' src='/img/imagen_decoracion.png' />

        {/* <div className='contenedorFormulario' > */}
        <form className='formLogin' onSubmit={handleLogin} >
          <h2 className='form__title'>Departamento de Mantenimiento de Equipo</h2>

          <div className="form__container">
            <div className="form__group">
              <input
                type="email"
                id="correo"
                className="form__input"
                placeholder=" "
                name='lEmail'
                value={lEmail}
                onChange={handleLoginInputChange} />
              <label for="correo" className="form__label" >Correo:</label>
              <span className="form__line"></span>
            </div>

            <div className="form__group">
              <input
                type="password"
                id="contrasenia"
                className="form__input"
                placeholder=" "
                name='lPassword'
                value={lPassword}
                onChange={handleLoginInputChange} />
              <label for="contrasenia" className="form__label" >Contraseña:</label>
              <span className="form__line"></span>
            </div>

          </div>
          <button type='submit' className='btnIngresar'>Iniciar Sesión</button>
          {/* <input type="submit" class="form__submit" value="Registrarme" id="btnRegistro" /> */}
        </form>
        {/* </div> */}
      </div>
    </div>
  )
}