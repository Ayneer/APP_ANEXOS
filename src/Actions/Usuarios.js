import { CARGAR_USUARIOS, ERROR_CARGAR_USUARIOS, ERROR_ELIMINAR_USUARIO, USUARIO_ELIMINADO, ELIMINANDO_USUARIO, ELIMINANDO_USUARIO_ALERTA, AGREGAR_USUARIO, ELIMINAR_USUARIO } from '../config/variables';

export const cargarUsuarios = (usuarios) => {
    return (dispatch) => {
        dispatch({ type: CARGAR_USUARIOS, usuarios });
    }
}

export const buscarUsuarios = () => {
    return (dispatch,  getState, Api) => {
        Api.listarUsuarios().then((resultado) => {
            
            if(resultado.error){
                dispatch({ type: ERROR_CARGAR_USUARIOS, estado: true, mensaje: resultado.mensaje });
            }else{
                dispatch({ type: CARGAR_USUARIOS, usuarios: resultado.usuarios });
            }
            
        }).catch((err)=>{
            dispatch({ type: ERROR_CARGAR_USUARIOS, estado: true, mensaje: err });
        });
    }
}

export const eliminandoUsuario = (estado) => {
    return (dispatch) => {
        dispatch({ type: ELIMINANDO_USUARIO, estado });
    }
}

export const eliminarUsuario = (identificacion) => {
    return (dispatch,  getState, Api) => {
        dispatch({ type: ELIMINANDO_USUARIO, estado: true });
        
        Api.eliminarUsuario(identificacion).then((resultado) => {
            console.log(resultado)
            if(resultado.error){
                dispatch({ type: ELIMINANDO_USUARIO, estado: false });
                dispatch({ type: ERROR_ELIMINAR_USUARIO, estado: true, mensaje: resultado.mensaje });
            }else{
                dispatch({ type: ELIMINANDO_USUARIO, estado: false });
                dispatch({ type: USUARIO_ELIMINADO, usuarios: resultado.usuarios, estado: true, mensaje: "Usuario eliminado con éxito!" });
                dispatch({ type: ELIMINAR_USUARIO, identificacion });
            }
            
        }).catch((err)=>{
            dispatch({ type: ELIMINANDO_USUARIO, estado: false });
            dispatch({ type: ERROR_ELIMINAR_USUARIO, estado: true, mensaje: err });
        });
    }
}

export const handlerMensajeEliminarAlerta = (mensaje, estado) => {
    return (dispatch) => {
        dispatch({ type: ELIMINANDO_USUARIO_ALERTA, estado, mensaje });
    }
}

export const alterarAlr_s_u = (mensaje, estado) => {
    return (dispatch) => {
        dispatch({ type: USUARIO_ELIMINADO, estado, mensaje });
    }
}

export const eliminarUsuarioState = (identificacion) => {
    return (dispatch) => {
        dispatch({ type: ELIMINAR_USUARIO, identificacion });
    }
}

export const agregarUsuarioState = (usuario) => {
    return (dispatch) => {
        dispatch({ type: AGREGAR_USUARIO, usuario });
    }
}