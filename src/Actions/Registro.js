import { ERROR_REGISTRAR_USUARIO, DATOS_SELECT, ERROR_DATOS_SELECT, ERROR_CAMPO_CONTRASEÑA, REGISTRANDO_USUARIO, USUARIO_REGISTRADO, ALERTA_REGISTRO_ERROR, ALERTA_REGISTRO_SUCCESS, AGREGAR_USUARIO, ACTUALIZANDO_USUARIO, ERROR_ACTUALIZAR_USUARIO, USUARIO_ACTULIZADO, ACTUALIZAR_USUARIO, ALERTA_REGISTRO_ACT_ERROR, ALERTA_REGISTRO_ACT_SUCCESS, LIMPIAR_STATE_REGISTRO, HANDLER_REGISTRO, HANDLER_USUARIO_REGISTRO, LIMPIAR_FORM_REGISTRO, HANDLER_ID_ROL } from '../config/variables';

export const lanarErrorRegistro = (mensaje, estado) => {
    return (dispatch) => {
        dispatch({ type: ERROR_REGISTRAR_USUARIO, estado, mensaje, estadoAlerta: false });
    }
}

export const buscarDatosSelect = (id_rol_padre) => {
    return (dispatch, getState, Api) => {
        Api.buscarTipos_rol().then((resultadoTipos_rol) => {
            
            if (resultadoTipos_rol.error) {
                dispatch({ type: ERROR_DATOS_SELECT, mensaje: resultadoTipos_rol.mensaje });
            } else {
                
                Api.buscartipos_identificacion().then((resultadoTipos_identificacion) => {
                    
                    if (resultadoTipos_identificacion.error) {
                        dispatch({ type: ERROR_DATOS_SELECT, tipos_identificacion: [], tipos_rol: [], estado: true, mensaje: resultadoTipos_identificacion.mensaje });
                    } else {
                        dispatch({ type: DATOS_SELECT, tipos_rol: resultadoTipos_rol.tipos_rol, tipos_identificacion: resultadoTipos_identificacion.tipos_identificacion, id_rol_padre, estado: true });
                    }
                }).catch((error) => {
                    console.log(error)
                    dispatch({ type: ERROR_DATOS_SELECT, tipos_identificacion: [], tipos_rol: [], estado: true, mensaje: error.message });
                })
            }
        }).catch((error) => {
            dispatch({ type: ERROR_DATOS_SELECT, tipos_identificacion: [], tipos_rol: [], estado: true, mensaje: error.message });
        })

    }
}

export const registrarUsuario = (datosEmpresa, datosUsuario, datosAutenticacion) => {
    return (dispatch, getState, Api) => {
        dispatch({ type: REGISTRANDO_USUARIO, estado: true });
        Api.crearUsuario(datosEmpresa, datosUsuario, datosAutenticacion).then((respuesta) => {
            if (respuesta.error) {
                dispatch({ type: REGISTRANDO_USUARIO, estado: false });
                dispatch({ type: ERROR_REGISTRAR_USUARIO, estado: true, mensaje: respuesta.mensaje, estadoAlerta: true });
            } else {
                dispatch({ type: REGISTRANDO_USUARIO, estado: false });
                dispatch({ type: USUARIO_REGISTRADO, usuario: respuesta.usuario });
                dispatch({ type: AGREGAR_USUARIO, usuario: respuesta.usuario });
            }
        }).catch((error) => {
            dispatch({ type: REGISTRANDO_USUARIO, estado: false });
            dispatch({ type: ERROR_REGISTRAR_USUARIO, estado: true, mensaje: error.message, estadoAlerta: true });
        })
    }
}

export const actualizarUsuario = (actualizacionEmpresa, actualizacionUsuario, actualizacionAutenticacion, _idEmpresa, _idUsuario, _idAutenticacion, usuarioOriginal) => {
    return (dispatch, getState, Api) => {
        dispatch({ type: ACTUALIZANDO_USUARIO, estado: true });
        Api.actualizarUsuario(actualizacionEmpresa, actualizacionUsuario, actualizacionAutenticacion, _idEmpresa, _idUsuario, _idAutenticacion).then((respuesta) => {
            if (respuesta.error) {
                dispatch({ type: ACTUALIZANDO_USUARIO, estado: false });
                dispatch({ type: ERROR_ACTUALIZAR_USUARIO, estado: true, mensaje: respuesta.mensaje, estadoAlerta: true });
            } else {
                dispatch({ type: ACTUALIZANDO_USUARIO, estado: false });
                dispatch({ type: USUARIO_ACTULIZADO, usuario: respuesta.usuario, estado: true, mensaje: "Usuario actualizado con éxito!" });
                dispatch({ type: ACTUALIZAR_USUARIO, usuario: respuesta.usuario, usuarioOriginal });
            }
        }).catch((error) => {
            dispatch({ type: ACTUALIZANDO_USUARIO, estado: false });
            dispatch({ type: ERROR_ACTUALIZAR_USUARIO, estado: true, mensaje: error.message, estadoAlerta: true });
        })
    }
}

export const handlerAlertaError = (mensaje, estado) => {
    return (dispatch) => {
        dispatch({ type: ALERTA_REGISTRO_ERROR, estado, mensaje });
        dispatch({ type: ALERTA_REGISTRO_ACT_ERROR, estado, mensaje });
    }
}

export const handlerAlertaSuccess = (mensaje, estado) => {
    return (dispatch) => {
        dispatch({ type: ALERTA_REGISTRO_SUCCESS, estado, mensaje });
        dispatch({ type: ALERTA_REGISTRO_ACT_SUCCESS, estado, mensaje });
    }
}

export const lanzarErrorContraseña = (mensaje, estado) => {
    return (dispatch) => {
        dispatch({ type: ERROR_CAMPO_CONTRASEÑA, estado, mensaje });
    }
}

export const limpiarRegistro = () => {
    return (dispatch) => {
        dispatch({ type: LIMPIAR_STATE_REGISTRO});
    }
}

export const handlerRegistro = (name, value) => {
    return (dispatch) => {
        dispatch({ type: HANDLER_REGISTRO, name, value});
    }
}

export const handlerUsuarioRegistro = (usuario) => {
    return (dispatch) => {
        dispatch({ type: HANDLER_USUARIO_REGISTRO, usuario});
    }
}

export const limpiarFormRegistro = () => {
    return (dispatch) => {
        dispatch({ type: LIMPIAR_FORM_REGISTRO});
    }
}

export const handlerId_rol = id_rol => {
    return (dispatch) => {
        dispatch({ type: HANDLER_ID_ROL, id_rol});
    }
}