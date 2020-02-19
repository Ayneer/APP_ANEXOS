import { EDITAR_USUARIO, ACTUALIZANDO_USUARIO, USUARIO_ACTULIZADO, ERROR_ACTUALIZAR_USUARIO, ALERTA_REGISTRO_ACT_SUCCESS, ALERTA_REGISTRO_ACT_ERROR } from '../config/variables';

const initState = {
    usuarioEditar: null,
    actualizandoRegistro: false,
    errorActualizarMensaje: "",
    errorActualizar: false,
    estadoAlertaActualizarError: false,
    usuarioActualizado: null,
    estado_alerta_success_act: false,
    mensaje_alerta_success_act: ""
}

const editarUsuario = (state = initState, action) => {
    switch (action.type) {

        case EDITAR_USUARIO:
            return {
                ...state,
                usuarioEditar: action.usuario,
            }

        case ACTUALIZANDO_USUARIO:
            return {
                ...state,
                actualizandoRegistro: action.estado,
            }

        case ERROR_ACTUALIZAR_USUARIO:
            return {
                ...state,
                errorActualizarMensaje: action.mensaje,
                errorActualizar: action.estado,
                estadoAlertaActualizarError: action.estadoAlerta
            }

        case USUARIO_ACTULIZADO:
            return {
                ...state,
                usuarioActualizado: action.usuario,
                estado_alerta_success_act: action.estado,
                mensaje_alerta_success_act: action.mensaje,
            }

        case ALERTA_REGISTRO_ACT_ERROR:
            return {
                ...state,
                estadoAlertaActualizarError: action.estado,
                errorActualizarMensaje: action.mensaje,
            }

        case ALERTA_REGISTRO_ACT_SUCCESS:
            return {
                ...state,
                estado_alerta_success_act: action.estado,
                mensaje_alerta_success_act: action.mensaje,
            }


        default:
            return state;
    }
}

export default editarUsuario;