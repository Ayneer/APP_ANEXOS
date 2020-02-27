import React, { Component, Fragment } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { Container } from 'reactstrap';

import PageTitle from '../../../Layout/PageTitle';
import TablaContainer from './TablaComponente';
import { connect } from 'react-redux';
import { buscarUsuarios, eliminarUsuario, alertaUsuarioNoEliminado, alertaUsuarioEliminado } from '../../../Actions/Usuarios';
import { accionarMenuFlotante } from '../../../Actions/MenuFlotante';
import { obtenerUsuarios, estanCargandoUsuarios, errorCargandoUsuarios, mensajeErrorCargarUsuarios, estaEliminandoUsuario, errorEliminandoUsuario, mensajeErrorEliminarUsuario, usuarioEliminadoConExito, mensajeExitoEliminandoUsuario, usuariosCargadosConExito } from '../../../reducers/Usuarios';
import { obtenerUsuarioAutenticado } from '../../../reducers/Autenticacion';
import { estadoMenu } from '../../../reducers/MenuFlotante';

class UsuariosDashboard extends Component {

    componentDidMount() {
        let { buscarUsuariosDispatch, usuariosCargados, usuario } = this.props;
        if (!usuariosCargados) {
            buscarUsuariosDispatch(usuario.dataEmpresa._id);
        }
    }

    _eliminarUsuarioSistema = (nit, identificacion) => {
        this.props.eliminarUsuarioDispatch(nit, identificacion);
    }

    _alertaUsuarioNoEliminado = (mensaje, estado) => {
        this.props.alertaUsuarioNoEliminadoDispatch(mensaje, estado);
    }

    _alertaUsuarioEliminado = (mensaje, estado) => {//alterar alerta de exito al eliminar un usuario AlterarAlr_s_u_d
        this.props.alertaUsuarioEliminadoDispatch(mensaje, estado);
    }

    _accionarMenu = (usuario, estado) => {
        const { accionarMenuFlotanteDispatch } = this.props;
        accionarMenuFlotanteDispatch(usuario, estado);
    }

    render() {

        let { usuarios, cargandoUsuarios, errorCargarUsuario, mensajeError, eliminandoUsuario, errorEliminarUsuario, eliminarMensajeError, usuarioEliminado, mensajeExitoEliminar, accionarMenu } = this.props;

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
                        heading="Listado de EPS"
                        subheading="Gestión de EPS registradas en mi IPS."
                        icon="pe-7s-users icon-gradient bg-ripe-malin"
                    />
                    <Fragment>
                        <Container fluid className="mb-5">
                            <TablaContainer 
                                mensajeExitoEliminar={mensajeExitoEliminar} 
                                datoEliminado={usuarioEliminado} 
                                alertaEliminarError={this._alertaUsuarioNoEliminado} 
                                alertaEliminarSuccess={this._alertaUsuarioEliminado} 
                                eliminarMensajeError={eliminarMensajeError} 
                                errorEliminarDato={errorEliminarUsuario} 
                                eliminandoDato={eliminandoUsuario} 
                                eliminarDato={this._eliminarUsuarioSistema} 
                                cargandoDatos={cargandoUsuarios} 
                                datos={usuarios} 
                                error={errorCargarUsuario} 
                                mensajeError={mensajeError} 
                                accionarMenuFlotante={this._accionarMenu} 
                                estadoMenu={accionarMenu} />
                        </Container>
                    </Fragment>
                </ReactCSSTransitionGroup>
            </Fragment>
        )
    }
}

const mapStateToProps = ({Usuarios, Autenticacion, MenuFlotante}) => ({
    usuarios: obtenerUsuarios(Usuarios),
    cargandoUsuarios: estanCargandoUsuarios(Usuarios),
    errorCargarUsuario: errorCargandoUsuarios(Usuarios),
    mensajeError: mensajeErrorCargarUsuarios(Usuarios),
    usuario: obtenerUsuarioAutenticado(Autenticacion),
    eliminandoUsuario: estaEliminandoUsuario(Usuarios),
    errorEliminarUsuario: errorEliminandoUsuario(Usuarios),
    eliminarMensajeError: mensajeErrorEliminarUsuario(Usuarios),
    usuarioEliminado: usuarioEliminadoConExito(Usuarios),
    mensajeExitoEliminar: mensajeExitoEliminandoUsuario(Usuarios),
    usuariosCargados: usuariosCargadosConExito(Usuarios),
    accionarMenu: estadoMenu(MenuFlotante),
});

const mapDispatchToProps = dispatch => ({
    buscarUsuariosDispatch: (id_empresa) => dispatch(buscarUsuarios(id_empresa)),
    eliminarUsuarioDispatch: (nit, identificacion) => dispatch(eliminarUsuario(nit, identificacion)),
    alertaUsuarioNoEliminadoDispatch: (mensaje, estado) => dispatch(alertaUsuarioNoEliminado(mensaje, estado)),
    alertaUsuarioEliminadoDispatch: (mensaje, estado) => dispatch(alertaUsuarioEliminado(mensaje, estado)),
    accionarMenuFlotanteDispatch: (usuario, estado) => dispatch(accionarMenuFlotante(usuario, estado)),
})

export default connect(mapStateToProps, mapDispatchToProps)(UsuariosDashboard);
