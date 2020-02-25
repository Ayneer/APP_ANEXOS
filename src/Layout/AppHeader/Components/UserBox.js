import React, { Fragment } from 'react';

// import Ionicon from 'react-ionicons';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { DropdownToggle, DropdownMenu, Nav, /*Col, Row,*/ Button, NavItem, NavLink, /*UncontrolledTooltip,*/ UncontrolledButtonDropdown } from 'reactstrap';
import { toast, Bounce } from 'react-toastify';
import { faAngleDown, } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import city3 from '../../../assets/utils/images/dropdown-header/city3.jpg';
import avatar1 from '../../../assets/utils/images/avatars/1.jpg';

import { cerrarSesion } from '../../../Actions/Autenticacion';
import {accionarMenuFlotante} from '../../../Actions/MenuFlotante';
import { connect } from 'react-redux';

class UserBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            active: false,
        };
    }

    notify2 = () => this.toastId = toast("You don't have any new items in your calendar for today! Go out and play!", {
        transition: Bounce,
        closeButton: true,
        autoClose: 5000,
        position: 'bottom-center',
        type: 'success'
    });

    cerrarSesion = evento => {
        evento.preventDefault();
        let { cerrarSesionDispatch } = this.props;
        cerrarSesionDispatch();
    }

    _accionarMenu = (usuario, estado) => {
        const {accionarMenuFlotanteDispatch} = this.props;
        accionarMenuFlotanteDispatch(usuario, estado);
    }

    render() {

        const { usuario, accionarMenu } = this.props;

        return (
            <Fragment>
                <div className="header-btn-lg pr-0">
                    <div className="widget-content p-0">
                        <div className="widget-content-wrapper">
                            <div className="widget-content-left">
                                <UncontrolledButtonDropdown>
                                    <DropdownToggle color="link" className="p-0">
                                        <img width={42} className="rounded-circle" src={avatar1} alt="" />
                                        <FontAwesomeIcon className="ml-2 opacity-8" icon={faAngleDown} />
                                    </DropdownToggle>
                                    <DropdownMenu right className="rm-pointers dropdown-menu-lg">
                                        <div className="dropdown-menu-header">
                                            <div className="dropdown-menu-header-inner bg-info">
                                                <div className="menu-header-image opacity-2"
                                                    style={{
                                                        backgroundImage: 'url(' + city3 + ')'
                                                    }}
                                                />
                                                <div className="menu-header-content text-left">
                                                    <div className="widget-content p-0">
                                                        <div className="widget-content-wrapper">
                                                            <div className="widget-content-left mr-3">
                                                                <img width={42} className="rounded-circle" src={avatar1}
                                                                    alt="" />
                                                            </div>
                                                            <div className="widget-content-left">
                                                                <div className="widget-heading">
                                                                    {usuario.dataUsuario.nombres}
                                                                </div>
                                                                <div className="widget-subheading opacity-8">
                                                                    {`${usuario.dataAuth.tipo_perfil}`}
                                                                </div>
                                                            </div>
                                                            <div className="widget-content-right mr-2">
                                                                <Button className="btn-pill btn-shadow btn-shine"
                                                                    color="focus" onClick={this.cerrarSesion}>
                                                                    Cerrar la sesión
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="scroll-area-xs" style={{
                                            height: '110px'
                                        }}>
                                            <PerfectScrollbar>
                                                <Nav vertical>
                                                    <NavItem className="nav-item-header">
                                                        Mi cuenta
                                                    </NavItem>
                                                    <NavItem>
                                                        <NavLink href="#" onClick={ () => this._accionarMenu(usuario, !accionarMenu) } >
                                                            Perfil
                                                        </NavLink>
                                                    </NavItem>
                                                    <NavItem>
                                                        <NavLink href="#">
                                                            Configuración
                                                        </NavLink>
                                                    </NavItem>
                                                    <NavItem>
                                                        <NavLink href="#">
                                                            Mensajes
                                                            <div className="ml-auto badge badge-pill badge-info">8</div>
                                                        </NavLink>
                                                    </NavItem>
                                                </Nav>
                                            </PerfectScrollbar>
                                        </div>
                                    </DropdownMenu>
                                </UncontrolledButtonDropdown>
                            </div>
                            <div className="widget-content-left  ml-3 header-user-info">
                                <div className="widget-heading">
                                    {usuario.dataUsuario.nombres}
                                </div>
                                <div className="widget-subheading">
                                    {`${usuario.dataAuth.tipo_perfil}`}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        usuario: state.Autenticacion.usuario,
        accionarMenu: state.MenuFlotante.accionarMenu,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        cerrarSesionDispatch: () => dispatch(cerrarSesion()),
        accionarMenuFlotanteDispatch: (usuario, estado) => dispatch(accionarMenuFlotante(usuario, estado)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(UserBox);