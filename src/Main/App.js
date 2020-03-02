import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import ResizeDetector from 'react-resize-detector';
import { withRouter } from 'react-router-dom';
import cx from 'classnames';
import Loader from 'react-loaders';
import AppMain from '../Layout';
import { cargarUsuario, obtenerUsuario, volerLogin } from '../Actions/Autenticacion';
import Autenticacion from '../Autenticacion';
import { obtenerUsuarioAutenticado, estaCargandoSesion } from '../reducers/Autenticacion';
import { estanCargadoDatosSistema } from '../reducers/Sistema';

class App extends Component {

  componentDidMount = async () => {

    const { usuario, volverLoginDispatch, recuperarUsuarioDispatch} = this.props;

    if (!Autenticacion.obtenerToken()) {
      volverLoginDispatch(null, false);
    } else if (!usuario) {
      recuperarUsuarioDispatch();
    }
    
  }

  render() {

    let { colorScheme, enableFixedHeader, enableFixedSidebar, enableFixedFooter, enableClosedSidebar, closedSmallerSidebar, enableMobileMenu, enablePageTabsAlt, usuario, DatosCargados, } = this.props;
    console.log(DatosCargados)
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

const mapStateToProp = ({ThemeOptions, Autenticacion, Sistema}) => ({
  colorScheme: ThemeOptions.colorScheme,
  enableFixedHeader: ThemeOptions.enableFixedHeader,
  enableMobileMenu: ThemeOptions.enableMobileMenu,
  enableFixedFooter: ThemeOptions.enableFixedFooter,
  enableFixedSidebar: ThemeOptions.enableFixedSidebar,
  enableClosedSidebar: ThemeOptions.enableClosedSidebar,
  enablePageTabsAlt: ThemeOptions.enablePageTabsAlt,

  usuario: obtenerUsuarioAutenticado(Autenticacion), 
  cargandoSesion: estaCargandoSesion(Autenticacion),
  DatosCargados: estanCargadoDatosSistema(Sistema),
});

const mapDispatchToProps = dispatch => ({
  cargarUsuarioDispatch: usuario => dispatch(cargarUsuario(usuario)),
  recuperarUsuarioDispatch: () => dispatch(obtenerUsuario()),
  volverLoginDispatch: (usuario, estado) => dispatch(volerLogin(usuario, estado)),
})

export default withRouter(connect(mapStateToProp, mapDispatchToProps)(App));
