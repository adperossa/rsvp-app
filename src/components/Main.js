import React from 'react';
import PropTypes from 'prop-types';
import Filtro from './Filtro';
import Contador from './Contador';
import ListaInvitados from './ListaInvitados';

const Main = props => (
  <div className="main">
          <div>
            <h2>Invitados</h2>
            <Filtro 
              filtrando={props.filtrando}
              toggleFiltro={props.toggleFiltro}
            />
          </div>
          <Contador 
            confirmados={props.confirmados}
            sinConfirmar={props.sinConfirmar}
            total={props.total}
          />
          <ListaInvitados 
            invitados={props.invitados}
            filtrando={props.filtrando}
            toggleConfirmacion={props.toggleConfirmacion}
            toggleEdicion={props.toggleEdicion}
            cambiarNombre={props.cambiarNombre}
            eliminarInvitado={props.eliminarInvitado}
            invitadoPorAgregar={props.invitadoPorAgregar}
          />
        </div>
)

Main.propTypes = {
  filtrando: PropTypes.bool.isRequired,
  toggleFiltro: PropTypes.func.isRequired,
  confirmados: PropTypes.number.isRequired,
  sinConfirmar: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  invitados: PropTypes.array.isRequired,
  toggleConfirmacion: PropTypes.func.isRequired,
  toggleEdicion: PropTypes.func.isRequired,
  cambiarNombre: PropTypes.func.isRequired,
  eliminarInvitado: PropTypes.func.isRequired,
  invitadoPorAgregar: PropTypes.string.isRequired
}

export default Main;