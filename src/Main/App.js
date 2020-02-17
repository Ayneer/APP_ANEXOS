import React, { Component, Fragment } from 'react';
import {connect} from 'react-redux';
import ResizeDetector from 'react-resize-detector';
import {withRouter} from 'react-router-dom';
import cx from 'classnames';
import Loader from 'react-loaders';
import AppMain from '../Layout';
import { cargarUsuario, obtenerUsuario, volerLogin } from '../Actions/Autenticacion';
import Autenticacion from '../Autenticacion';

class App extends Component {

  componentDidMount = async () => {
    if(!Autenticacion.obtenerToken()){
      this.props.volverLoginDispatch(null, false);
    }else if(!this.props.usuario){
      this.props.recuperarUsuarioDispatch();
    }
  }

  render() {

    let { colorScheme, 
        enableFixedHeader, 
        enableFixedSidebar, 
        enableFixedFooter, 
        enableClosedSidebar, 
        closedSmallerSidebar, 
        enableMobileMenu, 
        enablePageTabsAlt,
        usuario,
      } = this.props;

    let { cargandoSesion } = this.props;

    return (
      <ResizeDetector
        handleWidth
        render={({ width }) => (
          <Fragment>
            <div className={cx(
              "app-container app-theme-" + colorScheme,
              { 'fixed-header': enableFixedHeader },
              { 'fixed-sidebar': enableFixedSidebar || width < 1250 },
              { 'fixed-footer': enableFixedFooter },
              { 'closed-sidebar': enableClosedSidebar || width < 1250 },
              { 'closed-sidebar-mobile': closedSmallerSidebar || width < 1250 },
              { 'sidebar-mobile-open': enableMobileMenu },
              { 'body-tabs-shadow-btn': enablePageTabsAlt },
            )}>
              {cargandoSesion ? 
              <div className="loader-container">
                    <div className="loader-container-inner">
                        <div className="text-center">
                            <Loader type="ball-grid-beat" />
                        </div>
                        <h6 className="mt-3">
                            Por favor espere.
                            <small>Cargando la sesión</small>
                        </h6>
                    </div>
                </div> : <AppMain usuario={usuario} />}
            </div>
          </Fragment>
        )}
      >

      </ResizeDetector>
    )
  }
}

const mapStateToProp = state => ({
  colorScheme: state.ThemeOptions.colorScheme,
  enableFixedHeader: state.ThemeOptions.enableFixedHeader,
  enableMobileMenu: state.ThemeOptions.enableMobileMenu,
  enableFixedFooter: state.ThemeOptions.enableFixedFooter,
  enableFixedSidebar: state.ThemeOptions.enableFixedSidebar,
  enableClosedSidebar: state.ThemeOptions.enableClosedSidebar,
  enablePageTabsAlt: state.ThemeOptions.enablePageTabsAlt,

  usuario: state.Autenticacion.usuario,
  cargandoSesion: state.Autenticacion.cargandoSesionRecuperada,
});

const mapDispatchToProps = dispatch => ({
  cargarUsuarioDispatch: usuario => dispatch(cargarUsuario(usuario)),
  recuperarUsuarioDispatch: () => dispatch(obtenerUsuario()),
  volverLoginDispatch: (usuario, estado) => dispatch(volerLogin(usuario, estado)),
})

export default withRouter(connect(mapStateToProp, mapDispatchToProps)(App));
