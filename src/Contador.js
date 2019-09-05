import React from 'react';
import PropTypes from 'prop-types';

const Contador = props => (
  <table class="counter">
    <tbody>
      <tr>
        <td>Asistir&aacute;n:</td>
        <td>{props.confirmados}</td>
      </tr>
      <tr>
        <td>Sin confirmar:</td>
        <td>{props.sinConfirmar}</td>
      </tr>
      <tr>
        <td>Total:</td>
        <td>{props.total}</td>
      </tr>
      <tr>
        <td>Presentismo:</td>
        <td>{Math.round((props.confirmados * 100) / props.total) + ' %'}</td>
      </tr>
    </tbody>
  </table>
)

Contador.propTypes = {
  confirmados: PropTypes.number.isRequired,
  sinConfirmar: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
}

export default Contador;