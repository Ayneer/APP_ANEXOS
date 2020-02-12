import { CARGAR_USUARIO_SESION } from '../config/variables';
import Autenticacion from '../Autenticacion';

export const cargarUsuario = (usuario) => {
    return (dispatch) => {
        dispatch({ type: CARGAR_USUARIO_SESION, usuario });
    }
}

export const iniciarSesion = (correo, contraseña) => {
    return (dispatch) => {
        Autenticacion.guardarToken("miToken");
        dispatch({ type: CARGAR_USUARIO_SESION, usuario: {nombre: "Ayneer"} });
    }
}

export const cerrarSesion = () => {
    return (dispatch) => {
        Autenticacion.eliminarToken();
        dispatch({ type: CARGAR_USUARIO_SESION, usuario: null });
    }
}