import React, { Component, Fragment } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { Container } from 'reactstrap';

import PageTitle from '../../../Layout/PageTitle';
import TablaContainer from '../../TablaOne';
import { connect } from 'react-redux';
import { buscarUsuarios, eliminarUsuario, handlerMensajeEliminarAlerta, alterarAlr_s_u } from '../../../Actions/Usuarios';

class UsuariosDashboard extends Component {

    componentDidMount() {
        
        let {buscarUsuariosDispatch, usuariosCargados} = this.props;
        if(!usuariosCargados){
            console.log("Buscando usuario en la base de datos...")
            buscarUsuariosDispatch(); 
        }  
    }

    eliminarUsuarioSistema = (identificacion) => {
        // console.log(identificacion)
        this.props.eliminarUsuarioDispatch(identificacion);
    }

    alterarAlertaEliminarUsuario = (mensaje, estado) => {
        this.props.handlerMensajeEliminarAlertaDispatch(mensaje, estado)
    }

    alterarAlertaEliminarUsuarioSuccess = (mensaje, estado) => {//alterar alerta de exito al eliminar un usuario AlterarAlr_s_u_d
        console.log(estado)
        this.props.alterarAlr_s_u_d(mensaje, estado)
    }

    render() {

        let { usuarios, cargandoUsuarios, errorCargarUsuario, mensajeError, usuario, eliminandoUsuario, errorEliminarUsuario, eliminarMensajeError, usuarioEliminado, mensajeExitoEliminar } = this.props;
        
        usuarios = usuarios.filter((user) => user.identificacion !== usuario.identificacion);

        return (
            <Fragment>
                <ReactCSSTransitionGroup
                    component="div"
                    transitionName="TabsAnimation"
                    transitionAppear={true}
                    transitionAppearTimeout={0}
                    transitionEnter={false}
                    transitionLeave={false}>
                    <PageTitle
                        heading="Mis usuarios"
                        subheading="Gestión de usuarios registrados en la aplicación."
                        icon="pe-7s-note2 icon-gradient bg-ripe-malin"
                    />
                    <Fragment>
                        <Container fluid className="mb-5">
                            <TablaContainer mensajeExitoEliminar={mensajeExitoEliminar} datoEliminado={usuarioEliminado} alterarAlertaEliminarError={this.alterarAlertaEliminarUsuario} alterarAlertaEliminarSuccess={this.alterarAlertaEliminarUsuarioSuccess} eliminarMensajeError={eliminarMensajeError} errorEliminarDato={errorEliminarUsuario} eliminandoDato={eliminandoUsuario} eliminarDato={this.eliminarUsuarioSistema} cargandoDatos={cargandoUsuarios} datos={usuarios} error={errorCargarUsuario} mensajeError={mensajeError} />
                        </Container>
                    </Fragment>
                </ReactCSSTransitionGroup>
            </Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        usuarios: state.Usuarios.usuarios,
        cargandoUsuarios: state.Usuarios.cargandoUsuarios,
        errorCargarUsuario: state.Usuarios.errorCargarUsuario,
        mensajeError: state.Usuarios.mensajeError,
        usuario: state.Autenticacion.usuario,
        eliminandoUsuario: state.Usuarios.eliminandoUsuario,
        errorEliminarUsuario: state.Usuarios.errorEliminarUsuario,
        eliminarMensajeError: state.Usuarios.eliminarMensajeError,
        usuarioEliminado: state.Usuarios.usuarioEliminado,
        mensajeExitoEliminar: state.Usuarios.mensajeExitoEliminar,
        usuariosCargados: state.Usuarios.usuariosCargados,
        
    }
}

const mapDispatchToProps = dispatch => {
    return {
        buscarUsuariosDispatch: () => dispatch(buscarUsuarios()),
        eliminarUsuarioDispatch: (identificacion) => dispatch(eliminarUsuario(identificacion)),
        handlerMensajeEliminarAlertaDispatch: (mensaje, estado) => dispatch(handlerMensajeEliminarAlerta(mensaje, estado)),
        alterarAlr_s_u_d: (mensaje, estado) => dispatch(alterarAlr_s_u(mensaje, estado)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UsuariosDashboard);
