import { EDITAR_USUARIO } from '../config/variables';

export const editarUsuario = (usuario) => {
    return (dispatch, getState, Api) => {
        dispatch({ type: EDITAR_USUARIO, usuario });
    }
}