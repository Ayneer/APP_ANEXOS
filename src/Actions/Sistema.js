import { CARGAR_TIPO_ROLES, CARGAR_TIPO_IDENTIFICACIONES, CARGAR_CIUDADES, CARGAR_DEPARTAMENTOS, CARGANDO_DATOS_SISTEMA, CARGAR_DATOS_SISTEMA } from '../config/variables';

export const cargarTipoRoles = (TipoRoles) => {
    return (dispatch, getState, Api) => {
        dispatch({ type: CARGAR_TIPO_ROLES, TipoRoles });
    }
}

export const cargarTipoIdentificaciones = (TipoIdentificaciones) => {
    return (dispatch, getState, Api) => {
        dispatch({ type: CARGAR_TIPO_IDENTIFICACIONES, TipoIdentificaciones });
    }
}

export const cargarCiudades = (Ciudades) => {
    return (dispatch, getState, Api) => {
        dispatch({ type: CARGAR_CIUDADES, Ciudades });
    }
}

export const cargarDepartamentos = (Departamentos) => {
    return (dispatch, getState, Api) => {
        dispatch({ type: CARGAR_DEPARTAMENTOS, Departamentos });
    }
}

export const cargarDatosSistema = () => {
    return (dispatch, getState, Api) => {
        dispatch({ type: CARGANDO_DATOS_SISTEMA, estado: true });
        Api.buscarDatosSistema().then((resultado)=>{
            
            if(!resultado.error){
                dispatch({ type: CARGAR_DATOS_SISTEMA, TipoRoles: resultado.data.TipoRoles, TipoIdentificaciones: resultado.data.TipoIdentificaciones, Ciudades: resultado.data.Ciudades, Departamentos: resultado.data.Departamentos });
            }

            dispatch({ type: CARGANDO_DATOS_SISTEMA, estado: false });
        }).catch((error)=>{
            dispatch({ type: CARGANDO_DATOS_SISTEMA, estado: false });
        });
    }
}
