import React from 'react';
import PropTypes from 'prop-types';
import AgregarInvitado from './AgregarInvitado';

const Header = props => (
  <header>
    <h1>RSVP</h1>
    <p>Simple app para organizar reuniones.</p>
    <AgregarInvitado 
      invitadoPorAgregar={props.invitadoPorAgregar}
      handleAgregarInvitado={props.agregarInvitado}
      handleChange={props.inputInvitadoPorAgregar}
    />
  </header>
)

Header.propTypes = {
  invitadoPorAgregar: PropTypes.string.isRequired,
  agregarInvitado: PropTypes.func.isRequired,
  inputInvitadoPorAgregar: PropTypes.func.isRequired
}

export default Header;