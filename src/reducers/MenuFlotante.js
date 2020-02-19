import { ACCIONAR_MENU_FLOTANTE } from '../config/variables';

const initState = {
    usuario: null,
    accionarMenu: false
}

const menuFlotante = (state = initState, action) => {
    switch (action.type) {

        case ACCIONAR_MENU_FLOTANTE:
            return {
                ...state,
                accionarMenu: action.estado,
                usuario: action.usuario
            }

        default:
            return state;
    }
}

export default menuFlotante;