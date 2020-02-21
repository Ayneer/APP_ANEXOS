import React, { Component, Fragment } from 'react';
import { Row, Col, ListGroup, ListGroupItem, Card, Button } from 'reactstrap';
import avatar5 from '../../../../assets/utils/images/avatars/5.jpg';
import bg3 from '../../../../assets/utils/images/dropdown-header/city4.jpg';

class Perfil extends Component {

    render() {

        const { usuario } = this.props;

        return (
            <Fragment>
                <h3 className="drawer-heading">
                    Perfil
                </h3>
                {usuario &&
                    <Card className="card-shadow-primary profile-responsive card-border mb-3 ml-1 mr-1">
                        <div className="dropdown-menu-header">
                            <div className="dropdown-menu-header-inner bg-focus">
                                <div className="menu-header-image opacity-3"
                                    style={{
                                        backgroundImage: 'url(' + bg3 + ')'
                                    }}
                                />
                                <div className="menu-header-content btn-pane-right">
                                    <div className="avatar-icon-wrapper mr-2 avatar-icon-xl">
                                        <div className="avatar-icon rounded">
                                            <img src={avatar5} alt="Avatar 5" />
                                        </div>
                                    </div>
                                    <div>
                                        <h5 className="menu-header-title">{usuario.nombres + " " + usuario.apellidos}</h5>
                                        <h6 className="menu-header-subtitle">{`Nombre de la empresa`}</h6>
                                    </div>
                                    <div className="menu-header-btn-pane">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <ListGroup flush>
                            <ListGroupItem className="bg-warm-flame">
                                <div className="widget-content p-0">
                                    <div className="widget-content-wrapper">
                                        <div className="widget-content-left">
                                            <div className="widget-heading text-dark opacity-7">
                                                {`Rol de ${usuario.tipo_perfil}`}
                                            </div>
                                            <div className="widget-subheading opacity-10">
                                                <span className="pr-2">
                                                    {`${usuario.descripcionTipoIdentificacion} (${usuario.acronimo}):`} <b className="text-danger">{usuario.identificacion}</b>
                                                </span>
                                            </div>
                                            <div className="widget-subheading opacity-10">
                                                <span className="pr-2">
                                                    Edad: <b className="text-danger">{usuario.edad}</b>
                                                </span>
                                            </div>
                                            <div className="widget-subheading opacity-10">
                                                <span className="pr-2">
                                                    Correo electrónico: <b className="text-danger">{usuario.correo}</b>
                                                </span>
                                            </div>
                                            <div className="widget-subheading opacity-10">
                                                <span className="pr-2">
                                                    Teléfono: <b className="text-danger">{usuario.telefono}</b>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </ListGroupItem>
                            <ListGroupItem className="p-0">
                                <div className="grid-menu grid-menu-2col">
                                    <Row className="no-gutters">
                                        <Col sm="6">
                                            <Button
                                                className="btn-icon-vertical btn-square btn-transition"
                                                outline color="link">
                                                <i className="lnr-pencil btn-icon-wrapper btn-icon-lg mb-3"> </i>
                                                Editar perfil
                                            </Button>
                                        </Col>
                                        <Col sm="6">
                                            <Button
                                                className="btn-icon-vertical btn-square btn-transition"
                                                outline color="link">
                                                <i className="lnr-envelope btn-icon-wrapper btn-icon-lg mb-3"> </i>
                                                Enviar mensaje
                                            </Button>
                                        </Col>
                                    </Row>
                                </div>
                            </ListGroupItem>
                        </ListGroup>
                    </Card>
                }
            </Fragment>
        )

    }
}

export default Perfil;