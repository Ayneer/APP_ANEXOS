import { ACCIONAR_MENU_FLOTANTE } from '../config/variables';

const initState = {
    TipoRoles: [],
    TipoIdentificaciones: [],
    Ciudades: [],
    Departamentos: [],
    CargandoDatos: false,
}

export const Sistema = (state = initState, action) => {
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

export const estadoMenu = state => state.accionarMenu;