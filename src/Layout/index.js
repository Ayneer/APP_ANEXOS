import React, { Suspense, lazy, Fragment } from 'react';
import { Route, Redirect, Switch, withRouter } from 'react-router-dom';
import Loader from 'react-loaders';
import {ToastContainer} from 'react-toastify';

const Dashboards = lazy(() => import('../Components/Dashboards'));
const Login = lazy(() => import('../Components/LoginBoxed'));

const redireccionar = (component) => {
    window.history.replaceState(null, null, "/");
    return <Redirect to={`${component}`} />
}

const AppMain = ({usuario}) => {
    
    let sesion = usuario;

    return (
        <Fragment>
            <Suspense fallback={
                <div className="loader-container">
                    <div className="loader-container-inner">
                        <div className="text-center">
                            <Loader type="ball-grid-beat" />
                        </div>
                        <h6 className="mt-3">
                            Por favor espere.
                            <small>Cargando la información</small>
                        </h6>
                    </div>
                </div>
            }>
                {sesion ? 
                    <Switch>
                        <Route path="/dashboards" component={Dashboards}/>    
                        <Route path="/" render={() => redireccionar("/dashboards")} />
                    </Switch>
                    :
                    <Switch>
                        <Route exact path="/Login" component={Login}/>
                        <Route path="/" render={() => redireccionar("/Login")} />
                    </Switch>
                }
            </Suspense>            
            <ToastContainer/>
        </Fragment>
    )
}

AppMain.prototype = {
    
}

export default withRouter(AppMain);