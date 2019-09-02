import React, { Component } from 'react';
import ListaInvitados from './ListaInvitados';

class App extends Component {

  state = { 
    invitados: [
      {
        nombre: 'Mengano',
        confirmado: true,
        editando: false
      },
      {
        nombre: 'Sutano',
        confirmado: false,
        editando: false
      }
  ]};
  
  getTotalInvitados = () => this.state.invitados.length;
  //getConfirmados
  //getNoConfirmados

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

  render() {
    return (
      <div class="App">
        <header>
          <h1>RSVP</h1>
          <p>Simple app para organizar reuniones.</p>
          <form>
              <input type="text" value="Safia" placeholder="Agregar Invitado" />
              <button type="submit" name="submit" value="submit">Agregar</button>
          </form>
        </header>
        <div class="main">
          <div>
            <h2>Invitados</h2>
            <label>
              <input type="checkbox" /> Ocultar los que no han respondido
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
            togglePropiedad={this.togglePropiedad}
            cambiarNombre={this.cambiarNombre}
          />
        </div>
      </div>
    );

  }

  
}

export default App;
