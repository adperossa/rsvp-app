import React from 'react';

const ControlesCache = (props) => (
  <div className="container-cache">
    <p className="aviso-cache">Usando almacenamiento local</p>
    <button className="boton-eliminar-cache" onClick={props.borrarLocalStorage}>borrar datos</button>
  </div>
);

export default ControlesCache;

