import React, { Component } from 'react';
import ListaInvitados from './ListaInvitados';

class App extends Component {

  state = { 
    invitados : [
      {
        nombre: 'Mengano',
        confirmado: true
      },
      {
        nombre: 'Sutano',
        confirmado: false
      }
  ]};
  
  getTotalInvitados = () => this.state.invitados.length;
  //getConfirmados
  //getNoConfirmados  


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
          <ListaInvitados invitados={this.state.invitados} />
        </div>
      </div>
    );

  }

  
}

export default App;
