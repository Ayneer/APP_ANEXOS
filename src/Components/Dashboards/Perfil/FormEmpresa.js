import React from 'react';
import { Col, Row, Form, FormGroup, Input, FormFeedback, Label } from 'reactstrap';
// import LaddaButton, { EXPAND_LEFT } from 'react-ladda';
// import SweetAlert from 'sweetalert-react';

const FormularioEmpresa = ({
    disabledInput,
    registroMensaje,
    _handleFormRegistro,
    registroError,

    RazonSocial,
    Nit,
    NumeroLicencia,
    CodigoHabilitacion,
    CodigoSGSSS,
    PaginaWeb,
    Departamento,
    Ciudad,
    Direccion,
    Telefono,
    Celular,
    Correo,
}) => {

    return (
        <Form>
            <div className="modal-body">
                <h5 className="modal-title">
                    <div>
                        Datos empresa
                    </div>
                </h5>
                <Row className="divider" />

                <Row form>

                    <Col md={6}>
                        <FormGroup>
                            <Label htmlFor="RazonSocial" className="label-registro labelStyle_1">Razón social: <span style={{ color: "red" }}>*</span></Label>
                            <Input className="form-control-sm" type="text" value={RazonSocial} name="RazonSocial" id="RazonSocial" onChange={_handleFormRegistro} placeholder="Razón social de la empresa" autoComplete="RazonSocial" invalid={registroError && !RazonSocial.trim() ? true : false} disabled={disabledInput} />
                            <FormFeedback>{registroMensaje}</FormFeedback>
                        </FormGroup>
                    </Col>
                    <Col md={6}>
                        <FormGroup>
                            <Label htmlFor="Nit" className="label-registro labelStyle_1">Nit: <span style={{ color: "red" }}>*</span></Label>
                            <Input className="form-control-sm" value={Nit} type="text" name="Nit" id="Nit" onChange={_handleFormRegistro} placeholder="Nit de la empresa" autoComplete="Nit" invalid={registroError && !Nit.trim() ? true : false} disabled={disabledInput} />
                            <FormFeedback>{registroMensaje}</FormFeedback>
                        </FormGroup>
                    </Col>

                    <Col md={6}>
                        <FormGroup>
                            <Label htmlFor="NumeroLicencia" className="label-registro labelStyle_1">Licencia N°: <span style={{ color: "red" }}>*</span></Label>
                            <Input className="form-control-sm" type="text" name="NumeroLicencia" value={NumeroLicencia} id="NumeroLicencia" onChange={_handleFormRegistro} placeholder="NumeroLicencia" invalid={registroError && !NumeroLicencia.trim() ? true : false} disabled={disabledInput} />
                            <FormFeedback>{registroMensaje}</FormFeedback>
                        </FormGroup>
                    </Col>
                    <Col md={6}>
                        <FormGroup>
                            <Label htmlFor="CodigoHabilitacion" className="label-registro labelStyle_1">Código de habilitación: <span style={{ color: "red" }}>*</span></Label>
                            <Input className="form-control-sm" type="text" name="CodigoHabilitacion" value={CodigoHabilitacion} id="CodigoHabilitacion" onChange={_handleFormRegistro} placeholder="Código de habilitación" invalid={registroError && !CodigoHabilitacion.trim() ? true : false} disabled={disabledInput} />
                            <FormFeedback>{registroMensaje}</FormFeedback>
                        </FormGroup>
                    </Col>

                    <Col md={6}>
                        <FormGroup>
                            <Label htmlFor="CodigoSGSSS" className="label-registro labelStyle_1">Código SGSSS: <span style={{ color: "red" }}>*</span></Label>
                            <Input className="form-control-sm" type="text" name="CodigoSGSSS" value={CodigoSGSSS} id="CodigoSGSSS" onChange={_handleFormRegistro} placeholder="Código SGSSS" invalid={registroError && !CodigoSGSSS ? true : false} disabled={disabledInput} />
                            <FormFeedback>{registroMensaje}</FormFeedback>
                        </FormGroup>
                    </Col>
                    <Col md={6}>
                        <FormGroup>
                            <Label htmlFor="PaginaWeb" className="label-registro labelStyle_1">Página Web: <span style={{ color: "red" }}>*</span></Label>
                            <Input className="form-control-sm" type="text" name="PaginaWeb" value={PaginaWeb} id="PaginaWeb" onChange={_handleFormRegistro} placeholder="Página Web" invalid={registroError && !PaginaWeb ? true : false} disabled={disabledInput} />
                            <FormFeedback>{registroMensaje}</FormFeedback>
                        </FormGroup>
                    </Col>

                    <Col md={6}>
                        <FormGroup>
                            <Label htmlFor="Departamento" className="label-registro labelStyle_1">Departamento: <span style={{ color: "red" }}>*</span></Label>
                            <Input className="form-control-sm" type="select" name="Departamento" value={Departamento} onChange={_handleFormRegistro} id="Departamento" invalid={registroError && !Departamento ? true : false} disabled={disabledInput}>

                                <option value={""} >{"Seleccione una opción"}</option>
                                {/* {tiposIdentificacion.map((dato) =>
                                    <option key={dato._id} value={dato.tipo_identificacion} >{dato.acronimo}</option>
                                )} */}

                            </Input>
                            <FormFeedback>{registroMensaje}</FormFeedback>
                        </FormGroup>
                    </Col>
                    <Col md={6}>
                        <FormGroup>
                            <Label htmlFor="Ciudad" className="label-registro labelStyle_1">Ciudad: <span style={{ color: "red" }}>*</span></Label>
                            <Input className="form-control-sm" type="select" name="Ciudad" value={Ciudad} onChange={_handleFormRegistro} id="Ciudad" invalid={registroError && !Ciudad ? true : false} disabled={disabledInput}>

                                <option value={""} >{"Seleccione una opción"}</option>
                                {/* {tiposIdentificacion.map((dato) =>
                                    <option key={dato._id} value={dato.tipo_identificacion} >{dato.acronimo}</option>
                                )} */}

                            </Input>
                            <FormFeedback>{registroMensaje}</FormFeedback>
                        </FormGroup>
                    </Col>

                    <Col md={12}>
                        <FormGroup>
                            <Label htmlFor="Direccion" className="label-registro labelStyle_1">Dirección: <span style={{ color: "red" }}>*</span></Label>
                            <Input className="form-control-sm" type="text" name="Direccion" value={Direccion} id="Direccion" onChange={_handleFormRegistro} placeholder="Dirección" autoComplete="Direccion" invalid={registroError && !Direccion.trim() ? true : false} disabled={disabledInput} />
                            <FormFeedback>{registroMensaje}</FormFeedback>
                        </FormGroup>
                    </Col>

                    <Col md={6}>
                        <FormGroup>
                            <Label htmlFor="Telefono" className="label-registro labelStyle_1">Telefono: <span style={{ color: "red" }}>*</span></Label>
                            <Input className="form-control-sm" type="text" name="Telefono" value={Telefono} id="Telefono" onChange={_handleFormRegistro} placeholder="Telefono" autoComplete="Telefono" invalid={registroError && !Telefono.trim() ? true : false} disabled={disabledInput} />
                            <FormFeedback>{registroMensaje}</FormFeedback>
                        </FormGroup>
                    </Col>
                    <Col md={6}>
                        <FormGroup>
                            <Label htmlFor="Celular" className="label-registro labelStyle_1">Celular: <span style={{ color: "red" }}>*</span></Label>
                            <Input className="form-control-sm" type="text" name="Celular" value={Celular} id="Celular" onChange={_handleFormRegistro} placeholder="Celular" autoComplete="Celular" invalid={registroError && !Celular.trim() ? true : false} disabled={disabledInput} />
                            <FormFeedback>{registroMensaje}</FormFeedback>
                        </FormGroup>
                    </Col>

                    <Col md={12}>
                        <FormGroup>
                            <Label htmlFor="Correo" className="label-registro labelStyle_1">Correo: <span style={{ color: "red" }}>*</span></Label>
                            <Input className="form-control-sm" type="text" name="Correo" value={Correo} id="Correo" onChange={_handleFormRegistro} placeholder="Correo" autoComplete="Correo" invalid={registroError && !Correo.trim() ? true : false} disabled={disabledInput} />
                            <FormFeedback>{registroMensaje}</FormFeedback>
                        </FormGroup>
                    </Col>

                </Row>
            </div>
        </Form>
    )

}

export default FormularioEmpresa;