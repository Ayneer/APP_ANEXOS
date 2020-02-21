import React, { Fragment, Component } from 'react';
import { Col, Row, Button, Form, FormGroup, Input, FormFeedback } from 'reactstrap';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import SweetAlert from 'sweetalert-react';
import { connect } from 'react-redux';
import LaddaButton, { EXPAND_LEFT } from 'react-ladda';
import PageTitle from '../../Layout/PageTitle';

import { lanarErrorRegistro, lanzarErrorContraseña, handlerAlertaError, registrarUsuario, handlerAlertaSuccess, buscarDatosSelect, actualizarUsuario, handlerRegistro, handlerUsuarioRegistro, limpiarFormRegistro } from '../../Actions/Registro';
import { buscarUsuarios, agregarUsuariosState } from '../../Actions/Usuarios';
import { withRouter } from 'react-router-dom';
import Api from '../../API';
import {
    estanCargadosDatosSelect, errorCargarDatosSelect, errorCampoContraseña, obtenerMensajeErrorContraseña, estanRegistrandoUsuario, obtenerEstadoAlertaError, obtenerMensajeAlertaError, obtenerResultadoRegistro, obtenerEstadoAlertaSuccess, obtenerMensajeAlertaSuccess, obtenerMensajeRegistro, errorEnRegistro, obtenerTiposIdentificacion, obtenerTiposRol,
    obtenerNombres, obtenerTelefono, obtenerId_identificacion, obtenerIdentificacion, obtenerCorreo, obtenerId_rol, obtenerContraseña1, obtenerContraseña2, obtenerApellidos, obtenerEdad
} from '../../reducers/RegistroUsuario';
import { obtenerUsuarioEditar, estaActualizandoRegistro, alertaActualizarError, mensajeActualizarError, alertaActualizarSuccess, mensajeActualizarSuccess } from '../../reducers/EditarUsuario';
import { obtenerUsuarios, usuariosCargadosConExito } from '../../reducers/Usuarios'

class RegisterBoxed extends Component {

    constructor(props) {
        super(props);

        this.state = {
            usuarioEditar: null,
            finBusquedaUsuarioEditar: false
        }
    }

