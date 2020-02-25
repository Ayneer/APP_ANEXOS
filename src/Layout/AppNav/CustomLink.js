import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import { REGISTRAR_EPS, REGISTRAR_USUARIOS } from './Rutas';
import { /*useSelector,*/ useDispatch } from 'react-redux';
// import { obtenerUsuarioAutenticado } from '../../reducers/Autenticacion';
import { limpiarFormRegistro, /*handlerId_rol*/ } from '../../Actions/Registro';

const DefaultLink = ({
    className,
    classNameActive,
    classNameHasActiveChild,
    active,
    hasActiveChild,
    to,
    externalLink,
    hasSubMenu,
    toggleSubMenu,
    activateMe,
    children,
}) => {

    const link = to.replace(/^#/, '');
    const dispatch = useDispatch();
    // const usuario = useSelector( ({Autenticacion}) => obtenerUsuarioAutenticado(Autenticacion) );

    const _toggleSubMenu = (e) => {
        toggleSubMenu(e);
    }

    const _activateMe = (e) => {
        if(to === REGISTRAR_EPS || to === REGISTRAR_USUARIOS){
            // let id_rol = to === REGISTRAR_EPS ?
            dispatch( limpiarFormRegistro() )
            // dispatch( handlerId_rol() )
        }
        activateMe(e);
    }

    return (
        <Link
            className={classnames(
                className,
                active && classNameActive,
                hasActiveChild && classNameHasActiveChild,
            )}
            to={link}
            onClick={hasSubMenu ? _toggleSubMenu : _activateMe}
            target={externalLink ? '_blank' : undefined}
        >
            {children}
        </Link>
    )

};

DefaultLink.defaultProps = {
    externalLink: false,
    toggleSubMenu: null,
};

DefaultLink.propTypes = {
    className: PropTypes.string.isRequired,
    classNameActive: PropTypes.string.isRequired,
    classNameHasActiveChild: PropTypes.string.isRequired,
    active: PropTypes.bool.isRequired,
    hasActiveChild: PropTypes.bool.isRequired,
    to: PropTypes.string.isRequired,
    externalLink: PropTypes.bool,
    hasSubMenu: PropTypes.bool.isRequired,
    toggleSubMenu: PropTypes.func,
    activateMe: PropTypes.func.isRequired,
    children: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.array,
    ]).isRequired,
};

export default DefaultLink;