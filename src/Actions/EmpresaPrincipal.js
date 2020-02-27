import { HANDLER_REGISTRO_EMPRESA_AUTENTICADA, ACTUALIZANDO_EMPRESA_AUTENTICADA, ERROR_ACTUALIZAR_EMPRESA_AUTENTICADA, ALERTA_REGISTRO_SUCCESS, CARGAR_USUARIO_SESION } from '../config/variables';

export const handlerRegistroEmpresa = (name, value) => {
    return (dispatch, getState, Api) => {
        dispatch({ type: HANDLER_REGISTRO_EMPRESA_AUTENTICADA, value, name });
    }
}

export const actualizarUsuarioAutenticado = (actualizacionEmpresa, actualizacionUsuario, actualizacionAutenticacion, _idEmpresa, _idUsuario, _idAutenticacion, usuarioOriginal) => {
    return (dispatch, getState, Api) => {
        dispatch({ type: ACTUALIZANDO_EMPRESA_AUTENTICADA, estado: true });
        Api.actualizarUsuario(actualizacionEmpresa, actualizacionUsuario, actualizacionAutenticacion, _idEmpresa, _idUsuario, _idAutenticacion).then((respuesta) => {
            if (respuesta.error) {
                dispatch({ type: ACTUALIZANDO_EMPRESA_AUTENTICADA, estado: false });
                dispatch({ type: ERROR_ACTUALIZAR_EMPRESA_AUTENTICADA, estado: true, mensaje: respuesta.mensaje, estadoAlerta: true });
            } else {
                dispatch({ type: ACTUALIZANDO_EMPRESA_AUTENTICADA, estado: false });
                dispatch({ type: ALERTA_REGISTRO_SUCCESS, estado: true, mensaje: "Usuario actualizado con éxito!" });
                dispatch({ type: CARGAR_USUARIO_SESION, usuario: respuesta.usuario });
            }
        }).catch((error) => {
            dispatch({ type: ACTUALIZANDO_EMPRESA_AUTENTICADA, estado: false });
            dispatch({ type: ERROR_ACTUALIZAR_EMPRESA_AUTENTICADA, estado: true, mensaje: error.message, estadoAlerta: true });
        });
    }
}