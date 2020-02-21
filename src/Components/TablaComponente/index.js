import React, { Component, Fragment } from 'react';
import { NavLink, Table, CardHeader, PopoverBody, Row, Col, Button, Nav, NavItem, Card, UncontrolledPopover, CardFooter} from 'reactstrap';
import BlockUi from 'react-block-ui';
import { Loader } from 'react-loaders';
import SweetAlert from 'sweetalert-react';
import { NavLink as RRNavLink } from 'react-router-dom';

import ModalUsuario from '../Dashboards/Usuarios/Modal';

import avatar2 from '../../assets/utils/images/avatars/2.jpg';
import Perfil from './perfil';
import { withRouter } from 'react-router-dom';
import { EDITAR_USUARIO } from '../../Layout/AppNav/Rutas';

class TablaComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            mostrarAlerta: true,
            modalEstado: false,
            asegurarAccion: false,
            identificacion_usuario: null
        }

        this._toggleModal = this._toggleModal.bind(this);
    }

    _ocultarAlerta = () => {
        this.setState({ mostrarAlerta: false });
    }

    _toggleModal() {
        this.setState({
            modalEstado: !this.state.modalEstado
        });
    }

    _eliminarDato = () => {
        this.props.eliminarDato(this.state.identificacion_usuario);
    }

    _cancelarEliminacion = () => {
        this.setState({ asegurarAccion: false, identificacion_usuario: null });
    }

    optMenu = (usuario) => {

        const { accionarMenuFlotante, estadoMenu } = this.props;

        return (
            <Fragment>
                <Button size="sm" className="btn-pill" color="link" id={`PopoverCustomT-${usuario.identificacion}`}>
                    <span className="pe-7s-more" ></span>
                </Button>
                <UncontrolledPopover
                    trigger="legacy"
                    placement="top"
                    className="popover-custom rm-pointers"
                    target={`PopoverCustomT-${usuario.identificacion}`}>
                    <PopoverBody>
                        <Nav vertical>
                            <NavItem className="nav-item-header">
                                Acciones
                            </NavItem>
                            <NavItem>
                                <NavLink tag={RRNavLink} exact to={`${EDITAR_USUARIO}${usuario.identificacion}`} >Editar</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="#" onClick={() => accionarMenuFlotante(usuario, !estadoMenu)} >Ver perfil</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="#" onClick={() => this.setState({ asegurarAccion: true, identificacion_usuario: usuario.identificacion })}>Eliminar</NavLink>
                            </NavItem>
                            {/* <NavItem>
                                <NavLink href="#">Recuperar contraseña</NavLink>
                            </NavItem> */}
                        </Nav>
                    </PopoverBody>
                </UncontrolledPopover >
            </Fragment>
        )
    }

    _alertaEliminarError = (mensaje, estado) => {
        this.props.alertaEliminarError(mensaje, estado);
        this.setState({ asegurarAccion: false, identificacion_usuario: null });
    }

    _alertaEliminarSuccess = (mensaje, estado) => {
        this.props.alertaEliminarSuccess(mensaje, estado);
        this.setState({ asegurarAccion: false, identificacion_usuario: null });
    }

    render() {

        let { cargandoDatos, datos, error, mensajeError, eliminandoDato, errorEliminarDato, eliminarMensajeError, datoEliminado, mensajeExitoEliminar } = this.props;
        let { mostrarAlerta, modalEstado, asegurarAccion } = this.state;

        return (
            <Row>
                <Col md="12">
                    <Card className="main-card mb-6">

                        <ModalUsuario modalEstado={modalEstado} toggle={this._toggleModal} />

                        <CardHeader>
                            Usuarios activos
                        </CardHeader>

                        <BlockUi tag="div" blocking={cargandoDatos} className="block-overlay-dark"
                            loader={<Loader color="#ffffff" active type={"ball-pulse"} />} >

                            {error ?

                                <div>
                                    {mensajeError}
                                    <SweetAlert
                                        title="Good job!"
                                        confirmButtonColor=""
                                        show={mostrarAlerta}
                                        text="You clicked the button!"
                                        type="warning"
                                        onConfirm={this._ocultarAlerta} />
                                </div>
                                :
                                <div style={{
                                    maxHeight: '500px',
                                    overflowY: 'auto'
                                }}>
                                    <Table responsive hover striped borderless className="align-middle mb-2" id="tablaComponente1">
                                        <thead >
                                            <tr>
                                                <th className="text-center">#</th>
                                                <th>Nombre</th>
                                                <th className="text-center">Identificación</th>
                                                <th className="text-center">Correo</th>
                                                <th className="text-center">Acciones</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {datos.length > 0 && datos.map((usuario, index) =>
                                                <tr key={usuario.identificacion}>
                                                    <td className="text-center text-muted">{`#${index + 1}`}</td>

                                                    <td>
                                                        <Perfil nombre={usuario.nombres} descripcion={usuario.tipo_perfil} avatar={avatar2} />
                                                    </td>

                                                    <td className="text-center">
                                                        {usuario.identificacion}
                                                    </td>

                                                    <td className="text-center">
                                                        <div className="badge badge-warning">{usuario.correo}</div>
                                                    </td>

                                                    <td className="text-center">
                                                        {this.optMenu(usuario)}
                                                    </td>
                                                </tr>

                                            )}

                                        </tbody>
                                    </Table>

                                    <SweetAlert
                                        title={eliminandoDato ? "Eliminando usuario" : "¿Estas seguro?"}
                                        confirmButtonColor=""
                                        show={asegurarAccion}
                                        text={eliminandoDato ? "Por favor espere mientra se completa el proceso." : "No podrás revertir esta acción."}
                                        showCancelButton={eliminandoDato ? false : true}
                                        showConfirmButton={eliminandoDato ? false : true}
                                        type={"input"}
                                        onConfirm={() => this._eliminarDato()}
                                        onCancel={() => this._cancelarEliminacion()} />

                                    <SweetAlert
                                        title="Oops, ah ocurrido un error!"
                                        confirmButtonColor=""
                                        show={errorEliminarDato}
                                        text={eliminarMensajeError}
                                        type="error"
                                        onConfirm={() => this._alertaEliminarError("", false)} />

                                    <SweetAlert
                                        title="Proceso exitoso!"
                                        confirmButtonColor=""
                                        show={datoEliminado}
                                        text={mensajeExitoEliminar}
                                        type="success"
                                        onConfirm={() => this._alertaEliminarSuccess("", false)} />

                                </div>
                            }
                        </ BlockUi>
                        <CardFooter className="d-block text-center">
                        </CardFooter>
                    </Card>
                </Col>
            </Row>
        )
    }
}

export default withRouter(TablaComponent);