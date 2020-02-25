import React from 'react';
import { Col, Row, Button, Form, FormGroup, Input, FormFeedback, Label } from 'reactstrap';
import LaddaButton, { EXPAND_LEFT } from 'react-ladda';
import SweetAlert from 'sweetalert-react';

const FormularioRegistroEPS = ({
    iconModal,
    seEstaEditando,
    disabledInput,
    registroMensaje,
    _handleFormRegistro,
    registroError,
    errorCampoContraseña,
    mensajeCampoContraseña,
    estadoAlertaError,
    estadoAlertaSuccess,
    estadoAlertaActualizarError,
    estado_alerta_success_act,
    mensaje_alerta_success_act,
    mensajeAlertaError,
    mensajeAlertaSuccess,
    errorActualizarMensaje,
    handlerAlertaErrorDispatch,
    _editarAlertaSuccess,
    _goListaUsuarios,
    _limpiarCampos,
    _editarUsuario,
    _crearUsuario,

    nombreEmpresa,
    nitEmpresa,
    nombres,
    apellidos,
    edad,
    telefono,
    id_identificacion,
    identificacion,
    tiposIdentificacion,
    correo,
    id_rol,
    tiposRol,
    contraseña1,
    contraseña2,
}) => {

    return (
        <Form>
            <div className="modal-body">
                <h5 className="modal-title">
                    <div>
                        <i className={`header-icon ${iconModal} icon-gradient bg-plum-plate`} /> {seEstaEditando ? "Editar EPS" : "Nueva EPS"}
                    </div>
                    <div className="mt-2">
                        <span>Los campos marcados con <span className="text-danger">*</span> son obligatorios</span>
                    </div>
                </h5>
                <Row className="divider" />

                <Row form>

                    {/* Datos de la empresa */}
                    <Col md={12}>
                        <h5 className="card-title">Datos de la empresa</h5>
                    </Col>

                    <Col md={6}>
                        <FormGroup>
                            <Label htmlFor="nombreEmpresa" className="label-registro labelStyle_1">Nombre: <span style={{ color: "red" }}>*</span></Label>
                            <Input className="form-control-sm" type="text" value={nombreEmpresa} name="nombreEmpresa" id="nombreEmpresa" onChange={_handleFormRegistro} placeholder="Nombre de la empresa" autoComplete="empresa" invalid={registroError && !nombreEmpresa.trim() ? true : false} disabled={disabledInput} />
                            <FormFeedback>{registroMensaje}</FormFeedback>
                        </FormGroup>
                    </Col>
                    <Col md={6}>
                        <FormGroup>
                            <Label htmlFor="nitEmpresa" className="label-registro labelStyle_1">Nit: <span style={{ color: "red" }}>*</span></Label>
                            <Input className="form-control-sm" value={nitEmpresa} type="number" name="nitEmpresa" id="nitEmpresa" onChange={_handleFormRegistro} placeholder="Nit de la empresa" autoComplete="nit empresa" invalid={registroError && !nitEmpresa.trim() ? true : false} disabled={disabledInput} />
                            <FormFeedback>{registroMensaje}</FormFeedback>
                        </FormGroup>
                    </Col>

                    {/* Datos del usuario */}
                    <Col md={12}>
                        <h5 className="card-title">Datos del usuario</h5>
                    </Col>

                    <Col md={6}>
                        <FormGroup>
                            <Label htmlFor="Nombres" className="label-registro labelStyle_1">Nombres: <span style={{ color: "red" }}>*</span></Label>
                            <Input className="form-control-sm" type="text" name="nombres" value={nombres} id="Nombres" onChange={_handleFormRegistro} placeholder="Nombres" invalid={registroError && !nombres.trim() ? true : false} disabled={disabledInput} />
                            <FormFeedback>{registroMensaje}</FormFeedback>
                        </FormGroup>
                    </Col>
                    <Col md={6}>
                        <FormGroup>
                            <Label htmlFor="Apellidos" className="label-registro labelStyle_1">Apellidos: <span style={{ color: "red" }}>*</span></Label>
                            <Input className="form-control-sm" type="text" name="apellidos" value={apellidos} id="Apellidos" onChange={_handleFormRegistro} placeholder="Apellidos" invalid={registroError && !apellidos.trim() ? true : false} disabled={disabledInput} />
                            <FormFeedback>{registroMensaje}</FormFeedback>
                        </FormGroup>
                    </Col>
                    <Col md={6}>
                        <FormGroup>
                            <Label htmlFor="Edad" className="label-registro labelStyle_1">Edad: <span style={{ color: "red" }}>*</span></Label>
                            <Input className="form-control-sm" type="number" name="edad" value={edad} id="Edad" onChange={_handleFormRegistro} placeholder="Edad" invalid={registroError && !edad ? true : false} disabled={disabledInput} />
                            <FormFeedback>{registroMensaje}</FormFeedback>
                        </FormGroup>
                    </Col>
                    <Col md={6}>
                        <FormGroup>
                            <Label htmlFor="Telefono" className="label-registro labelStyle_1">Teléfono: <span style={{ color: "red" }}>*</span></Label>
                            <Input className="form-control-sm" type="number" name="telefono" value={telefono} id="Telefono" onChange={_handleFormRegistro} placeholder="Telefono" invalid={registroError && !telefono ? true : false} disabled={disabledInput} />
                            <FormFeedback>{registroMensaje}</FormFeedback>
                        </FormGroup>
                    </Col>
                    <Col md={6}>
                        <FormGroup>
                            <Label htmlFor="id_identificacion" className="label-registro labelStyle_1">Tipo de identificación: <span style={{ color: "red" }}>*</span></Label>
                            <Input className="form-control-sm" type="select" name="id_identificacion" value={id_identificacion} onChange={_handleFormRegistro} id="id_identificacion" invalid={registroError && !id_identificacion ? true : false} disabled={disabledInput}>

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
                            <Label htmlFor="identificacion" className="label-registro labelStyle_1">Número: <span style={{ color: "red" }}>*</span></Label>
                            <Input className="form-control-sm" type="number" name="identificacion" value={identificacion} onChange={_handleFormRegistro} id="identificacion" placeholder="Identificacion" invalid={registroError && !identificacion ? true : false} disabled={disabledInput} />
                            <FormFeedback>{registroMensaje}</FormFeedback>
                        </FormGroup>
                    </Col>

                    {/* Datos de la sesión */}
                    <Col md={12}>
                        <h5 className="card-title">Datos de la sesión</h5>
                    </Col>
                    <Col md={6}>
                        <FormGroup>
                            <Label htmlFor="correo" className="label-registro labelStyle_1">Correo: <span style={{ color: "red" }}>*</span></Label>
                            <Input className="form-control-sm" type="email" name="correo" value={correo} id="correo" onChange={_handleFormRegistro} placeholder="Correo" autoComplete="usuario" invalid={registroError && !correo.trim() ? true : false} disabled={disabledInput} />
                            <FormFeedback>{registroMensaje}</FormFeedback>
                        </FormGroup>
                    </Col>
                    <Col md={6}>
                        <FormGroup>
                            <Label htmlFor="id_rol" className="label-registro labelStyle_1">Rol: <span style={{ color: "red" }}>*</span></Label>
                            <Input className="form-control-sm" type="select" name="id_rol" value={id_rol} id="id_rol" onChange={_handleFormRegistro} placeholder="Rol" invalid={registroError && !id_rol ? true : false} disabled={disabledInput}>

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
                                <Label htmlFor="Contraseña" className="label-registro labelStyle_1">Contraseña: <span style={{ color: "red" }}>*</span></Label>
                                <Input className="form-control-sm" type="password" name="contraseña1" value={contraseña1} id="Contraseña" onChange={_handleFormRegistro} placeholder="Contraseña" autoComplete="new-password" invalid={(registroError && !contraseña1.trim()) || errorCampoContraseña ? true : false} disabled={disabledInput} />
                                <FormFeedback>{errorCampoContraseña ? mensajeCampoContraseña : registroMensaje}</FormFeedback>
                            </FormGroup>
                        </Col>
                    }
                    {!seEstaEditando &&
                        <Col md={6}>
                            <FormGroup>
                                <Label htmlFor="Contraseña2" className="label-registro labelStyle_1">Repita su contraseña: <span style={{ color: "red" }}>*</span></Label>
                                <Input className="form-control-sm" type="password" name="contraseña2" value={contraseña2} id="Contraseña2" onChange={_handleFormRegistro} placeholder="Repita su contraseña" autoComplete="new-password 2" invalid={(registroError && !contraseña2.trim()) || errorCampoContraseña ? true : false} disabled={disabledInput} />
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
                            onClick={seEstaEditando ? _goListaUsuarios : _limpiarCampos}
                            disabled={disabledInput}>
                            {seEstaEditando ? "Volver" : "Limpiar"}
                        </Button>
                    </div>
                </Col>
                <Col md={6}>
                    <div className="modal-footer d-block text-center">
                        <LaddaButton
                            className="btn-wide btn-pill btn-shadow btn-hover-shine btn btn-primary"
                            loading={disabledInput}
                            onClick={seEstaEditando ? _editarUsuario : _crearUsuario}
                            data-style={EXPAND_LEFT}
                        >
                            {seEstaEditando ? "Guardar" : "Crear"}
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
                onConfirm={() => _editarAlertaSuccess("", false)} />

        </Form>
    )

}

export default FormularioRegistroEPS;