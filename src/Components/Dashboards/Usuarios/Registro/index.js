import React, { Fragment, Component } from 'react';
import { Col } from 'reactstrap';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { connect } from 'react-redux';
import PageTitle from '../../../../Layout/PageTitle';

import { lanarErrorRegistro, lanzarErrorContraseña, handlerAlertaError, registrarUsuario, handlerAlertaSuccess, buscarDatosSelect, actualizarUsuario, handlerRegistro, handlerUsuarioRegistro, limpiarFormRegistro, handlerId_rol } from '../../../../Actions/Registro';
import { buscarUsuarios, agregarUsuariosState } from '../../../../Actions/Usuarios';
import { withRouter } from 'react-router-dom';
import Api from '../../../../API';
import {
    estanCargadosDatosSelect, errorCargarDatosSelect, errorCampoContraseña, obtenerMensajeErrorContraseña, estanRegistrandoUsuario, obtenerEstadoAlertaError, obtenerMensajeAlertaError, obtenerResultadoRegistro, obtenerEstadoAlertaSuccess, obtenerMensajeAlertaSuccess, obtenerMensajeRegistro, errorEnRegistro, obtenerTiposIdentificacion, obtenerTiposRol,
    obtenerNombres, obtenerTelefono, obtenerId_identificacion, obtenerIdentificacion, obtenerCorreo, obtenerId_rol, obtenerContraseña1, obtenerContraseña2, obtenerApellidos, obtenerEdad, obtenerNombreEmpresa, obtenerNombreNitEmpresa,
} from '../../../../reducers/RegistroUsuario';
import FormularioRegistro from './Form';
import { obtenerUsuarioEditar, estaActualizandoRegistro, alertaActualizarError, mensajeActualizarError, alertaActualizarSuccess, mensajeActualizarSuccess } from '../../../../reducers/EditarUsuario';
import { obtenerUsuarios, usuariosCargadosConExito } from '../../../../reducers/Usuarios'
import { obtenerUsuarioAutenticado } from '../../../../reducers/Autenticacion';
import { EDITAR_EPS, EPS } from '../../../../Layout/AppNav/Rutas';

class RegistroEPS extends Component {

    constructor(props) {
        super(props);

        this.state = {
            usuarioEditar: null,
            finBusquedaUsuarioEditar: false
        }
    }

    _crearUsuario = evento => {
        evento.preventDefault();
        const { lanarErrorRegistroDispatch, lanzarErrorContraseñaDispatch, registrarUsuarioDispatch, nombres, apellidos, edad, telefono, id_identificacion, identificacion, correo, id_rol, contraseña1, contraseña2, nombreEmpresa, nitEmpresa, usuario } = this.props;

        if (!nombres || !apellidos || !edad || !telefono || !id_identificacion || !identificacion || !correo || !id_rol || !contraseña1 || !contraseña2 || !nombreEmpresa.trim() || !nitEmpresa) {
            lanarErrorRegistroDispatch("Este campo es obligatorio", true);
        } else if (contraseña1 !== contraseña2) {
            lanzarErrorContraseñaDispatch("Las contraseñas no coinciden", true);
        } else {
            let datosEmpresa = { nombre: nombreEmpresa.trim(), nit: nitEmpresa.trim(), ips_padre: usuario.dataEmpresa._id };
            let datosUsuario = { identificacion: parseInt(identificacion), nombres, apellidos, edad: parseInt(edad), telefono: parseInt(telefono), id_identificacion };
            let datosAutenticacion = { correo, contraseña: contraseña1, id_rol: parseInt(id_rol) };
            registrarUsuarioDispatch(datosEmpresa, datosUsuario, datosAutenticacion);
        }
    }

    _limpiarCampos = () => {
        const { lanarErrorRegistroDispatch, limpiarFormRegistroDispatch } = this.props;
        limpiarFormRegistroDispatch();
        lanarErrorRegistroDispatch("", false);
    }

    _handleFormRegistro = evento => {
        const name = evento.target.name;
        const value = evento.target.value;
        this.props.handlerRegistroDispatch(name, value);
    }

    _editarAlertaSuccess = (mensaje, estado) => {
        const { estadoAlertaSuccess } = this.props;

        if (!estado && estadoAlertaSuccess) {
            this._limpiarCampos();
        }
        this.props.handlerAlertaSuccessDispatch(mensaje, estado);
    }

