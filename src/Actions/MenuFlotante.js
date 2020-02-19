import { ACCIONAR_MENU_FLOTANTE } from '../config/variables';

export const accionarMenuFlotante = (usuario, estado) => {
    return (dispatch, getState, Api) => {
        dispatch({ type: ACCIONAR_MENU_FLOTANTE, estado, usuario });
    }
}