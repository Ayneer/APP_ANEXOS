import { CARGAR_TIPO_ROLES, CARGAR_TIPO_IDENTIFICACIONES, CARGAR_CIUDADES, CARGAR_DEPARTAMENTOS, CARGAR_DATOS_SISTEMA, CARGANDO_DATOS_SISTEMA } from '../config/variables';

const initState = {
    TipoRoles: [],
    TipoIdentificaciones: [],
    Ciudades: [],
    Departamentos: [],
    CargandoDatos: false,
    DatosCargados: false,
}

export const Sistema = (state = initState, action) => {
    switch (action.type) {

        case CARGAR_TIPO_ROLES:
            return {
                ...state,
                TipoRoles: action.TipoRoles,
            }

        case CARGAR_TIPO_IDENTIFICACIONES:
            return {
                ...state,
                TipoIdentificaciones: action.TipoIdentificaciones,
            }

        case CARGAR_CIUDADES:
            return {
                ...state,
                Ciudades: action.Ciudades,
            }

        case CARGAR_DEPARTAMENTOS:
            return {
                ...state,
                Departamentos: action.Departamentos,
            }

        case CARGAR_DATOS_SISTEMA:
            return {
                ...state,
                TipoRoles: action.TipoRoles,
                TipoIdentificaciones: action.TipoIdentificaciones,
                Ciudades: action.Ciudades,
                Departamentos: action.Departamentos,
                DatosCargados: true,
            }

        case CARGANDO_DATOS_SISTEMA:
            return {
                ...state,
                CargandoDatos: action.estado,
            }

        default:
            return state;
    }
}

export const obtTipoRoles = state => state.TipoRoles;
export const obtTipoIdentificaciones = state => state.TipoIdentificaciones;
export const obtCiudades = state => state.Ciudades;
export const obtDepartamentos = state => state.Departamentos;
export const estanCargandoDatosSistema = state => state.CargandoDatos;
export const estanCargadoDatosSistema = state => state.DatosCargados;