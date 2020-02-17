import React, { Fragment, Component } from 'react';
import { Col, Row, Button, Form, FormGroup, Input, FormFeedback } from 'reactstrap';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import SweetAlert from 'sweetalert-react';
import { connect } from 'react-redux';
import LaddaButton, { EXPAND_LEFT } from 'react-ladda';

import { lanarError, buscarDatosSelect, ErrorCampo_contraseña, handlerAlertaError, registrarUsuario, handlerAlertaSuccess } from '../../Actions/Registro';

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
            contraseña2: ""
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
            contraseña2: ""
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
        if(!estado){
            this.limpiarCampos();
        }
        this.props.handlerAlertaSuccessDispatch(mensaje, estado);
    }

    componentDidMount = () => {
        const { buscarDatosSelectDispatch } = this.props;
        buscarDatosSelectDispatch();
    }

    render() {

        const { registroMensaje, registroError, tipos_identificacion, tipos_rol, datos_select_cargados, error_cargar_datos_select, error_campo_contraseña, msg_campo_contraseña, registrando_usuario, estado_alerta_error, mensaje_alerta_error, estado_alerta_success, mensaje_alerta_success, handlerAlertaErrorDispatch } = this.props;
        const {
            nombres,
            apellidos,
            edad,
            telefono,
            id_identificacion,
            identificacion,
            correo,
            id_rol,
            contraseña1,
            contraseña2 } = this.state;

        if (!datos_select_cargados) {//Si aún no se ha terminado de hacer la consulta a la base de datos
            return <div>Cargando...</div>
        } else if (error_cargar_datos_select) {//Error al intentar cargar los datos
            return <div>Error al intentar cargar los datos de select</div>
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

                    {tipos_identificacion.length === 0 || tipos_rol.length === 0 ?
                        <div>Error, en este momento no se puede realizar registros</div>
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
                                                        <div>Nuevo usuario</div>
                                                        <div className="mt-2">
                                                            <span>Esto tomará <span className="text-success">pocos segundos</span> para crear la cuenta</span>
                                                        </div>
                                                    </h5>
                                                    <Row className="divider" />

                                                    <Row form>
                                                        <Col md={6}>
                                                            <FormGroup>
                                                                <Input type="text" name="nombres" value={nombres} id="Nombres" onChange={this.handleFormRegistro} placeholder="Nombres" invalid={registroError && !nombres ? true : false} disabled={registrando_usuario} />
                                                                <FormFeedback>{registroMensaje}</FormFeedback>
                                                            </FormGroup>
                                                        </Col>
                                                        <Col md={6}>
                                                            <FormGroup>
                                                                <Input type="text" name="apellidos" value={apellidos} id="Apellidos" onChange={this.handleFormRegistro} placeholder="Apellidos" invalid={registroError && !apellidos ? true : false} disabled={registrando_usuario} />
                                                                <FormFeedback>{registroMensaje}</FormFeedback>
                                                            </FormGroup>
                                                        </Col>
                                                        <Col md={6}>
                                                            <FormGroup>
                                                                <Input type="number" name="edad" value={edad} id="Edad" onChange={this.handleFormRegistro} placeholder="Edad" invalid={registroError && !edad ? true : false} disabled={registrando_usuario} />
                                                                <FormFeedback>{registroMensaje}</FormFeedback>
                                                            </FormGroup>
                                                        </Col>
                                                        <Col md={6}>
                                                            <FormGroup>
                                                                <Input type="number" name="telefono" value={telefono} id="Telefono" onChange={this.handleFormRegistro} placeholder="Telefono" invalid={registroError && !telefono ? true : false} disabled={registrando_usuario} />
                                                                <FormFeedback>{registroMensaje}</FormFeedback>
                                                            </FormGroup>
                                                        </Col>
                                                        <Col md={6}>
                                                            <FormGroup>

                                                                <Input type="select" name="id_identificacion" value={id_identificacion} onChange={this.handleFormRegistro} id="id_identificacion" invalid={registroError && !id_identificacion ? true : false} disabled={registrando_usuario}>

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
                                                                <Input type="number" name="identificacion" value={identificacion} onChange={this.handleFormRegistro} id="identificacion" placeholder="Identificacion" invalid={registroError && !identificacion ? true : false} disabled={registrando_usuario} />
                                                                <FormFeedback>{registroMensaje}</FormFeedback>
                                                            </FormGroup>
                                                        </Col>
                                                        <Col md={6}>
                                                            <FormGroup>
                                                                <Input type="email" name="correo" value={correo} id="correo" onChange={this.handleFormRegistro} placeholder="Correo" autoComplete="usuario" invalid={registroError && !correo ? true : false} disabled={registrando_usuario} />
                                                                <FormFeedback>{registroMensaje}</FormFeedback>
                                                            </FormGroup>
                                                        </Col>
                                                        <Col md={6}>
                                                            <FormGroup>

                                                                <Input type="select" name="id_rol" value={id_rol} id="id_rol" onChange={this.handleFormRegistro} placeholder="Rol" invalid={registroError && !id_rol ? true : false} disabled={registrando_usuario}>

                                                                    <option value={""} >{"Seleccione una opción"}</option>
                                                                    {tipos_rol.map((dato) =>
                                                                        <option key={dato._id} value={dato.id_rol} >{dato.tipo_perfil}</option>
                                                                    )}

                                                                </Input>
                                                                <FormFeedback>{registroMensaje}</FormFeedback>
                                                            </FormGroup>
                                                        </Col>
                                                        <Col md={6}>
                                                            <FormGroup>
                                                                <Input type="password" name="contraseña1" value={contraseña1} id="Contraseña" onChange={this.handleFormRegistro} placeholder="Contraseña" autoComplete="new-password"  invalid={(registroError && !contraseña1) || error_campo_contraseña ? true : false} disabled={registrando_usuario} />
                                                                <FormFeedback>{error_campo_contraseña ? msg_campo_contraseña : registroMensaje}</FormFeedback>
                                                            </FormGroup>
                                                        </Col>
                                                        <Col md={6}>
                                                            <FormGroup>
                                                                <Input type="password" name="contraseña2" value={contraseña2} id="Contraseña2" onChange={this.handleFormRegistro} placeholder="Repita su contraseña" autoComplete="new-password 2" invalid={(registroError && !contraseña2) || error_campo_contraseña ? true : false} disabled={registrando_usuario} />
                                                                <FormFeedback>{error_campo_contraseña ? msg_campo_contraseña : registroMensaje}</FormFeedback>
                                                            </FormGroup>
                                                        </Col>
                                                    </Row>
                                                </div>
                                                <Row>
                                                    <Col md={6}>
                                                        <div className="modal-footer d-block text-center">
                                                            <Button
                                                                color="danger"
                                                                className="btn-wide btn-pill btn-shadow btn-hover-shine"
                                                                size="lg"
                                                                onClick={this.limpiarCampos}
                                                                disabled={registrando_usuario}>
                                                                Limpiar
                                                            </Button>
                                                        </div>
                                                    </Col>
                                                    <Col md={6}>
                                                        <div className="modal-footer d-block text-center">
                                                            <LaddaButton 
                                                                className="btn-wide btn-pill btn-shadow btn-hover-shine btn btn-primary btn-lg"
                                                                loading={registrando_usuario}
                                                                onClick={this.crearUsuario}
                                                                data-style={EXPAND_LEFT}
                                                            >
                                                                Crear cuenta
                                                            </LaddaButton>
                                                        </div>
                                                    </Col>
                                                </Row>

                                                <SweetAlert
                                                    title="Oops, ah ocurrido un error!"
                                                    confirmButtonColor=""
                                                    show={estado_alerta_error}
                                                    text={mensaje_alerta_error}
                                                    type="error"
                                                    onConfirm={() => handlerAlertaErrorDispatch("", false)} />
                                                
                                                <SweetAlert
                                                    title="Proceso exitoso!"
                                                    confirmButtonColor=""
                                                    show={estado_alerta_success}
                                                    text={mensaje_alerta_success}
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
        mensaje_alerta_success: state.RegistroUsuario.mensaje_alerta_success
    }
}

const mapDispatchToProps = dispatch => {
    return {
        lanarErrorDispatch: (mensaje, estado) => dispatch(lanarError(mensaje, estado)),
        buscarDatosSelectDispatch: () => dispatch(buscarDatosSelect()),
        ErrorCampo_contraseñaDispatch: (mensaje, estado) => dispatch(ErrorCampo_contraseña(mensaje, estado)),
        handlerAlertaErrorDispatch: (mensaje, estado) => dispatch(handlerAlertaError(mensaje, estado)),
        registrarUsuarioDispatch: (usuario) => dispatch(registrarUsuario(usuario)),
        handlerAlertaSuccessDispatch: (mensaje, estado) => dispatch(handlerAlertaSuccess(mensaje, estado)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterBoxed);