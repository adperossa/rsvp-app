import React, { Component } from 'react';
import Header from './components/Header';
import Main from './components/Main';

class App extends Component {

  constructor(props) {
    super(props);
    
    // Como es una aplicación muy simple, acumulo todo el state en el componente raiz.
    // De aumentar la complejidad convendría convertir algunos comp funcionales en clases con su propio state y
    // manejar localmente variables como la usada para el filtro, o el estado de 'editando' el nombre en cada Invitado
    // TODO: utilizar ID unico para cada invitado en lugar del index

    // almacenar el mock de state basico 
    this.baseState = { 
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

    // verificar si ya hay un state en localstorage y cargarlo...
    if (window.localStorage.rsvp_cachelocal) {
      this.cargarStatePersistente();
      console.warn('RSVP App - Utilizando almacenamiento local');
    } else {
      //o sino, inicializar el state con el mock anterior
      this.state = this.baseState;
    }
  }
  
  // comienzan metodos para manejar el localStorage

  guardarStatePersistente = () => {
    // convertir en jsonstring el state actual y guardarlo en localstorage
    const stateToSave = JSON.stringify(this.state);
    window.localStorage.state = stateToSave;
    // marcar que dejamos un state persistente de la app
    window.localStorage.rsvp_cachelocal = true;
  }

  cargarStatePersistente = () => {
    const cachedState = JSON.parse(window.localStorage.state);
    this.state = cachedState;
  }

  borrarLocalStorage = () => {
    window.localStorage.rsvp_cachelocal = false;
    window.localStorage.clear();
    this.setState({
      ...this.baseState
    });
  }

  componentDidMount() {
    //agregamos un listener para manejar los casos en que la pagina se actualice manualmente
    //o el usuario cierre el browser, ya que componentWillUnmount no se dispara en esos casos
    window.addEventListener('beforeunload', this.guardarStatePersistente);
  }

  componentWillUnmount() {
    //guardamos el state actual
    this.guardarStatePersistente();
    //quitar el eventlistener de beforeunload
    window.removeEventListener('beforeunload', this.guardarStatePersistente);
  }

  // fin metodos localStorage


  
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
          borrarLocalStorage={this.borrarLocalStorage}
        />
      </div>
    );

  }

  
}

export default App;
