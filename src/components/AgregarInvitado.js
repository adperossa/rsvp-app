import React from 'react';
import PropTypes from 'prop-types';

const AgregarInvitado = props => (
  <form onSubmit={(event) => props.handleAgregarInvitado(event)}>
    <input type="text" value={props.invitadoPorAgregar} placeholder="Agregar Invitado" onChange={(event) => props.handleChange(event)}/>
    <button type="submit" name="submit" value="submit">Agregar</button>
  </form>
)

AgregarInvitado.propTypes = {
  handleAgregarInvitado: PropTypes.func.isRequired,
  invitadoPorAgregar: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired
}

export default AgregarInvitado;