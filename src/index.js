import React from 'react';
import ReactDOM from 'react-dom';
import Pasarela from './Pasarela copyl';

const aaaaa = document.getElementById("widgetPasarela");

const param = {
  titulo: "Continuar a la pasarela",
  tipo_boton: 1,
  configura: "2||1",
  data_empresa: "DEMO",
  data_token: "AAAAAA",
  data_pago: {
    nombre: "Carlos Cabrera",
    tipoidentificacion: "1",
    numeroidentificacion: 79299848,
    correo: "ccabrera@gmail.com",
    compania: "Pruebasp",
    importetotal: 100,
    importesubtotal: 100,
    importeiva: 0,
    fechaemision: "2022-02-07",
    fechavencimiento: "2023-01-31",
    numeroreferencia: "",
    numeroreferenciaorigen: "11111"
  },
};

ReactDOM.render(
  <React.StrictMode>

    <Pasarela param={param}
    // data_empresa={aaaaa.getAttribute('data_empresa')}
    // data_token={aaaaa.getAttribute('data_token')}
    // func_pro={aaaaa.getAttribute('func_pro')}
    // func_pre={aaaaa.getAttribute('func_pre')}
    // titulo={aaaaa.getAttribute('titulo')}
    // configura={aaaaa.getAttribute('configura')}
    // tipo_boton={1} 
    />
  </React.StrictMode>, aaaaa
);

