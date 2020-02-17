import { ERROR_REGISTRAR_USUARIO, DATOS_SELECT, ERROR_DATOS_SELECT, ERROR_CAMPO_CONTRASEÑA, USUARIO_REGISTRADO, REGISTRANDO_USUARIO, ALERTA_REGISTRO_ERROR, ALERTA_REGISTRO_SUCCESS } from '../config/variables';

const initState = {
    registroMensaje: "",
    registroError: false,
    tipos_identificacion: [],
    tipos_rol: [],
    datos_select_cargados: false,
    error_cargar_datos_select: false,
    error_campo_contraseña: false,
    msg_campo_contraseña: "",
    resultado_registro: false,
    registrando_usuario: false,
    estado_alerta_error: false,
    mensaje_alerta_error: "",
    estado_alerta_success: false,
    mensaje_alerta_success: ""
}

const registroUsuario = (state = initState, action) => {
    switch (action.type) {

        case ERROR_REGISTRAR_USUARIO:
            return {
                ...state,
                registroMensaje: action.mensaje,
                registroError: action.estado,
                estado_alerta_error: action.estadoAlerta,
                mensaje_alerta_error: action.mensaje
            }

        case DATOS_SELECT:
            return {
                ...state,
                tipos_identificacion: action.tipos_identificacion,
                tipos_rol: action.tipos_rol,
                datos_select_cargados: action.estado,
                error_cargar_datos_select: false
            }

        case ERROR_DATOS_SELECT:
            return {
                ...state,
                tipos_identificacion: [],
                tipos_rol: [],
                datos_select_cargados: true,
                registroMensaje: action.mensaje,
                error_cargar_datos_select: true
            }

        case ERROR_CAMPO_CONTRASEÑA:
            return {
                ...state,
                error_campo_contraseña: action.estado,
                msg_campo_contraseña: action.mensaje
            }

        case REGISTRANDO_USUARIO:
            return {
                ...state,
                registrando_usuario: action.estado
            }

        case ALERTA_REGISTRO_ERROR:
            return {
                ...state,
                estado_alerta_error: action.estado,
                mensaje_alerta_error: action.mensaje
            }

        case USUARIO_REGISTRADO:
            return {
                ...state,
                resultado_registro: true,
                estado_alerta_success: true,
                mensaje_alerta_success: "Usuario registrado con éxito!"
            }

        case ALERTA_REGISTRO_SUCCESS:
            return {
                ...state,
                estado_alerta_success: action.estado,
                mensaje_alerta_success: action.mensaje
            }

        default:
            return state;
    }
}

export default registroUsuario;