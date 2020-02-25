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
import Registro from './Usuarios/Registro';
import { REGISTRAR_EPS, EDITAR_EPS, EPS} from '../../Layout/AppNav/Rutas';

class Dashboards extends Component {

    constructor(props){
        super(props);

        this.state = {
            prevPath: ""
        }
    }

    _cerrarSesion = () => {
        const { cerrarSesionDispatch } = this.props;
        cerrarSesionDispatch();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.location !== this.props.location) {
            this.setState({ prevPath: this.props.location })
        }
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
                                <Route exact path={EPS} component={UsuariosDashboard} />
                                <Route exact path={REGISTRAR_EPS} component={Registro} />
                                <Route exact path={`${EDITAR_EPS}:identificacion`} component={Registro} />

                                <Route exact path={`${match.url}/salir`} render={() => this._cerrarSesion()} />
                                <Route path="/" render={() => <Redirect to={EPS} />} />
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
    cerrarSesionDispatch: () => dispatch(cerrarSesion())
});

export default connect(mapStateoProps, mapDispatchToPros)(Dashboards);