    _editarUsuario = evento => {
        evento.preventDefault();
        const { usuarioEditar } = this.state;
        const { nombres, apellidos, edad, telefono, id_identificacion, correo, id_rol, nombreEmpresa, nitEmpresa, identificacion } = this.props;
        const { lanarErrorRegistroDispatch } = this.props;

        if (!nombres.trim() || !apellidos.trim() || !edad || !telefono || !id_identificacion || !correo.trim() || !id_rol || !nombreEmpresa.trim() || !nitEmpresa || !identificacion) {
            lanarErrorRegistroDispatch("Este campo es obligatorio", true);
            console.log("Este campo es obligatorio")
        } else {

            let datosEmpresa = { nombre: nombreEmpresa.trim(), nit: nitEmpresa.trim() };
            let datosUsuario = { identificacion: parseInt(identificacion), nombres, apellidos, edad: parseInt(edad), telefono: parseInt(telefono), id_identificacion };
            let datosAutenticacion = { correo, id_rol: parseInt(id_rol), id_identificacion: parseInt(identificacion) };
            let _idEmpresa = usuarioEditar.dataEmpresa._id;
            let _idUsuario = usuarioEditar.dataUsuario._idUsuario;
            let _idAutenticacion = usuarioEditar.dataAuth._idAutenticacion;
            let usuarioOriginal = usuarioEditar;
            // console.log(usuarioEditar)
            this.props.actualizarUsuarioDispatch(datosEmpresa, datosUsuario, datosAutenticacion, _idEmpresa, _idUsuario, _idAutenticacion, usuarioOriginal);
        }
    }

    _cargarUsuarioEditar = (listaUsuarios, identificacion) => {
        const usuarioEditar = listaUsuarios.filter((user) => user.dataUsuario.identificacion === parseInt(identificacion))[0];
        if (usuarioEditar) {
            this.setState({
                usuarioEditar,
                finBusquedaUsuarioEditar: true
            });
            this.props.handlerUsuarioRegistro(usuarioEditar)
        } else {
            this.setState({ usuarioEditar, finBusquedaUsuarioEditar: true });
        }
    }

    _goListaUsuarios = () => {
        this.props.history.push(EPS);
    }

    componentDidMount = () => {

        const { buscarDatosSelectDispatch, datosSelectCargados, match, usuarios, usuariosCargados, agregarUsuariosStateDispatch, usuario } = this.props;

        if (!datosSelectCargados) {//Si no existen datos para los select (Roles, Identificaciones...) se activa su busqueda en la base de datos
            buscarDatosSelectDispatch(usuario.dataAuth.id_rol);
        }

        if (match.path === `${EDITAR_EPS}:identificacion`) {//Si se esta editando a un usuario 
            const identificacion = match.params.identificacion;
            if (!usuariosCargados) {
                Api.listarUsuarios(usuario.dataEmpresa._id).then((resultado) => {
                    agregarUsuariosStateDispatch(resultado.usuarios);
                    this._cargarUsuarioEditar(resultado.usuarios, identificacion);
                }).catch((error) => {
                    console.log(error)
                    this.setState({ usuarioEditar: null, finBusquedaUsuarioEditar: true });
                });
            } else {
                this._cargarUsuarioEditar(usuarios, identificacion);
            }
        }
    }

