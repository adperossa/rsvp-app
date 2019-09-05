import React, { Component } from 'react';
import PropTypes from 'prop-types';

class AgregarInvitado extends Component {
  
  state = {
    value: ''
  }

  handleChange = event => {
    this.setState({
      value: event.target.value
    });
  }

  handleSubmit = event => {
    event.preventDefault();
    this.props.handleAgregarInvitado(this.state.value);
    this.setState({
      value: ''
    });
  }
  
  
  render() {
    return (
    <form onSubmit={this.handleSubmit}>
    <input type="text" value={this.state.value} placeholder="Agregar Invitado" onChange={this.handleChange}/>
    <button type="submit" name="submit" value="submit">Agregar</button>
  </form>
  )}


}
  
AgregarInvitado.propTypes = {
  handleAgregarInvitado: PropTypes.func.isRequired
}



export default AgregarInvitado;