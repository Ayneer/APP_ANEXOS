import { ERROR_REGISTRAR_USUARIO, DATOS_SELECT, ERROR_DATOS_SELECT, ERROR_CAMPO_CONTRASEÑA, REGISTRANDO_USUARIO, USUARIO_REGISTRADO, ALERTA_REGISTRO_ERROR, ALERTA_REGISTRO_SUCCESS, AGREGAR_USUARIO } from '../config/variables';

export const lanarError = (mensaje, estado) => {
    return (dispatch) => {
        dispatch({ type: ERROR_REGISTRAR_USUARIO, estado, mensaje, estadoAlerta: false });
    }
}

export const buscarDatosSelect = () => {
    return (dispatch, getState, Api) => {
        Api.buscarTipos_rol().then((resultadoTipos_rol) => {
            if(resultadoTipos_rol.error){
                dispatch({ type: ERROR_DATOS_SELECT, mensaje: resultadoTipos_rol.mensaje});
            }else{
                Api.buscartipos_identificacion().then((resultadoTipos_identificacion)=>{
                    if(resultadoTipos_identificacion.error){
                        dispatch({ type: ERROR_DATOS_SELECT, tipos_identificacion: [], tipos_rol: [], estado: true, mensaje: resultadoTipos_identificacion.mensaje});
                    }else{
                        dispatch({ type: DATOS_SELECT, tipos_rol: resultadoTipos_rol.tipos_rol, tipos_identificacion: resultadoTipos_identificacion.tipos_identificacion, estado: true });
                    }
                }).catch((error)=>{
                    dispatch({ type: ERROR_DATOS_SELECT, tipos_identificacion: [], tipos_rol: [], estado: true, mensaje: error.message});
                })
            }
        }).catch((error)=>{
            dispatch({ type: ERROR_DATOS_SELECT, tipos_identificacion: [], tipos_rol: [], estado: true, mensaje: error.message});
        })
        
    }
}

export const registrarUsuario = (usuario) => {
    return (dispatch, getState, Api) => {
        dispatch({ type: REGISTRANDO_USUARIO, estado: true });
        Api.crearUsuario(usuario).then((respuesta)=>{
            if(respuesta.error){
                dispatch({ type: REGISTRANDO_USUARIO, estado: false });
                dispatch({ type: ERROR_REGISTRAR_USUARIO, estado: true, mensaje: respuesta.mensaje, estadoAlerta: true });
            }else{
                dispatch({ type: REGISTRANDO_USUARIO, estado: false });
                dispatch({ type: USUARIO_REGISTRADO, usuario: respuesta.usuario });
                dispatch({ type: AGREGAR_USUARIO, usuario: respuesta.usuario });
            }
        }).catch((error)=>{
            dispatch({ type: REGISTRANDO_USUARIO, estado: false });
            dispatch({ type: ERROR_REGISTRAR_USUARIO, estado: true, mensaje: error.message, estadoAlerta: true });
        })
    }
}

export const handlerAlertaError = (mensaje, estado) => {
    return (dispatch) => {
        dispatch({ type: ALERTA_REGISTRO_ERROR, estado, mensaje });
    }
}

export const handlerAlertaSuccess = (mensaje, estado) => {
    return (dispatch) => {
        dispatch({ type: ALERTA_REGISTRO_SUCCESS, estado, mensaje });
    }
}

export const ErrorCampo_contraseña = (mensaje, estado) => {
    return (dispatch) => {
        dispatch({ type: ERROR_CAMPO_CONTRASEÑA, estado, mensaje });
    }
}