    render() {

        const { registroMensaje, registroError, tiposIdentificacion, tiposRol, datosSelectCargados, errorCargarDatosSelect, errorCampoContraseña, mensajeCampoContraseña, registrandoUsuario, estadoAlertaError, mensajeAlertaError, estadoAlertaSuccess, mensajeAlertaSuccess, handlerAlertaErrorDispatch, match, actualizandoRegistro, estadoAlertaActualizarError, errorActualizarMensaje, mensaje_alerta_success_act, estado_alerta_success_act,
            nombres, apellidos, edad, telefono, id_identificacion, identificacion, correo, id_rol, contraseña1, contraseña2, nombreEmpresa, nitEmpresa } = this.props;

        const { usuarioEditar, finBusquedaUsuarioEditar } = this.state;
        const seEstaEditando = match.path === `${EDITAR_EPS}:identificacion` ? true : false;
        const disabledInput = actualizandoRegistro || registrandoUsuario ? true : false;
        let iconModal = seEstaEditando ? "lnr-pencil" : "lnr-users";

        if (!datosSelectCargados) {//Si aún no se ha terminado de hacer la consulta a la base de datos
            return <div>Cargando...</div>
        } else if (errorCargarDatosSelect) {//Error al intentar cargar los datos
            return <div>Error al intentar cargar los datos de select</div>
        }

        if (seEstaEditando && !usuarioEditar && !finBusquedaUsuarioEditar) {// si se esta editando a un usuario y aún no se ha cargado
            return <div>Cargando datos del registro...</div>
        }

        if (seEstaEditando && !usuarioEditar && finBusquedaUsuarioEditar) {// si se esta editando a un usuario y no se encontró
            return <div>No existe el usuario que pretende editar.</div>
        }

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
                        heading={seEstaEditando ? "Actualización de EPS" : "Registro de EPS"}
                        subheading={seEstaEditando ? "Formulario para la actualización de una EPS." : "Formulario para el registro de una EPS."}
                        icon={seEstaEditando ? "pe-7s-loop icon-gradient bg-ripe-malin" : "pe-7s-note2 icon-gradient bg-ripe-malin"}
                    />

                    {tiposIdentificacion.length === 0 || tiposRol.length === 0 ?
                        <div> {seEstaEditando ? "Error, en este momento no se puede realizar ediciones" : "Error, en este momento no se puede realizar registros"}</div>
                        :
                        <div className="">
                            <div className="d-flex justify-content-center align-items-center">
                                <Col md="12" className="mx-auto app-login-box">
                                    <div className="app-logo-inverse mx-auto mb-3" />

                                    <div className="modal-dialog w-100" id="modal-registro-usuario">
                                        <div className="modal-content">
                                            <FormularioRegistro
                                                iconModal={iconModal}
                                                seEstaEditando={seEstaEditando}
                                                disabledInput={disabledInput}
                                                registroMensaje={registroMensaje}
                                                registroError={registroError}
                                                errorCampoContraseña={errorCampoContraseña}
                                                mensajeCampoContraseña={mensajeCampoContraseña}
                                                estadoAlertaError={estadoAlertaError}
                                                estadoAlertaSuccess={estadoAlertaSuccess}
                                                estadoAlertaActualizarError={estadoAlertaActualizarError}
                                                estado_alerta_success_act={estado_alerta_success_act}
                                                mensaje_alerta_success_act={mensaje_alerta_success_act}
                                                mensajeAlertaError={mensajeAlertaError}
                                                mensajeAlertaSuccess={mensajeAlertaSuccess}
                                                errorActualizarMensaje={errorActualizarMensaje}
                                                handlerAlertaErrorDispatch={handlerAlertaErrorDispatch}
                                                _editarAlertaSuccess={this._editarAlertaSuccess}
                                                _goListaUsuarios={this._goListaUsuarios}
                                                _limpiarCampos={this._limpiarCampos}
                                                _editarUsuario={this._editarUsuario}
                                                _crearUsuario={this._crearUsuario}
                                                _handleFormRegistro={this._handleFormRegistro}

                                                nombreEmpresa={nombreEmpresa}
                                                nitEmpresa={nitEmpresa}
                                                nombres={nombres}
                                                apellidos={apellidos}
                                                edad={edad}
                                                telefono={telefono}
                                                id_identificacion={id_identificacion}
                                                identificacion={identificacion}
                                                tiposIdentificacion={tiposIdentificacion}
                                                correo={correo}
                                                id_rol={id_rol}
                                                tiposRol={tiposRol}
                                                contraseña1={contraseña1}
                                                contraseña2={contraseña2}
                                            />
                                            
                                        </div>
                                    </div>
                                </Col>
                            </div>
                        </div>
                    }
                </ReactCSSTransitionGroup>
            </Fragment>
        )
    }

};

