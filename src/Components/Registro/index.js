import React, { Fragment, Component } from 'react';
import { Col, Row, Button, Form, FormGroup, Input, FormFeedback } from 'reactstrap';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import SweetAlert from 'sweetalert-react';
import { connect } from 'react-redux';
import LaddaButton, { EXPAND_LEFT } from 'react-ladda';
import PageTitle from '../../Layout/PageTitle';

import { lanarError, ErrorCampo_contraseña, handlerAlertaError, registrarUsuario, handlerAlertaSuccess, buscarDatosSelect, actualizarUsuario } from '../../Actions/Registro';
import { buscarUsuarios, agregarUsuariosState } from '../../Actions/Usuarios';
import { withRouter } from 'react-router-dom';
import Api from '../../API';

// Layout

class RegisterBoxed extends Component {

    constructor(props) {
        super(props);

        this.state = {
            nombres: "",
            apellidos: "",
            edad: "",
            telefono: "",
            id_identificacion: "",
            identificacion: "",
            correo: "",
            id_rol: "",
            contraseña1: "",
            contraseña2: "",
            usuarioEditar: null,
            finBusquedaUsuarioEditar: false
        }
    }

    crearUsuario = evento => {
        evento.preventDefault();
        const { nombres, apellidos, edad, telefono, id_identificacion, identificacion, correo, id_rol, contraseña1, contraseña2 } = this.state;
        const { lanarErrorDispatch, ErrorCampo_contraseñaDispatch, registrarUsuarioDispatch } = this.props;

        if (!nombres || !apellidos || !edad || !telefono || !id_identificacion || !identificacion || !correo || !id_rol || !contraseña1 || !contraseña2) {
            lanarErrorDispatch("Este campo es obligatorio", true);
        } else if (contraseña1 !== contraseña2) {
            ErrorCampo_contraseñaDispatch("Las contraseñas no coinciden", true);
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
            // console.log(usuario)
        }
    }

    limpiarCampos = () => {
        const { lanarErrorDispatch } = this.props;
        this.setState({
            nombres: "",
            apellidos: "",
            edad: "",
            telefono: "",
            id_identificacion: "",
            identificacion: "",
            correo: "",
            id_rol: "",
            contraseña1: "",
            contraseña2: "",
        });
        lanarErrorDispatch("", false);
    }

    handleFormRegistro = evento => {
        const name = evento.target.name;
        const value = evento.target.value;

        this.setState({
            [name]: value
        });
    }

    editarAlertaSuccess = (mensaje, estado) => {
        const { estado_alerta_success } = this.props;

        if (!estado && estado_alerta_success) {
            this.limpiarCampos();
        }
        this.props.handlerAlertaSuccessDispatch(mensaje, estado);
    }

