import React from 'react';
import PropTypes from 'proptypes';

const Invitado = ({ nombre, confirmado, editando, handleToggle, handleEditarNombre }) => 
  <li className={ confirmado ? 'confirmado' : 'pendiente' }>
    { editando ?
        <input type="text" value={nombre} onChange={handleEditarNombre} onKeyPress={e => e.key === 'Enter' ? handleToggle('editando') : null} />
      :
        <span>{nombre}</span>
    }
    <label>
      <input 
        type="checkbox" 
        checked={confirmado}
        onChange={() => handleToggle('confirmado')} 
      /> Asistir&aacute;
    </label>
    <button onClick={() => handleToggle('editando')}>editar</button>
    <button>eliminar</button>
  </li>

Invitado.propTypes = {
  confirmado: PropTypes.bool.isRequired,
  editando: PropTypes.bool.isRequired,
  nombre: PropTypes.string.isRequired,
  handleToggle: PropTypes.func.isRequired,
  handleEditarNombre: PropTypes.func.isRequired
}

export default Invitado;