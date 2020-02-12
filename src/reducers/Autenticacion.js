import { CARGAR_USUARIO_SESION } from '../config/variables';

const initState = {
    usuario: null
}

const autenticacion = (state = initState, action) => {
    switch (action.type) {

        case CARGAR_USUARIO_SESION:
            return {
                ...state,
                usuario: action.usuario
            }

        default:
            return state;
    }
}

export default autenticacion;