    _crearUsuario = evento => {
        evento.preventDefault();
        const { lanarErrorRegistroDispatch, lanzarErrorContraseñaDispatch, registrarUsuarioDispatch, nombres, apellidos, edad, telefono, id_identificacion, identificacion, correo, id_rol, contraseña1, contraseña2 } = this.props;

        if (!nombres || !apellidos || !edad || !telefono || !id_identificacion || !identificacion || !correo || !id_rol || !contraseña1 || !contraseña2) {
            lanarErrorRegistroDispatch("Este campo es obligatorio", true);
        } else if (contraseña1 !== contraseña2) {
            lanzarErrorContraseñaDispatch("Las contraseñas no coinciden", true);
        } else {
            let usuario = {
                nombres,
                apellidos,
                edad: parseInt(edad),
                telefono: parseInt(telefono),
                identificacion: parseInt(identificacion),
                id_identificacion,
                correo,
                contraseña: contraseña1,
                id_rol: parseInt(id_rol)
            }
            registrarUsuarioDispatch(usuario)
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
        const { nombres, apellidos, edad, telefono, id_identificacion, correo, id_rol } = this.props;
        const { lanarErrorRegistroDispatch } = this.props;

        if (!nombres.trim() || !apellidos.trim() || !edad || !telefono || !id_identificacion || !correo.trim() || !id_rol) {
            lanarErrorRegistroDispatch("Este campo es obligatorio", true);
            console.log("Este campo es obligatorio")
        } else {

            let actualizacion = {
                nombres: nombres.trim(),
                apellidos: apellidos.trim(),
                edad: parseInt(edad),
                telefono: parseInt(telefono),
                correo: correo.trim(),
                id_rol: parseInt(id_rol)
            }

            this.props.actualizarUsuarioDispatch(usuarioEditar.identificacion, actualizacion, usuarioEditar);
        }
    }

    _cargarUsuarioEditar = (listaUsuarios, identificacion) => {
        const usuarioEditar = listaUsuarios.filter((user) => user.identificacion === parseInt(identificacion))[0];
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
        this.props.history.push('/dashboards/usuarios');
    }

    componentDidMount = () => {

        const { buscarDatosSelectDispatch, datosSelectCargados, match, usuarios, usuariosCargados, agregarUsuariosStateDispatch } = this.props;

        if (!datosSelectCargados) {//Si no existen datos para los select (Roles, Identificaciones...) se activa su busqueda en la base de datos
            buscarDatosSelectDispatch();
        }

        if (match.path === "/dashboards/editar/:identificacion") {//Si se esta editando a un usuario 
            const identificacion = match.params.identificacion;
            if (!usuariosCargados) {
                Api.listarUsuarios().then((resultado) => {
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
            nombres, apellidos, edad, telefono, id_identificacion, identificacion, correo, id_rol, contraseña1, contraseña2, } = this.props;

        const { usuarioEditar, finBusquedaUsuarioEditar } = this.state;

        const seEstaEditando = match.path === "/dashboards/editar/:identificacion" ? true : false;
        const disabledInput = actualizandoRegistro || registrandoUsuario ? true : false;

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
                        heading={seEstaEditando ? "Actualización de usuario" : "Registro de usuario"}
                        subheading={seEstaEditando ? "Formulario para la actualización de un usuario." : "Formulario para el registro de un usuario."}
                        icon={seEstaEditando ? "pe-7s-loop icon-gradient bg-ripe-malin" : "pe-7s-note2 icon-gradient bg-ripe-malin"}
                    />

                    {tiposIdentificacion.length === 0 || tiposRol.length === 0 ?
                        <div> {seEstaEditando ? "Error, en este momento no se puede realizar ediciones" : "Error, en este momento no se puede realizar registros"}</div>
                        :
                        <div className="">
                            <div className="d-flex justify-content-center align-items-center">
                                <Col md="8" className="mx-auto app-login-box">
                                    <div className="app-logo-inverse mx-auto mb-3" />

                                    <div className="modal-dialog w-100">
                                        <div className="modal-content">
                                            <Form>
                                                <div className="modal-body">
                                                    <h5 className="modal-title">
                                                        <div> {seEstaEditando ? "Editar usuario" : "Nuevo usuario"}</div>
                                                        <div className="mt-2">
                                                            {seEstaEditando ?
                                                                <span>Esto tomará <span className="text-success">pocos segundos</span> </span>
                                                                :
                                                                <span>Esto tomará <span className="text-success">pocos segundos</span> para crear la cuenta</span>
                                                            }

                                                        </div>
                                                    </h5>
                                                    <Row className="divider" />

                                                    <Row form>
                                                        <Col md={6}>
                                                            <FormGroup>
                                                                <Input type="text" name="nombres" value={nombres} id="Nombres" onChange={this._handleFormRegistro} placeholder="Nombres" invalid={registroError && !nombres.trim() ? true : false} disabled={disabledInput} />
                                                                <FormFeedback>{registroMensaje}</FormFeedback>
                                                            </FormGroup>
                                                        </Col>
                                                        <Col md={6}>
                                                            <FormGroup>
                                                                <Input type="text" name="apellidos" value={apellidos} id="Apellidos" onChange={this._handleFormRegistro} placeholder="Apellidos" invalid={registroError && !apellidos.trim() ? true : false} disabled={disabledInput} />
                                                                <FormFeedback>{registroMensaje}</FormFeedback>
                                                            </FormGroup>
                                                        </Col>
                                                        <Col md={6}>
                                                            <FormGroup>
                                                                <Input type="number" name="edad" value={edad} id="Edad" onChange={this._handleFormRegistro} placeholder="Edad" invalid={registroError && !edad ? true : false} disabled={disabledInput} />
                                                                <FormFeedback>{registroMensaje}</FormFeedback>
                                                            </FormGroup>
                                                        </Col>
                                                        <Col md={6}>
                                                            <FormGroup>
                                                                <Input type="number" name="telefono" value={telefono} id="Telefono" onChange={this._handleFormRegistro} placeholder="Telefono" invalid={registroError && !telefono ? true : false} disabled={disabledInput} />
                                                                <FormFeedback>{registroMensaje}</FormFeedback>
                                                            </FormGroup>
                                                        </Col>
                                                        <Col md={6}>
                                                            <FormGroup>

                                                                <Input type="select" name="id_identificacion" value={id_identificacion} onChange={this._handleFormRegistro} id="id_identificacion" invalid={registroError && !id_identificacion ? true : false} disabled={disabledInput || seEstaEditando}>

                                                                    <option value={""} >{"Seleccione una opción"}</option>
                                                                    {tiposIdentificacion.map((dato) =>
                                                                        <option key={dato._id} value={dato.tipo_identificacion} >{dato.acronimo}</option>
                                                                    )}

                                                                </Input>
                                                                <FormFeedback>{registroMensaje}</FormFeedback>
                                                            </FormGroup>
                                                        </Col>
                                                        <Col md={6}>
                                                            <FormGroup>
                                                                <Input type="number" name="identificacion" value={identificacion} onChange={this._handleFormRegistro} id="identificacion" placeholder="Identificacion" invalid={registroError && !identificacion ? true : false} disabled={disabledInput || seEstaEditando} />
                                                                <FormFeedback>{registroMensaje}</FormFeedback>
                                                            </FormGroup>
                                                        </Col>
                                                        <Col md={6}>
                                                            <FormGroup>
                                                                <Input type="email" name="correo" value={correo} id="correo" onChange={this._handleFormRegistro} placeholder="Correo" autoComplete="usuario" invalid={registroError && !correo.trim() ? true : false} disabled={disabledInput} />
                                                                <FormFeedback>{registroMensaje}</FormFeedback>
                                                            </FormGroup>
                                                        </Col>
                                                        <Col md={6}>
                                                            <FormGroup>

                                                                <Input type="select" name="id_rol" value={id_rol} id="id_rol" onChange={this._handleFormRegistro} placeholder="Rol" invalid={registroError && !id_rol ? true : false} disabled={disabledInput}>

                                                                    <option value={""} >{"Seleccione una opción"}</option>
                                                                    {tiposRol.map((dato) =>
                                                                        <option key={dato._id} value={dato.id_rol} >{dato.tipo_perfil}</option>
                                                                    )}

                                                                </Input>
                                                                <FormFeedback>{registroMensaje}</FormFeedback>
                                                            </FormGroup>
                                                        </Col>
                                                        {!seEstaEditando &&
                                                            <Col md={6}>
                                                                <FormGroup>
                                                                    <Input type="password" name="contraseña1" value={contraseña1} id="Contraseña" onChange={this._handleFormRegistro} placeholder="Contraseña" autoComplete="new-password" invalid={(registroError && !contraseña1.trim()) || errorCampoContraseña ? true : false} disabled={disabledInput} />
                                                                    <FormFeedback>{errorCampoContraseña ? mensajeCampoContraseña : registroMensaje}</FormFeedback>
                                                                </FormGroup>
                                                            </Col>
                                                        }
                                                        {!seEstaEditando &&
                                                            <Col md={6}>
                                                                <FormGroup>
                                                                    <Input type="password" name="contraseña2" value={contraseña2} id="Contraseña2" onChange={this._handleFormRegistro} placeholder="Repita su contraseña" autoComplete="new-password 2" invalid={(registroError && !contraseña2.trim()) || errorCampoContraseña ? true : false} disabled={disabledInput} />
                                                                    <FormFeedback>{errorCampoContraseña ? mensajeCampoContraseña : registroMensaje}</FormFeedback>
                                                                </FormGroup>
                                                            </Col>
                                                        }

                                                    </Row>
                                                </div>
                                                <Row>
                                                    <Col md={6}>
                                                        <div className="modal-footer d-block text-center">
                                                            <Button
                                                                color="danger"
                                                                className="btn-wide btn-pill btn-shadow btn-hover-shine"
                                                                size="lg"
                                                                onClick={seEstaEditando ? this._goListaUsuarios : this._limpiarCampos}
                                                                disabled={disabledInput}>
                                                                {seEstaEditando ? "Cancelar" : "Limpiar"}
                                                            </Button>
                                                        </div>
                                                    </Col>
                                                    <Col md={6}>
                                                        <div className="modal-footer d-block text-center">
                                                            <LaddaButton
                                                                className="btn-wide btn-pill btn-shadow btn-hover-shine btn btn-primary btn-lg"
                                                                loading={disabledInput}
                                                                onClick={seEstaEditando ? this._editarUsuario : this._crearUsuario}
                                                                data-style={EXPAND_LEFT}
                                                            >
                                                                {seEstaEditando ? "Editar cuenta" : "Crear cuenta"}
                                                            </LaddaButton>
                                                        </div>
                                                    </Col>
                                                </Row>

                                                <SweetAlert
                                                    title="Oops, ah ocurrido un error!"
                                                    confirmButtonColor=""
                                                    show={(estadoAlertaError || estadoAlertaActualizarError) ? true : false}
                                                    text={estadoAlertaError ? mensajeAlertaError : estadoAlertaActualizarError ? errorActualizarMensaje : ""}
                                                    type="error"
                                                    onConfirm={() => handlerAlertaErrorDispatch("", false)} />

                                                <SweetAlert
                                                    title="Proceso exitoso!"
                                                    confirmButtonColor=""
                                                    show={(estadoAlertaSuccess || estado_alerta_success_act) ? true : false}
                                                    text={estadoAlertaSuccess ? mensajeAlertaSuccess : estado_alerta_success_act ? mensaje_alerta_success_act : ""}
                                                    type="success"
                                                    onConfirm={() => this._editarAlertaSuccess("", false)} />


                                            </Form>
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

const mapStateToProps = ({ RegistroUsuario, EditarUsuario, Usuarios }) => ({
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
});

const mapDispatchToProps = dispatch => ({
    lanarErrorRegistroDispatch: (mensaje, estado) => dispatch(lanarErrorRegistro(mensaje, estado)),
    lanzarErrorContraseñaDispatch: (mensaje, estado) => dispatch(lanzarErrorContraseña(mensaje, estado)),
    handlerAlertaErrorDispatch: (mensaje, estado) => dispatch(handlerAlertaError(mensaje, estado)),
    registrarUsuarioDispatch: (usuario) => dispatch(registrarUsuario(usuario)),
    handlerAlertaSuccessDispatch: (mensaje, estado) => dispatch(handlerAlertaSuccess(mensaje, estado)),
    buscarDatosSelectDispatch: () => dispatch(buscarDatosSelect()),
    buscarUsuariosDispatch: () => dispatch(buscarUsuarios()),
    agregarUsuariosStateDispatch: usuarios => dispatch(agregarUsuariosState(usuarios)),
    actualizarUsuarioDispatch: (identificacion, actualizacion, usuariOriginal) => dispatch(actualizarUsuario(identificacion, actualizacion, usuariOriginal)),
    handlerRegistroDispatch: (name, value) => dispatch(handlerRegistro(name, value)),
    handlerUsuarioRegistro: usuario => dispatch(handlerUsuarioRegistro(usuario)),
    limpiarFormRegistroDispatch: () => dispatch(limpiarFormRegistro())
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(RegisterBoxed));