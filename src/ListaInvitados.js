import React from "react";
import PropTypes from 'proptypes';
import Invitado from './Invitado';

const ListaInvitados = props => 
  <ul>
    { props.invitados.map( (invitado, index) => 
      <Invitado
        key={index}
        index={index}
        confirmado={invitado.confirmado}
        editando={invitado.editando}
        nombre={invitado.nombre}
        handleToggle={propiedad => props.togglePropiedad(index, propiedad)}
        handleEditarNombre={e => props.cambiarNombre(index, e.target.value)}
      />
    )}
  </ul>

ListaInvitados.propTypes = {
  invitados: PropTypes.array.isRequired,
  togglePropiedad: PropTypes.func.isRequired,
  cambiarNombre: PropTypes.func.isRequired
}

export default ListaInvitados;