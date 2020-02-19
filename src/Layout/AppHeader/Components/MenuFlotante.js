import React, { Fragment } from 'react';

import Hamburger from 'react-hamburgers';
import PerfectScrollbar from 'react-perfect-scrollbar';
import Drawer from 'react-motion-drawer';
import Perfil from './TabsContent/Perfil';
import { connect } from 'react-redux';

import { accionarMenuFlotante } from '../../../Actions/MenuFlotante';

class DrawerMenuFlotante extends React.Component {

    _accionarMenu = (usuario, estado) => {
        const { accionarMenuFlotanteDispatch } = this.props;
        accionarMenuFlotanteDispatch(usuario, estado);
    }

    _accionarMenuOnChange = (estado) => {
        const { accionarMenuFlotanteDispatch, usuario } = this.props;
        accionarMenuFlotanteDispatch(usuario, estado);
    }

    render() {

        const { accionarMenu, usuario } = this.props;

        return (
            <Fragment>
                <Drawer
                    right
                    className="drawer-content-wrapper p-0"
                    width={450}
                    open={accionarMenu}
                    onChange={open => this._accionarMenuOnChange(open)}
                    noTouchOpen={false}
                    noTouchClose={false}
                >
                    <PerfectScrollbar>

                        <div className="drawer-nav-btn">
                            <Hamburger
                                active={accionarMenu}
                                type="elastic"
                                onClick={() => this._accionarMenu(null, false)}
                            />
                        </div>
                        <Perfil usuario={usuario} />

                    </PerfectScrollbar>
                </Drawer>

            </Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        accionarMenu: state.MenuFlotante.accionarMenu,
        usuario: state.MenuFlotante.usuario,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        accionarMenuFlotanteDispatch: (usuario, estado) => dispatch(accionarMenuFlotante(usuario, estado))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DrawerMenuFlotante);