import React, { Fragment } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { Container, Col, Card, CardHeader, CardBody, CardFooter } from 'reactstrap';
import LaddaButton, { EXPAND_LEFT } from 'react-ladda';
import { useSelector, useDispatch } from 'react-redux';

import PageTitle from '../../../Layout/PageTitle';
import FormEmpresa from './FormEmpresa';
import FormRepresentante from './FormRepresentante';
import { obtenerVariables, estanActualizandoEmpresaAutenticada, obtenerMensajeActualizacion, errorEnActualizacion } from '../../../reducers/RegistroEmpresaPrincipal';
import { handlerRegistroEmpresa, actualizarUsuarioAutenticado } from '../../../Actions/EmpresaPrincipal';
import { obtenerUsuarioAutenticado } from '../../../reducers/Autenticacion';

const Perfil = () => {

    // constructor(props) {
    //     super(props);
    // }
    const { RazonSocial, Nit, NumeroLicencia, CodigoHabilitacion, CodigoSGSSS, PaginaWeb, Departamento, Ciudad, Direccion, Telefono, Celular, Correo, TipoIdentificacion, Nombres, NumeroIdentificacion, Apellidos, TelefonoRepresentante, CelularRepresentante, CorreoRepresentante } = useSelector(({ RegistroEmpresaPrincipal }) => obtenerVariables(RegistroEmpresaPrincipal));
    const disabledInput = useSelector(({RegistroEmpresaPrincipal}) => estanActualizandoEmpresaAutenticada(RegistroEmpresaPrincipal));
    const registroMensaje = useSelector(({RegistroEmpresaPrincipal}) => obtenerMensajeActualizacion(RegistroEmpresaPrincipal));
    const registroError = useSelector(({RegistroEmpresaPrincipal}) => errorEnActualizacion(RegistroEmpresaPrincipal));
    const usuario = useSelector( ({Autenticacion}) => obtenerUsuarioAutenticado(Autenticacion) );
    const dispatch = useDispatch();
    const _handleFormRegistro = evento => dispatch(handlerRegistroEmpresa(evento.target.name, evento.target.value));

    const _actualizarDatos = e => {
        e.preventDefault();
        
        const RepresentanteLegal = {TipoIdentificacion: "1", NumeroIdentificacion: "123659987", Nombres: "Roberto Fulan", Apellidos: "Marquez Juez", Telefono: "123456"/*TelefonoRepresentante*/, Celular: "123456899" /*CelularRepresentante*/, Correo: "roberto@gmail.com" /*CorreoRepresentante*/};
        const actualizacionEmpresa = {RazonSocial: "IPS Los angeles", NumeroLicencia: "369852", CodigoHabilitacion:"85258", CodigoSGSSS:"74147", PaginaWeb:"www.mipagina.com", Departamento: "bolivar", Ciudad: "cartagena", Direccion: "Villa Sandra Mz C Lt 7, Cartagena, Provincia de Cartagena, Bolívar", Telefono: "654564", Celular: "96325698", Correo:"ipslosangeles@gmail.com", RepresentanteLegal};
        const actualizacionUsuario = {};
        const actualizacionAutenticacion = {};
        const _idEmpresa = usuario.dataEmpresa._id;
        const _idUsuario = usuario.dataUsuario._idUsuario;
        const _idAutenticacion = usuario.dataAuth._idAutenticacion;
        const usuarioOriginal = usuario;
        // console.log(actualizacionEmpresa)
        dispatch(actualizarUsuarioAutenticado(actualizacionEmpresa, actualizacionUsuario, actualizacionAutenticacion, _idEmpresa, _idUsuario, _idAutenticacion, usuarioOriginal));
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
                    heading="Inicio"
                    subheading="Información de la empresa."
                    icon="pe-7s-users icon-gradient bg-ripe-malin"
                />

                <Container fluid className="mb-5" id="PerfilEmpresa" >
                    <Card>
                        <CardHeader>
                            <i className="header-icon lnr-user icon-gradient bg-plum-plate"> </i>
                            Datos de la empresa en sesión
                            </CardHeader>

                        <CardBody>
                            <div className="mt-2">
                                <span>Los campos marcados con <span className="text-danger">*</span> son obligatorios.</span>
                            </div>
                            <div className="d-flex justify-content-center row">
                                <Col md="6" className="mx-auto app-login-box">
                                    <div className="app-logo-inverse mx-auto mb-3" />

                                    <div className="modal-dialog w-100" id="modal-registro-empresa">
                                        <div className="modal-content">
                                            <FormEmpresa
                                                disabledInput={disabledInput}
                                                registroMensaje={registroMensaje}
                                                _handleFormRegistro={_handleFormRegistro}
                                                registroError={registroError}

                                                RazonSocial={RazonSocial}
                                                Nit={Nit}
                                                NumeroLicencia={NumeroLicencia}
                                                CodigoHabilitacion={CodigoHabilitacion}
                                                CodigoSGSSS={CodigoSGSSS}
                                                PaginaWeb={PaginaWeb}
                                                Departamento={Departamento}
                                                Ciudad={Ciudad}
                                                Direccion={Direccion}
                                                Telefono={Telefono}
                                                Celular={Celular}
                                                Correo={Correo}
                                            />
                                        </div>
                                    </div>
                                </Col>
                                <Col md="6" className="mx-auto app-login-box">
                                    <div className="app-logo-inverse mx-auto mb-3" />

                                    <div className="modal-dialog w-100" id="modal-registro-empresa">
                                        <div className="modal-content">
                                            <FormRepresentante
                                                disabledInput={disabledInput}
                                                registroMensaje={registroMensaje}
                                                _handleFormRegistro={_handleFormRegistro}
                                                registroError={registroError}

                                                TipoIdentificacion={TipoIdentificacion}
                                                Nombres={Nombres}
                                                NumeroIdentificacion={NumeroIdentificacion}
                                                Apellidos={Apellidos}
                                                TelefonoRepresentante={TelefonoRepresentante}
                                                CelularRepresentante={CelularRepresentante}
                                                CorreoRepresentante={CorreoRepresentante}
                                            />
                                        </div>
                                    </div>
                                </Col>
                            </div>
                        </CardBody>

                        <CardFooter className="d-block text-right">
                            <LaddaButton
                                className="btn-wide btn-pill btn-shadow btn-hover-shine btn btn-primary"
                                loading={disabledInput}
                                onClick={_actualizarDatos}
                                data-style={EXPAND_LEFT}
                            >
                                Guardar
                                </LaddaButton>
                        </CardFooter>
                    </Card>
                </Container>

            </ReactCSSTransitionGroup>
        </Fragment>
    )

}

export default Perfil;