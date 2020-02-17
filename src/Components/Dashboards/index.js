import React, { Fragment, Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

// Layout
import AppHeader from '../../Layout/AppHeader/';
import AppSidebar from '../../Layout/AppSidebar/';
import AppFooter from '../../Layout/AppFooter/';

import { cerrarSesion } from '../../Actions/Autenticacion';
import { connect } from 'react-redux';

// DASHBOARDS
import UsuariosDashboard from './Usuarios';
import Registro from '../Registro';

class Dashboards extends Component {
    cerrarSesion = () => {
        const {cerrarSesionDispatch} = this.props;
        cerrarSesionDispatch();
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
                                <Route exact path={`${match.url}/registrar`} component={Registro} />

                                <Route exact path={`${match.url}/salir`} render={() => this.cerrarSesion()} />
                                <Route path="/" render={() => <Redirect to={`${match.url}/usuarios`} />} />
                            </Switch>
                        </div>{/* Body Fin */}
                        <AppFooter /> {/* Footer */}
                    </div>
                </div>
            </Fragment>
        )
    }

};

const mapStateoProps = state => {
    return{

    }
}

const mapDispatchToPros = dispatch => {
    return {
        cerrarSesionDispatch: () => dispatch(cerrarSesion())
    }
}

export default connect(mapStateoProps, mapDispatchToPros)(Dashboards);