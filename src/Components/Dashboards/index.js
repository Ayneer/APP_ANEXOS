import React, { Fragment, lazy } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

// Layout
import AppHeader from '../../Layout/AppHeader/';
import AppSidebar from '../../Layout/AppSidebar/';
import AppFooter from '../../Layout/AppFooter/';

// DASHBOARDS
const UsuariosDashboard = lazy(() => import('./Usuarios'));

const Dashboards = ({ match }) => (
    <Fragment>
        <AppHeader /> {/* Navbar horizontal */}
        <div className="app-main">
            <AppSidebar /> {/* Navbar vertical */}
            <div className="app-main__outer"> {/* Body Inicio */}
                <div className="app-main__inner">
                    <Switch>{/* Rutas Body */}
                        <Route exact path={`${match.url}/usuarios`} component={UsuariosDashboard} />
                        <Route path="/" render={() => <Redirect to={`${match.url}/usuarios`} />} />
                    </Switch>
                </div>{/* Body Fin */}
                <AppFooter /> {/* Footer */}
            </div>
        </div>
    </Fragment>
);

export default Dashboards;