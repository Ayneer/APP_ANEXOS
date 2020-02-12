import React, { Fragment, Component } from 'react';
import { Col, Row, Button, Form, FormGroup, Input } from 'reactstrap';
import { connect } from 'react-redux';
import { iniciarSesion } from '../../Actions/Autenticacion';

class LoginBoxed extends Component {

    constructor(props) {
        super(props);

        this.state = {
            correo: "",
            contraseña: ""
        }
    }

    iniciarSesion = () => {
        let {iniciarSesinDispatch } = this.props;
        let {correo,  contraseña} = this.state;
        iniciarSesinDispatch(correo, contraseña);
    }

    render() {
        return (
            <Fragment>
                <div className="h-100 bg-plum-plate bg-animation">
                    <div className="d-flex h-100 justify-content-center align-items-center">
                        <Col md="8" className="mx-auto app-login-box">
                            <div className="app-logo-inverse mx-auto mb-3" />

                            <div className="modal-dialog w-100 mx-auto">
                                <div className="modal-content">
                                    <div className="modal-body">
                                        <div className="h5 modal-title text-center">
                                            <h4 className="mt-2">
                                                <div>Log in</div>
                                                <span>Por favor digita tus credenciales</span>
                                            </h4>
                                        </div>
                                        <Form>
                                            <Row form>
                                                <Col md={12}>
                                                    <FormGroup>
                                                        <Input type="email" name="email" id="exampleEmail"
                                                            placeholder="tu_correo@dominio.com" />
                                                    </FormGroup>
                                                </Col>
                                                <Col md={12}>
                                                    <FormGroup>
                                                        <Input type="password" name="password" id="examplePassword"
                                                            placeholder="Aquí tu contraseña" />
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                        </Form>
                                        <div className="divider" />
                                        <h6 className="mb-0">
                                            Sin cuenta?{' '}
                                            <a href="!#" className="text-primary">Registrate ahora</a>
                                        </h6>
                                    </div>
                                    <div className="modal-footer clearfix">
                                        <div className="float-left">
                                            <a href="!#" className="btn-lg btn btn-link"> Recuperar contraseña </a>
                                        </div>
                                        <div className="float-right">
                                            <Button color="primary" size="lg" onClick={this.iniciarSesion} >Iniciar sesión en App</Button>
                                        </div>
                                    </div>
                                </div>
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

})

const mapDispatchToProps = dispatch => ({
    iniciarSesinDispatch : (correo, contraseña) => dispatch(iniciarSesion(correo, contraseña))
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginBoxed);
