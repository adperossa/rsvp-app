import React from "react";
import PropTypes from 'proptypes';
import Invitado from './Invitado';

const ListaInvitados = props => 
  <ul>
    { props.invitados.map( (invitado, index) => {

      if (!props.filtrando || invitado.confirmado) return (
        <Invitado
          key={index}
          index={index}
          confirmado={invitado.confirmado}
          editando={invitado.editando}
          nombre={invitado.nombre}
          handleCambiarConfirmacion={() => props.toggleConfirmacion(index)}
          handleCambiarEdicion={() => props.toggleEdicion(index)}
          handleEditarNombre={e => props.cambiarNombre(index, e.target.value)}
        />
      )

      //agregar un return sin efecto solo para que eslint no emita un warning
      return false;

    })}
  </ul>

ListaInvitados.propTypes = {
  invitados: PropTypes.array.isRequired,
  filtrando: PropTypes.bool.isRequired,
  toggleConfirmacion: PropTypes.func.isRequired,
  toggleEdicion: PropTypes.func.isRequired,
  cambiarNombre: PropTypes.func.isRequired
}

export default ListaInvitados;