    editarUsuario = evento => {
        evento.preventDefault();
        const { nombres, apellidos, edad, telefono, id_identificacion, correo, id_rol, usuarioEditar } = this.state;
        const { lanarErrorDispatch } = this.props;

        if (!nombres.trim() || !apellidos.trim() || !edad || !telefono || !id_identificacion.trim() || !correo.trim() || !id_rol.trim()) {
            lanarErrorDispatch("Este campo es obligatorio", true);
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

    componentDidMount = () => {

        const { buscarDatosSelectDispatch, datos_select_cargados, match, usuarios, usuariosCargados, agregarUsuariosStateDispatch } = this.props;

        if (!datos_select_cargados) {
            console.log("Buscando datos select")
            buscarDatosSelectDispatch();
        }

        if (match.path === "/dashboards/editar/:identificacion") {//Si se esta editando a un usuario
            const identificacion = match.params.identificacion;
            if (!usuariosCargados) {
                Api.listarUsuarios().then((resultado) => {
                    agregarUsuariosStateDispatch(resultado.usuarios);
                    const usuarioEditar = resultado.usuarios.filter((user) => user.identificacion === parseInt(identificacion))[0];
                    if (usuarioEditar) {
                        this.setState({
                            usuarioEditar, finBusquedaUsuarioEditar: true, nombres: usuarioEditar.nombres, apellidos: usuarioEditar.apellidos, edad: usuarioEditar.edad, telefono: usuarioEditar.telefono, id_identificacion: usuarioEditar.tipo_identificacion,
                            identificacion: usuarioEditar.identificacion, correo: usuarioEditar.correo, id_rol: usuarioEditar.id_rol
                        });
                    } else {
                        this.setState({ usuarioEditar, finBusquedaUsuarioEditar: true });
                    }
                }).catch((error) => {
                    console.log(error)
                    this.setState({ usuarioEditar: null, finBusquedaUsuarioEditar: true });
                });
            } else {
                const usuarioEditar = usuarios.filter((user) => user.identificacion === parseInt(identificacion))[0];
                if (usuarioEditar) {
                    this.setState({
                        usuarioEditar, finBusquedaUsuarioEditar: true, nombres: usuarioEditar.nombres, apellidos: usuarioEditar.apellidos, edad: usuarioEditar.edad, telefono: usuarioEditar.telefono, id_identificacion: usuarioEditar.tipo_identificacion,
                        identificacion: usuarioEditar.identificacion, correo: usuarioEditar.correo, id_rol: usuarioEditar.id_rol
                    });
                } else {
                    this.setState({ usuarioEditar, finBusquedaUsuarioEditar: true });
                }
            }


        }
    }

    render() {

        const { registroMensaje, registroError, tipos_identificacion, tipos_rol, datos_select_cargados, error_cargar_datos_select, error_campo_contraseña, msg_campo_contraseña, registrando_usuario, estado_alerta_error, mensaje_alerta_error, estado_alerta_success, mensaje_alerta_success, handlerAlertaErrorDispatch, match, actualizandoRegistro, estadoAlertaActualizarError, errorActualizarMensaje, mensaje_alerta_success_act, estado_alerta_success_act } = this.props;

        const { nombres, apellidos, edad, telefono, id_identificacion, identificacion, correo, id_rol, contraseña1, contraseña2, usuarioEditar, finBusquedaUsuarioEditar } = this.state;

        const seEstaEditando = match.path === "/dashboards/editar/:identificacion" ? true : false;

        const disabledInput = actualizandoRegistro || registrando_usuario ? true : false;

        if (!datos_select_cargados) {//Si aún no se ha terminado de hacer la consulta a la base de datos
            return <div>Cargando...</div>
        } else if (error_cargar_datos_select) {//Error al intentar cargar los datos
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
                        heading="Registro de usuario"
                        subheading="Formulario para el registro de un usuario."
                        icon="pe-7s-note2 icon-gradient bg-ripe-malin"
                    />

                    {tipos_identificacion.length === 0 || tipos_rol.length === 0 ?
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
                                                                <Input type="text" name="nombres" value={nombres} id="Nombres" onChange={this.handleFormRegistro} placeholder="Nombres" invalid={registroError && !nombres.trim() ? true : false} disabled={disabledInput} />
                                                                <FormFeedback>{registroMensaje}</FormFeedback>
                                                            </FormGroup>
                                                        </Col>
                                                        <Col md={6}>
                                                            <FormGroup>
                                                                <Input type="text" name="apellidos" value={apellidos} id="Apellidos" onChange={this.handleFormRegistro} placeholder="Apellidos" invalid={registroError && !apellidos.trim() ? true : false} disabled={disabledInput} />
                                                                <FormFeedback>{registroMensaje}</FormFeedback>
                                                            </FormGroup>
                                                        </Col>
                                                        <Col md={6}>
                                                            <FormGroup>
                                                                <Input type="number" name="edad" value={edad} id="Edad" onChange={this.handleFormRegistro} placeholder="Edad" invalid={registroError && !edad ? true : false} disabled={disabledInput} />
                                                                <FormFeedback>{registroMensaje}</FormFeedback>
                                                            </FormGroup>
                                                        </Col>
                                                        <Col md={6}>
                                                            <FormGroup>
                                                                <Input type="number" name="telefono" value={telefono} id="Telefono" onChange={this.handleFormRegistro} placeholder="Telefono" invalid={registroError && !telefono ? true : false} disabled={disabledInput} />
                                                                <FormFeedback>{registroMensaje}</FormFeedback>
                                                            </FormGroup>
                                                        </Col>
                                                        <Col md={6}>
                                                            <FormGroup>

                                                                <Input type="select" name="id_identificacion" value={id_identificacion} onChange={this.handleFormRegistro} id="id_identificacion" invalid={registroError && !id_identificacion ? true : false} disabled={disabledInput || seEstaEditando}>

                                                                    <option value={""} >{"Seleccione una opción"}</option>
                                                                    {tipos_identificacion.map((dato) =>
                                                                        <option key={dato._id} value={dato.tipo_identificacion} >{dato.acronimo}</option>
                                                                    )}

                                                                </Input>
                                                                <FormFeedback>{registroMensaje}</FormFeedback>
                                                            </FormGroup>
                                                        </Col>
                                                        <Col md={6}>
                                                            <FormGroup>
                                                                <Input type="number" name="identificacion" value={identificacion} onChange={this.handleFormRegistro} id="identificacion" placeholder="Identificacion" invalid={registroError && !identificacion ? true : false} disabled={disabledInput || seEstaEditando} />
                                                                <FormFeedback>{registroMensaje}</FormFeedback>
                                                            </FormGroup>
                                                        </Col>
                                                        <Col md={6}>
                                                            <FormGroup>
                                                                <Input type="email" name="correo" value={correo} id="correo" onChange={this.handleFormRegistro} placeholder="Correo" autoComplete="usuario" invalid={registroError && !correo.trim() ? true : false} disabled={disabledInput} />
                                                                <FormFeedback>{registroMensaje}</FormFeedback>
                                                            </FormGroup>
                                                        </Col>
                                                        <Col md={6}>
                                                            <FormGroup>

                                                                <Input type="select" name="id_rol" value={id_rol} id="id_rol" onChange={this.handleFormRegistro} placeholder="Rol" invalid={registroError && !id_rol ? true : false} disabled={disabledInput}>

                                                                    <option value={""} >{"Seleccione una opción"}</option>
                                                                    {tipos_rol.map((dato) =>
                                                                        <option key={dato._id} value={dato.id_rol} >{dato.tipo_perfil}</option>
                                                                    )}

                                                                </Input>
                                                                <FormFeedback>{registroMensaje}</FormFeedback>
                                                            </FormGroup>
                                                        </Col>
                                                        {!seEstaEditando &&
                                                            <Col md={6}>
                                                                <FormGroup>
                                                                    <Input type="password" name="contraseña1" value={contraseña1} id="Contraseña" onChange={this.handleFormRegistro} placeholder="Contraseña" autoComplete="new-password" invalid={(registroError && !contraseña1.trim()) || error_campo_contraseña ? true : false} disabled={disabledInput} />
                                                                    <FormFeedback>{error_campo_contraseña ? msg_campo_contraseña : registroMensaje}</FormFeedback>
                                                                </FormGroup>
                                                            </Col>
                                                        }
                                                        {!seEstaEditando &&
                                                            <Col md={6}>
                                                                <FormGroup>
                                                                    <Input type="password" name="contraseña2" value={contraseña2} id="Contraseña2" onChange={this.handleFormRegistro} placeholder="Repita su contraseña" autoComplete="new-password 2" invalid={(registroError && !contraseña2.trim()) || error_campo_contraseña ? true : false} disabled={disabledInput} />
                                                                    <FormFeedback>{error_campo_contraseña ? msg_campo_contraseña : registroMensaje}</FormFeedback>
                                                                </FormGroup>
                                                            </Col>
                                                        }

                                                    </Row>
                                                </div>
                                                <Row>
                                                    {!seEstaEditando &&
                                                        <Col md={6}>
                                                            <div className="modal-footer d-block text-center">
                                                                <Button
                                                                    color="danger"
                                                                    className="btn-wide btn-pill btn-shadow btn-hover-shine"
                                                                    size="lg"
                                                                    onClick={this.limpiarCampos}
                                                                    disabled={disabledInput}>
                                                                    Limpiar
                                                                </Button>
                                                            </div>
                                                        </Col>}
                                                    <Col md={seEstaEditando ? 12 : 6}>
                                                        <div className="modal-footer d-block text-center">
                                                            <LaddaButton
                                                                className="btn-wide btn-pill btn-shadow btn-hover-shine btn btn-primary btn-lg"
                                                                loading={disabledInput}
                                                                onClick={seEstaEditando ? this.editarUsuario : this.crearUsuario}
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
                                                    show={estado_alerta_error || estadoAlertaActualizarError ? true : false}
                                                    text={estado_alerta_error ? mensaje_alerta_error : estadoAlertaActualizarError ? errorActualizarMensaje : ""}
                                                    type="error"
                                                    onConfirm={() => handlerAlertaErrorDispatch("", false)} />

                                                <SweetAlert
                                                    title="Proceso exitoso!"
                                                    confirmButtonColor=""
                                                    show={estado_alerta_success || estado_alerta_success_act ? true : false}
                                                    text={estado_alerta_success ? mensaje_alerta_success : estado_alerta_success_act ? mensaje_alerta_success_act : ""}
                                                    type="success"
                                                    onConfirm={() => this.editarAlertaSuccess("", false)} />

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

const mapStateToProps = state => {
    return {
        registroMensaje: state.RegistroUsuario.registroMensaje,
        registroError: state.RegistroUsuario.registroError,
        tipos_identificacion: state.RegistroUsuario.tipos_identificacion,
        tipos_rol: state.RegistroUsuario.tipos_rol,
        datos_select_cargados: state.RegistroUsuario.datos_select_cargados,
        error_cargar_datos_select: state.RegistroUsuario.error_cargar_datos_select,
        error_campo_contraseña: state.RegistroUsuario.error_campo_contraseña,
        msg_campo_contraseña: state.RegistroUsuario.msg_campo_contraseña,
        registrando_usuario: state.RegistroUsuario.registrando_usuario,
        estado_alerta_error: state.RegistroUsuario.estado_alerta_error,
        mensaje_alerta_error: state.RegistroUsuario.mensaje_alerta_error,
        resultado_registro: state.RegistroUsuario.resultado_registro,
        estado_alerta_success: state.RegistroUsuario.estado_alerta_success,
        mensaje_alerta_success: state.RegistroUsuario.mensaje_alerta_success,
        usuarioEditar: state.EditarUsuario.usuarioEditar,
        usuarios: state.Usuarios.usuarios,
        usuariosCargados: state.Usuarios.usuariosCargados,
        actualizandoRegistro: state.EditarUsuario.actualizandoRegistro,
        estadoAlertaActualizarError: state.EditarUsuario.estadoAlertaActualizarError,
        errorActualizarMensaje: state.EditarUsuario.errorActualizarMensaje,
        estado_alerta_success_act: state.EditarUsuario.estado_alerta_success_act,
        mensaje_alerta_success_act: state.EditarUsuario.mensaje_alerta_success_act,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        lanarErrorDispatch: (mensaje, estado) => dispatch(lanarError(mensaje, estado)),
        ErrorCampo_contraseñaDispatch: (mensaje, estado) => dispatch(ErrorCampo_contraseña(mensaje, estado)),
        handlerAlertaErrorDispatch: (mensaje, estado) => dispatch(handlerAlertaError(mensaje, estado)),
        registrarUsuarioDispatch: (usuario) => dispatch(registrarUsuario(usuario)),
        handlerAlertaSuccessDispatch: (mensaje, estado) => dispatch(handlerAlertaSuccess(mensaje, estado)),
        buscarDatosSelectDispatch: () => dispatch(buscarDatosSelect()),
        buscarUsuariosDispatch: () => dispatch(buscarUsuarios()),
        agregarUsuariosStateDispatch: usuarios => dispatch(agregarUsuariosState(usuarios)),
        actualizarUsuarioDispatch: (identificacion, actualizacion, usuariOriginal) => dispatch(actualizarUsuario(identificacion, actualizacion, usuariOriginal))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(RegisterBoxed));