const mapStateToProps = ({ RegistroUsuario, EditarUsuario, Usuarios, Autenticacion }) => ({
    registroMensaje: obtenerMensajeRegistro(RegistroUsuario),
    registroError: errorEnRegistro(RegistroUsuario),
    tiposIdentificacion: obtenerTiposIdentificacion(RegistroUsuario),
    tiposRol: obtenerTiposRol(RegistroUsuario),
    datosSelectCargados: estanCargadosDatosSelect(RegistroUsuario),
    errorCargarDatosSelect: errorCargarDatosSelect(RegistroUsuario),
    errorCampoContraseña: errorCampoContraseña(RegistroUsuario),
    mensajeCampoContraseña: obtenerMensajeErrorContraseña(RegistroUsuario),
    registrandoUsuario: estanRegistrandoUsuario(RegistroUsuario),
    estadoAlertaError: obtenerEstadoAlertaError(RegistroUsuario),
    mensajeAlertaError: obtenerMensajeAlertaError(RegistroUsuario),
    resultado_registro: obtenerResultadoRegistro(RegistroUsuario),
    estadoAlertaSuccess: obtenerEstadoAlertaSuccess(RegistroUsuario),
    mensajeAlertaSuccess: obtenerMensajeAlertaSuccess(RegistroUsuario),
    usuarioEditar: obtenerUsuarioEditar(EditarUsuario),
    usuarios: obtenerUsuarios(Usuarios),
    usuariosCargados: usuariosCargadosConExito(Usuarios),
    actualizandoRegistro: estaActualizandoRegistro(EditarUsuario),
    estadoAlertaActualizarError: alertaActualizarError(EditarUsuario),
    errorActualizarMensaje: mensajeActualizarError(EditarUsuario),
    estado_alerta_success_act: alertaActualizarSuccess(EditarUsuario),
    mensaje_alerta_success_act: mensajeActualizarSuccess(EditarUsuario),

    nombres: obtenerNombres(RegistroUsuario),
    apellidos: obtenerApellidos(RegistroUsuario),
    edad: obtenerEdad(RegistroUsuario),
    telefono: obtenerTelefono(RegistroUsuario),
    id_identificacion: obtenerId_identificacion(RegistroUsuario),
    identificacion: obtenerIdentificacion(RegistroUsuario),
    correo: obtenerCorreo(RegistroUsuario),
    id_rol: obtenerId_rol(RegistroUsuario),
    contraseña1: obtenerContraseña1(RegistroUsuario),
    contraseña2: obtenerContraseña2(RegistroUsuario),
    usuario: obtenerUsuarioAutenticado(Autenticacion),
    nombreEmpresa: obtenerNombreEmpresa(RegistroUsuario),
    nitEmpresa: obtenerNombreNitEmpresa(RegistroUsuario),
});

const mapDispatchToProps = dispatch => ({
    lanarErrorRegistroDispatch: (mensaje, estado) => dispatch(lanarErrorRegistro(mensaje, estado)),
    lanzarErrorContraseñaDispatch: (mensaje, estado) => dispatch(lanzarErrorContraseña(mensaje, estado)),
    handlerAlertaErrorDispatch: (mensaje, estado) => dispatch(handlerAlertaError(mensaje, estado)),
    registrarUsuarioDispatch: (datosEmpresa, datosUsuario, datosAutenticacion) => dispatch(registrarUsuario(datosEmpresa, datosUsuario, datosAutenticacion)),
    handlerAlertaSuccessDispatch: (mensaje, estado) => dispatch(handlerAlertaSuccess(mensaje, estado)),
    buscarDatosSelectDispatch: (id_rol) => dispatch(buscarDatosSelect(id_rol)),
    buscarUsuariosDispatch: () => dispatch(buscarUsuarios()),
    agregarUsuariosStateDispatch: usuarios => dispatch(agregarUsuariosState(usuarios)),
    actualizarUsuarioDispatch: (actualizacionEmpresa, actualizacionUsuario, actualizacionAutenticacion, _idEmpresa, _idUsuario, _idAutenticacion, usuarioOriginal) => dispatch(actualizarUsuario(actualizacionEmpresa, actualizacionUsuario, actualizacionAutenticacion, _idEmpresa, _idUsuario, _idAutenticacion, usuarioOriginal)),
    handlerRegistroDispatch: (name, value) => dispatch(handlerRegistro(name, value)),
    handlerUsuarioRegistro: usuario => dispatch(handlerUsuarioRegistro(usuario)),
    limpiarFormRegistroDispatch: () => dispatch(limpiarFormRegistro()),
    handlerId_rolDispatch: id_rol => dispatch(handlerId_rol(id_rol)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(RegistroEPS));