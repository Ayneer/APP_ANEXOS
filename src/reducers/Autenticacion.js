import { CARGAR_USUARIO_SESION, ERROR_INICIAR_SESION, CARGANDO_SESION, RECUPERANDO_SESION } from '../config/variables';

const initState = {
    usuario: null,
    credencialesError: false,
    credencialesMensaje: "",
    cargandoSesion: false,
    cargandoSesionRecuperada: true
}

const autenticacion = (state = initState, action) => {
    switch (action.type) {

        case CARGAR_USUARIO_SESION:
            return {
                ...state,
                usuario: action.usuario,
                cargandoSesion: false
            }
        case ERROR_INICIAR_SESION:
            return {
                ...state,
                credencialesError: action.estado,
                credencialesMensaje: action.mensaje,
                cargandoSesion: false
            }
        case CARGANDO_SESION:
            return {
                ...state,
                cargandoSesion: action.estado
            }
        case RECUPERANDO_SESION:
            return {
                ...state,
                cargandoSesionRecuperada: action.estado
            }

        default:
            return state;
    }
}

export default autenticacion;