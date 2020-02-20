import { CARGAR_USUARIO_SESION, ERROR_INICIAR_SESION, CARGANDO_SESION, RECUPERANDO_SESION, LIMPIAR_STATE_SALIR } from '../config/variables';
import Autenticacion from '../Autenticacion';

export const cargarUsuario = (usuario) => {
    return (dispatch, getState, Api) => {
        dispatch({ type: CARGAR_USUARIO_SESION, usuario });
    }
}

export const iniciarSesion = (correo, contraseña) => {
    return (dispatch, getState, Api) => {

        dispatch({ type: CARGANDO_SESION, estado: true });

        Api.iniciarSesion(correo, contraseña).then((respuesta) => {

            if (respuesta.error) {//Error en la autenticación
                dispatch({ type: ERROR_INICIAR_SESION, estado: true, mensaje: respuesta.mensaje });
            } else {//Sesion con exito
                Autenticacion.guardarToken(respuesta.token);
                dispatch({ type: CARGAR_USUARIO_SESION, usuario: respuesta.usuario });
                dispatch({ type: CARGANDO_SESION, estado: false });
                dispatch({ type: ERROR_INICIAR_SESION, estado: false, mensaje: null });
            }

        }).catch((error) => {//Error en la operación
            dispatch({ type: ERROR_INICIAR_SESION, estado: true, mensaje: error.message });
        })

    }
}

export const cerrarSesion = () => {
    return (dispatch) => {
        Autenticacion.eliminarToken();
        if (!Autenticacion.obtenerToken()) {
            dispatch({ type: CARGAR_USUARIO_SESION, usuario: null });
            dispatch({ type: LIMPIAR_STATE_SALIR });
        } else {
            console.log("Error al intentar borrar la sesion")
        }

    }
}

export const obtenerUsuario = () => {
    return (dispatch, getState, Api) => {

        dispatch({ type: RECUPERANDO_SESION, estado: true });

        Api.obtenerUsuario().then((respuesta) => {
            if (respuesta.error) {//Error en la autenticación
                Autenticacion.eliminarToken();
                dispatch({ type: CARGAR_USUARIO_SESION, usuario: null });
                dispatch({ type: RECUPERANDO_SESION, estado: false });
            } else {//Sesion recuperada con exito
                dispatch({ type: CARGAR_USUARIO_SESION, usuario: respuesta.usuario });
                dispatch({ type: RECUPERANDO_SESION, estado: false });
            }

        }).catch((error) => {//Error en la operación
            console.log(error)
            Autenticacion.eliminarToken();
            dispatch({ type: CARGAR_USUARIO_SESION, usuario: null });
            dispatch({ type: RECUPERANDO_SESION, estado: false });
        });

    }
}

export const volerLogin = (usuario, estado) => {
    return (dispatch) => {
        dispatch({ type: CARGAR_USUARIO_SESION, usuario });
        dispatch({ type: RECUPERANDO_SESION, estado });
    }
}

export const lanarError = (mensaje, estado) => {
    return (dispatch) => {
        dispatch({ type: ERROR_INICIAR_SESION, estado, mensaje });
    }
}