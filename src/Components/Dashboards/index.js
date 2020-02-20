import React, { Fragment, Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

// Layout
import AppHeader from '../../Layout/AppHeader/';
import AppSidebar from '../../Layout/AppSidebar/';
// import AppFooter from '../../Layout/AppFooter/';

import { cerrarSesion } from '../../Actions/Autenticacion';
import { connect } from 'react-redux';

// DASHBOARDS
import UsuariosDashboard from './Usuarios';
import Registro from '../Registro';
import { limpiarRegistro } from '../../Actions/Registro';

class Dashboards extends Component {

    _cerrarSesion = () => {
        const {cerrarSesionDispatch} = this.props;
        cerrarSesionDispatch();
    }

    _abrirNuevoRegistro = () => {
        this.props.limpiarRegistro();
        return <Registro />;
    }

    render() {

        const { match } = this.props;

        return (
            <Fragment>
                <AppHeader /> {/* Navbar horizontal */}
                <div className="app-main">
                    <AppSidebar /> {/* Navbar vertical */}
                    <div className="app-main__outer"> {/* Body Inicio */}
                        <div className="app-main__inner">
                            <Switch>{/* Rutas Body */}
                                <Route exact path={`${match.url}/usuarios`} component={UsuariosDashboard} />
                                <Route exact path={`${match.url}/registrar`} render={()=> this._abrirNuevoRegistro()} />
                                <Route exact path={`${match.url}/editar/:identificacion`} component={Registro} />

                                <Route exact path={`${match.url}/salir`} render={() => this._cerrarSesion()} />
                                <Route path="/" render={() => <Redirect to={`${match.url}/usuarios`} />} />
                            </Switch>
                        </div>{/* Body Fin */}
                        {/* <AppFooter /> Footer */}
                    </div>
                </div>
            </Fragment>
        )
    }

};

const mapStateoProps = state => ({});
const mapDispatchToPros = dispatch => ({ 
    cerrarSesionDispatch: () => dispatch(cerrarSesion()),
    limpiarRegistro: () => dispatch(limpiarRegistro())
});

export default connect(mapStateoProps, mapDispatchToPros)(Dashboards);