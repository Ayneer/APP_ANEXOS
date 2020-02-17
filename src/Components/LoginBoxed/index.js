import React, { Fragment, Component } from 'react';
import { Col, Row, Form, FormGroup, Input, FormFeedback } from 'reactstrap';
import { connect } from 'react-redux';
import LaddaButton, { EXPAND_LEFT } from 'react-ladda';
import { iniciarSesion, lanarError } from '../../Actions/Autenticacion';

class LoginBoxed extends Component {

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

        if (!correo || !contraseña) {
            lanarErrorDispatch("Error. Todos los campos son obligatotios", true);
        } else {
            iniciarSesinDispatch(correo, contraseña);
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
                <div className="h-100 bg-plum-plate bg-animation">
                    <div className="d-flex h-100 justify-content-center align-items-center">
                        <Col md="8" className="mx-auto app-login-box">
                            <div className="app-logo-inverse mx-auto mb-3" />
                            <div className="modal-dialog w-100 mx-auto">
                                <Form>
                                    <div className="modal-content">
                                        <div className="modal-body">
                                            <div className="h5 modal-title text-center">
                                                <h4 className="mt-2">
                                                    <div>Inicio de sesión</div>
                                                    <span>Por favor digita tus credenciales</span>
                                                </h4>
                                            </div>
                                            <Row form>
                                                <Col md={12}>
                                                    <FormGroup>
                                                        <Input type="email" name="correo" id="correoLogin" onChange={this.handleForm}
                                                            placeholder="tu_correo@dominio.com" invalid={credencialesError} disabled={cargandoSesion} />
                                                        <FormFeedback>{credencialesMensaje}</FormFeedback>
                                                    </FormGroup>
                                                </Col>
                                                <Col md={12}>
                                                    <FormGroup>
                                                        <Input type="password" name="contraseña" id="contraseñaLogin" onChange={this.handleForm}
                                                            placeholder="Aquí tu contraseña" invalid={credencialesError} disabled={cargandoSesion} />
                                                        <FormFeedback>{credencialesMensaje}</FormFeedback>
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                            <div className="divider" />
                                            {!cargandoSesion &&
                                                <h6 className="mb-0">
                                                    Sin cuenta?{' '}
                                                    <a href="!#" className="text-primary">Registrate ahora</a>
                                                </h6>
                                            }
                                        </div>
                                        <div className="modal-footer clearfix">
                                            {!cargandoSesion &&
                                                <div className="float-left">
                                                    <a href="!#" className="btn-lg btn btn-link"> Recuperar contraseña </a>
                                                </div>
                                            }
                                            <div className={"float-right"}>
                                                <LaddaButton className="mb-2 mr-2 btn btn-primary"
                                                    loading={cargandoSesion}
                                                    onClick={this.iniciarSesion}
                                                    data-style={EXPAND_LEFT}
                                                    onSubmit={this.iniciarSesion}
                                                >
                                                    Iniciar sesión en App
                                                </LaddaButton>
                                            </div>
                                        </div>
                                    </div>
                                </Form>
                            </div>
                            <div className="text-center text-white opacity-8 mt-3">
                                Copyright &copy; Sysnet 2020
                            </div>
                        </Col>
                    </div>
                </div>
            </Fragment>
        )
    }

};

const mapStateToProps = state => ({
    credencialesError: state.Autenticacion.credencialesError,
    credencialesMensaje: state.Autenticacion.credencialesMensaje,
    cargandoSesion: state.Autenticacion.cargandoSesion,
});

const mapDispatchToProps = dispatch => ({
    iniciarSesinDispatch: (correo, contraseña) => dispatch(iniciarSesion(correo, contraseña)),
    lanarErrorDispatch: (mensaje, estado) => dispatch(lanarError(mensaje, estado))
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginBoxed);
