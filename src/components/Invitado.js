import React from 'react';
import PropTypes from 'proptypes';

const Invitado = ({ 
  nombre,
  confirmado,
  editando, 
  handleCambiarConfirmacion, 
  handleCambiarEdicion, 
  handleEditarNombre, 
  handleEliminarInvitado }) => (
    <li className={ confirmado ? 'confirmado' : 'pendiente' }>
      { editando ?
          <input type="text" value={nombre} onChange={handleEditarNombre} onKeyPress={e => e.key === 'Enter' ? handleCambiarEdicion() : null} />
        :
          <span>{nombre}</span>
      }
      <label>
        <input 
          type="checkbox" 
          checked={confirmado}
          onChange={handleCambiarConfirmacion} /> Asistir&aacute;
      </label>
      <button onClick={handleCambiarEdicion}>
        {editando ? 'guardar' : 'editar'}
      </button>
      <button  onClick={handleEliminarInvitado}>eliminar</button>
    </li>
  );

Invitado.propTypes = {
  confirmado: PropTypes.bool.isRequired,
  editando: PropTypes.bool.isRequired,
  nombre: PropTypes.string.isRequired,
  handleCambiarConfirmacion: PropTypes.func.isRequired,
  handleCambiarEdicion: PropTypes.func.isRequired,
  handleEditarNombre: PropTypes.func.isRequired,
  handleEliminarInvitado: PropTypes.func.isRequired
}

export default Invitado;