import React, { Fragment, Component } from 'react';
import { Col, Row, Form, FormGroup, Input, FormFeedback, InputGroupAddon, InputGroup } from 'reactstrap';
import { connect } from 'react-redux';
import LaddaButton, { EXPAND_LEFT } from 'react-ladda';
import Slider from "react-slick";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';

import { iniciarSesion, lanarError } from '../../Actions/Autenticacion';
import { estanErradasCredenciales, mensajeCredencialesErradas, estaValidandoCredenciales } from '../../reducers/Autenticacion';
import logo from '../../assets/Sysnet/icon_sysnet.jpg';

import {
    faCoffee,
    faArrowRight,
    faSignInAlt,
} from '@fortawesome/free-solid-svg-icons';
library.add(
    faCoffee,
    faArrowRight,
    faSignInAlt,
);

class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            correo: "",
            contraseña: ""
        }
    }

    iniciarSesion = evento => {
        evento.preventDefault();

        const { iniciarSesinDispatch, lanarErrorDispatch } = this.props;
        const { correo, contraseña } = this.state;

        //limpiar mensajes de error
        lanarErrorDispatch(null, false);

        if (!correo.trim() || !contraseña.trim()) {
            lanarErrorDispatch("Error. Todos los campos son obligatotios", true);
        } else {
            iniciarSesinDispatch(correo.trim(), contraseña.trim());
        }

    }

    handleForm = evento => {
        const name = evento.target.name;
        const value = evento.target.value;

        this.setState({
            [name]: value
        });
    }

    render() {

        let { credencialesError, credencialesMensaje, cargandoSesion } = this.props;

        return (
            <Fragment>
                <div className="h-100 bg-plum-plate bg-animation" id="FormLogin">
                    <Slider>
                        <div className="d-flex h-100 justify-content-center align-items-center">
                            <Col md="8" className="mx-auto app-login-box">
                                <div className="app-logo-inverse mx-auto mb-3" />
                                <div className="modal-dialog w-100 mx-auto">
                                    <Form>
                                        <div className="modal-content">
                                            <div className="modal-body">
                                                <div className="h5 modal-title text-center" style={{ display: "flex", justifyContent: "center" }} >
                                                    <h4 className="mt-2 mb-5">
                                                        <img className="logo-src" src={logo} alt="Logo" style={{ width: "250px" }} />
                                                    </h4>
                                                </div>
                                                <Row form>
                                                    <Col md={12}>
                                                        <FormGroup>
                                                            <InputGroup>
                                                                <InputGroupAddon addonType="prepend">
                                                                    <span className="input-group-text font-icon-wrapper font-icon-md">
                                                                        <i className="pe-7s-user icon-gradient bg-malibu-beach"> </i>
                                                                    </span>
                                                                    {/* <span class="input-group-text lnr-user"></span> */}
                                                                </InputGroupAddon>
                                                                <Input type="email" name="correo" id="correoLogin" onChange={this.handleForm}
                                                                    placeholder="Usuario" invalid={credencialesError} disabled={cargandoSesion} />
                                                                <FormFeedback>{credencialesMensaje}</FormFeedback>
                                                            </InputGroup>
                                                        </FormGroup>
                                                    </Col>
                                                    <Col md={12}>
                                                        <FormGroup>
                                                            <InputGroup>
                                                                <InputGroupAddon addonType="prepend">
                                                                    <span className="input-group-text font-icon-wrapper font-icon-md">
                                                                        <i className="pe-7s-lock icon-gradient bg-malibu-beach"> </i>
                                                                    </span>
                                                                    {/* <span class="input-group-text lnr-lock"></span> */}
                                                                </InputGroupAddon>
                                                                <Input type="password" name="contraseña" id="contraseñaLogin" onChange={this.handleForm}
                                                                    placeholder="Contraseña" invalid={credencialesError} disabled={cargandoSesion} />
                                                                <FormFeedback>{credencialesMensaje}</FormFeedback>
                                                            </InputGroup>
                                                        </FormGroup>
                                                    </Col>
                                                </Row>

                                                <div style={{ textAlign: "center", marginBottom: "10", marginTop: "10px" }}>
                                                    <LaddaButton className="mb-2 mr-2 btn btn-primary btn-icon"
                                                        loading={cargandoSesion}
                                                        onClick={this.iniciarSesion}
                                                        data-style={EXPAND_LEFT}
                                                        onSubmit={this.iniciarSesion}
                                                    >
                                                        {/* <i className="pe-7s-tools btn-icon-wrapper" /> */}
                                                        {/* <FontAwesomeIcon icon={['fab', 'font-awesome']} size="4x"/> */}

                                                        <div>
                                                            <FontAwesomeIcon icon={faSignInAlt} size="2x" className="icon-login mr-3" />
                                                            <span className="txt-btn-login" id="txt-btn-login" >Iniciar sesión</span>
                                                        </div>
                                                    </LaddaButton>
                                                </div>
                                            </div>
                                        </div>
                                    </Form>
                                </div>
                                <div className="text-center mt-3 Copyright">
                                    Copyright &copy; Sysnet 2020
                            </div>
                            </Col>
                        </div>
                    </Slider>
                </div>
            </Fragment>
        )
    }

};

const mapStateToProps = ({ Autenticacion }) => ({
    credencialesError: estanErradasCredenciales(Autenticacion),
    credencialesMensaje: mensajeCredencialesErradas(Autenticacion),
    cargandoSesion: estaValidandoCredenciales(Autenticacion),
});

const mapDispatchToProps = dispatch => ({
    iniciarSesinDispatch: (correo, contraseña) => dispatch(iniciarSesion(correo, contraseña)),
    lanarErrorDispatch: (mensaje, estado) => dispatch(lanarError(mensaje, estado))
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
