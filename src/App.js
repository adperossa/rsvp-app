import React, { Component } from 'react';
import Header from './components/Header';
import Main from './components/Main';

class App extends Component {

  // Como es una aplicación muy simple, acumulo todo el state en el componente contenedor.
  // De aumentar la complejidad convendría convertir algunos comp funcionales en clases con su propio state y
  // manejar localmente variables como la usada para el filtro, o el estado de 'editando' el nombre en cada Invitado
  // TODO: utilizar ID unico para cada invitado en lugar del index
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
    filtrando: false,
    invitadoPorAgregar: ''
  };
  
  // metodos helper para el contador
  getTotalInvitados = () => this.state.invitados.length;
  getConfirmados = () => this.state.invitados.reduce(
    (acc, invitado) => invitado.confirmado ? acc + 1 : acc
  , 0)

  /**
   * Activa/desactiva la variable del filtro de invitados confirmados
   */
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

  //fin utilitarias

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

  /**
   * Agrega un nuevo invitado al array.
   * @param {Object} event El evento onSubmit pasado desde el componente de 
   * agregar invitados, usado para preventDefault
   */
  agregarInvitado = event => {
    event.preventDefault();
      
    this.setState(prevState => ({
      invitados: [ 
        {
          nombre: this.state.invitadoPorAgregar,
          confirmado: false,
          editando: false
        },
        ...prevState.invitados
      ],
      invitadoPorAgregar: ''
    }))
  }
  
  /**
   * maneja el state del input del componente hijo AgregarInvitado
   * @param {Object} event El evento onChange del input
   */
  inputInvitadoPorAgregar = event => {
    this.setState({
      invitadoPorAgregar: event.target.value
    });
  }
  
  /**
   * Borra a un invitado del array basandose en el index recibido
   * @param {number} index El indice correspondiente al invitado a borrar
   */
  eliminarInvitado = index => {
    this.setState(prevState => {
      const newInvitados = prevState.invitados.filter( invitado => prevState.invitados[index] !== invitado);
      return ({
        invitados: newInvitados
      })
    })
  }

  /* 
  // mismo método pero usando slice
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
    //calcular los datos para el contador
    const invitadosTotales = this.getTotalInvitados();
    const invitadosConfirmados = this.getConfirmados();
    const invitadosSinConfirmar = invitadosTotales - invitadosConfirmados;

    return (
      <div className="App">
        <Header 
          invitadoPorAgregar={this.state.invitadoPorAgregar}
          agregarInvitado={this.agregarInvitado}
          inputInvitadoPorAgregar={this.inputInvitadoPorAgregar}
        />
        <Main 
          filtrando={this.state.filtrando}
          toggleFiltro={this.toggleFiltro}
          confirmados={invitadosConfirmados}
          sinConfirmar={invitadosSinConfirmar}
          total={invitadosTotales}
          invitados={this.state.invitados}
          toggleConfirmacion={this.toggleConfirmacion}
          toggleEdicion={this.toggleEdicion}
          cambiarNombre={this.cambiarNombre}
          eliminarInvitado={this.eliminarInvitado}
          invitadoPorAgregar={this.state.invitadoPorAgregar}
        />
      </div>
    );

  }

  
}

export default App;
