import React from 'react';
import PropTypes from 'prop-types';


const Filtro = props => (
  <label>
    <input 
      type="checkbox"
      checked={props.filtrando}
      onChange={props.toggleFiltro} /> Ocultar los que no han respondido
  </label>
)

Filtro.propTypes = {
  filtrando: PropTypes.bool.isRequired,
  toggleFiltro: PropTypes.func.isRequired
}

export default Filtro;