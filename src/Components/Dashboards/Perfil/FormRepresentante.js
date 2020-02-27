import React from 'react';
import { Col, Row, Form, FormGroup, Input, FormFeedback, Label } from 'reactstrap';
// import LaddaButton, { EXPAND_LEFT } from 'react-ladda';
// import SweetAlert from 'sweetalert-react';

const FormularioRepresentante = ({
    disabledInput,
    registroMensaje,
    _handleFormRegistro,
    registroError,

    TipoIdentificacion,
    NumeroIdentificacion,
    Nombres,
    Apellidos,
    TelefonoRepresentante,
    CelularRepresentante,
    CorreoRepresentante,
}) => {

    return (
        <Form>
            <div className="modal-body">
                <h5 className="modal-title">
                    <div>
                        Datos del representante legal
                    </div>
                </h5>
                <Row className="divider" />

                <Row form>

                    <Col md={6}>
                        <FormGroup>
                            <Label htmlFor="TipoIdentificacion" className="label-registro labelStyle_1">Tipo de identificación: <span style={{ color: "red" }}>*</span></Label>
                            <Input className="form-control-sm" type="text" value={TipoIdentificacion} name="TipoIdentificacion" id="TipoIdentificacion" onChange={_handleFormRegistro} placeholder="Tipo de identificación" autoComplete="TipoIdentificacion" invalid={registroError && !TipoIdentificacion.trim() ? true : false} disabled={disabledInput} />
                            <FormFeedback>{registroMensaje}</FormFeedback>
                        </FormGroup>
                    </Col>
                    <Col md={6}>
                        <FormGroup>
                            <Label htmlFor="NumeroIdentificacion" className="label-registro labelStyle_1">Número de identificación: <span style={{ color: "red" }}>*</span></Label>
                            <Input className="form-control-sm" value={NumeroIdentificacion} type="text" name="NumeroIdentificacion" id="NumeroIdentificacion" onChange={_handleFormRegistro} placeholder="Número de identificación" autoComplete="NumeroIdentificacion" invalid={registroError && !NumeroIdentificacion.trim() ? true : false} disabled={disabledInput} />
                            <FormFeedback>{registroMensaje}</FormFeedback>
                        </FormGroup>
                    </Col>

                    <Col md={6}>
                        <FormGroup>
                            <Label htmlFor="NombresRepresentante" className="label-registro labelStyle_1">Nombres: <span style={{ color: "red" }}>*</span></Label>
                            <Input className="form-control-sm" type="text" name="Nombres" value={Nombres} id="NombresRepresentante" onChange={_handleFormRegistro} placeholder="Nombres" invalid={registroError && !Nombres.trim() ? true : false} disabled={disabledInput} />
                            <FormFeedback>{registroMensaje}</FormFeedback>
                        </FormGroup>
                    </Col>
                    <Col md={6}>
                        <FormGroup>
                            <Label htmlFor="ApellidosRepresentante" className="label-registro labelStyle_1">Apellidos: <span style={{ color: "red" }}>*</span></Label>
                            <Input className="form-control-sm" type="text" name="Apellidos" value={Apellidos} id="ApellidosRepresentante" onChange={_handleFormRegistro} placeholder="Apellidos" invalid={registroError && !Apellidos.trim() ? true : false} disabled={disabledInput} />
                            <FormFeedback>{registroMensaje}</FormFeedback>
                        </FormGroup>
                    </Col>

                    <Col md={6}>
                        <FormGroup>
                            <Label htmlFor="TelefonoRepresentante" className="label-registro labelStyle_1">Teléfono: <span style={{ color: "red" }}>*</span></Label>
                            <Input className="form-control-sm" type="text" name="TelefonoRepresentante" value={TelefonoRepresentante} id="TelefonoRepresentante" onChange={_handleFormRegistro} placeholder="Teléfono" invalid={registroError && !TelefonoRepresentante ? true : false} disabled={disabledInput} />
                            <FormFeedback>{registroMensaje}</FormFeedback>
                        </FormGroup>
                    </Col>
                    <Col md={6}>
                        <FormGroup>
                            <Label htmlFor="CelularRepresentante" className="label-registro labelStyle_1">Celular: <span style={{ color: "red" }}>*</span></Label>
                            <Input className="form-control-sm" type="text" name="CelularRepresentante" value={CelularRepresentante} id="CelularRepresentante" onChange={_handleFormRegistro} placeholder="Celular" invalid={registroError && !CelularRepresentante ? true : false} disabled={disabledInput} />
                            <FormFeedback>{registroMensaje}</FormFeedback>
                        </FormGroup>
                    </Col>

                    <Col md={12}>
                        <FormGroup>
                            <Label htmlFor="CorreoRepresentante" className="label-registro labelStyle_1">Correo: <span style={{ color: "red" }}>*</span></Label>
                            <Input className="form-control-sm" type="text" name="CorreoRepresentante" value={CorreoRepresentante} id="CorreoRepresentante" onChange={_handleFormRegistro} placeholder="Correo" autoComplete="Correo" invalid={registroError && !CorreoRepresentante.trim() ? true : false} disabled={disabledInput} />
                            <FormFeedback>{registroMensaje}</FormFeedback>
                        </FormGroup>
                    </Col>

                </Row>
            </div>
        </Form>
    )

}

export default FormularioRepresentante;