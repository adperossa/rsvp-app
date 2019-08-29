import React from "react";
import PropTypes from 'proptypes';

const ListaInvitados = props => 
  <ul>
    { props.invitados.map( (invitado, index) => 
    <li 
      key={index}
      className={ invitado.confirmado ? 'confirmado' : 'pendiente' } 
    >
      <span>{invitado.nombre}</span>
      <label>
        <input type="checkbox" checked /> Asistir&aacute;
      </label>
      <button>editar</button>
      <button>eliminar</button>
    </li>
    )}
  </ul>

ListaInvitados.propTypes = {
  invitados: PropTypes.array.isRequired
}

export default ListaInvitados;