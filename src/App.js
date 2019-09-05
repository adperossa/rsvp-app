import React, { Component } from 'react';
import ListaInvitados from './ListaInvitados';
import AgregarInvitado from './AgregarInvitado';

class App extends Component {

  // Como es una aplicación muy simple, acumulo todo el state en el componente contenedor.
  // De aumentar la complejidad convendría convertir algunos comp funcionales en clases con su propio state y
  // manejar localmente variables como la usada para el filtro, o el estado de 'editando' el nombre en cada Invitado
  state = { 
    invitados: [
      {
        nombre: 'Juan',
        confirmado: false,
        editando: false
      },
      {
        nombre: 'Pedro',
        confirmado: true,
        editando: false
      },
      {
        nombre: 'Tony',
        confirmado: true,
        editando: false
      }
    ],
    filtrando: false
  };
  
  getTotalInvitados = () => this.state.invitados.length;
  
  toggleFiltro = () => {
    this.setState({
      filtrando: !this.state.filtrando
    })
  }

  /**
   * Cambia una propiedad bool de un invitado en su opuesto
   * @param {number} index Indice del invitado en el array
   * @param {boolean} propiedad Propiedad a cambiar
   */
  togglePropiedad = (index, propiedad) => {
    this.setState((prevState) => {

      const invitadosArray = prevState.invitados;
      invitadosArray[index][propiedad] = !invitadosArray[index][propiedad];

      return ({
        invitados: invitadosArray
      })
      
    })
  }

  // Funciones utilitarias, llaman a togglePropiedad con cada caso en particular.
  // Desagregadas de togglePropiedad para abstraer funcionalidad, mantener compartimentalizacion
  // y mejorar mantenimiento
  toggleConfirmacion = index => {
    this.togglePropiedad(index, 'confirmado');
  }

  toggleEdicion = index => {
    this.togglePropiedad(index, 'editando');
  }

  /**
   * Cambia el nombre de un invitado
   * @todo refactorizar funciones para una func changeState general
   * @param {number} index Indice del invitado en el array
   * @param {string} nombre Nombre del invitado
   */
  cambiarNombre = (index, nombre) => {
    this.setState((prevState) => {
      const invitadosArray = prevState.invitados;
      invitadosArray[index].nombre = nombre;

      return ({
        invitados: invitadosArray
      })
      
    })
  }

  agregarInvitado = nombre => {
    const nuevoInvitado = {
      nombre,
      confirmado: false,
      editando: false
    }

    this.setState(prevState => {
      return ({
        invitados: [ nuevoInvitado, ...prevState.invitados ]
      })      
    })

  }

  eliminarInvitado = index => {
    this.setState(prevState => {
      const newInvitados = prevState.invitados.filter( invitado => prevState.invitados[index] !== invitado);
      return ({
        invitados: newInvitados
      })
    })
  }
  
  /* 
  // método con slice
  eliminarInvitado = index => {
    this.setState(prevState => ({ 
      invitados: [
        ...prevState.invitados.slice(0, index),
        ...prevState.invitados.slice(index + 1)
      ]
       }))
  }
  */

  render() {
    return (
      <div class="App">
        <header>
          <h1>RSVP</h1>
          <p>Simple app para organizar reuniones.</p>
          <AgregarInvitado handleAgregarInvitado={this.agregarInvitado}/>
        </header>
        <div class="main">
          <div>
            <h2>Invitados</h2>
            <label>
              <input 
                type="checkbox"
                checked={this.state.filtrando}
                onChange={this.toggleFiltro} /> Ocultar los que no han respondido
            </label>
          </div>
          <table class="counter">
            <tbody>
              <tr>
                <td>Asistir&aacute;n:</td>
                <td>2</td>
              </tr>
              <tr>
                <td>Sin confirmar:</td>
                <td>1</td>
              </tr>
              <tr>
                <td>Total:</td>
                <td>3</td>
              </tr>
            </tbody>
          </table>
          <ListaInvitados 
            invitados={this.state.invitados}
            filtrando={this.state.filtrando}
            toggleConfirmacion={this.toggleConfirmacion}
            toggleEdicion={this.toggleEdicion}
            cambiarNombre={this.cambiarNombre}
            eliminarInvitado={this.eliminarInvitado}
          />
        </div>
      </div>
    );

  }

  
}

export default App;
