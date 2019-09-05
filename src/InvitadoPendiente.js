import React from 'react';
import PropTypes from 'proptypes';

const InvitadoPendiente = (props) => {
  if (props.nombre) {
    return (
    <li className='pendiente'>
      <span>{props.nombre}</span>
    </li>
    );
  } else {
    return null;
  }
}

InvitadoPendiente.propTypes = {
  nombre: PropTypes.string.isRequired
}

export default InvitadoPendiente;