import { ALERTA_REGISTRO_ERROR, ALERTA_REGISTRO_SUCCESS, LIMPIAR_STATE_SALIR, HANDLER_REGISTRO_EMPRESA_AUTENTICADA, CARGAR_DATOS_EMPRESA_AUTENTICADA, ERROR_ACTUALIZAR_EMPRESA_AUTENTICADA, ACTUALIZANDO_EMPRESA_AUTENTICADA, } from '../config/variables';

const initState = {
    registroMensaje: "",
    registroError: false,
    actualizando_empresa_autenticada: false,
    estado_alerta_error: false,
    mensaje_alerta_error: "",
    estado_alerta_success: false,
    mensaje_alerta_success: "",

    RazonSocial: "",
    Nit: "",
    NumeroLicencia: "",
    CodigoHabilitacion: "",
    CodigoSGSSS: "",
    PaginaWeb: "",
    Departamento: "",
    Ciudad: "",
    Direccion: "",
    Telefono: "",
    Celular: "",
    Correo: "",
    RepresentanteLegal: "",

    TipoIdentificacion: "",
    NumeroIdentificacion: "",
    Nombres: "",
    Apellidos: "",
    TelefonoRepresentante: "",
    CelularRepresentante: "",
    CorreoRepresentante: "",
}

export const RegistroEmpresaPrincipal = (state = initState, action) => {
    switch (action.type) {

        case LIMPIAR_STATE_SALIR:
            return {
                ...state,
                registroMensaje: "",
                registroError: false,
                actualizando_empresa_autenticada: false,
                estado_alerta_error: false,
                mensaje_alerta_error: "",
                estado_alerta_success: false,
                mensaje_alerta_success: "",

                RazonSocial: "",
                Nit: "",
                NumeroLicencia: "",
                CodigoHabilitacion: "",
                CodigoSGSSS: "",
                PaginaWeb: "",
                Departamento: "",
                Ciudad: "",
                Direccion: "",
                Telefono: "",
                Celular: "",
                Correo: "",
                RepresentanteLegal: "",

                TipoIdentificacion: "",
                NumeroIdentificacion: "",
                Nombres: "",
                Apellidos: "",
                TelefonoRepresentante: "",
                CelularRepresentante: "",
                CorreoRepresentante: "",
            }

        case HANDLER_REGISTRO_EMPRESA_AUTENTICADA:
            const name = action.name;
            const value = action.value;
            return {
                ...state,
                [name]: value
            }

        case CARGAR_DATOS_EMPRESA_AUTENTICADA:

            return {
                ...state,
                RazonSocial: action.usuario.dataEmpresa.RazonSocial ? action.usuario.dataEmpresa.RazonSocial : "",
                Nit: action.usuario.dataEmpresa.nit ? action.usuario.dataEmpresa.nit : "",//Cambiar a Nit
                NumeroLicencia: action.usuario.dataEmpresa.NumeroLicencia ? action.usuario.dataEmpresa.NumeroLicencia : "",
                CodigoHabilitacion: action.usuario.dataEmpresa.CodigoHabilitacion ? action.usuario.dataEmpresa.CodigoHabilitacion : "",
                CodigoSGSSS: action.usuario.dataEmpresa.CodigoSGSSS ? action.usuario.dataEmpresa.CodigoSGSSS : "",
                PaginaWeb: action.usuario.dataEmpresa.PaginaWeb ? action.usuario.dataEmpresa.PaginaWeb : "",
                Departamento: action.usuario.dataEmpresa.Departamento ? action.usuario.dataEmpresa.Departamento : "",
                Ciudad: action.usuario.dataEmpresa.Ciudad ? action.usuario.dataEmpresa.Ciudad : "",
                Direccion: action.usuario.dataEmpresa.Direccion ? action.usuario.dataEmpresa.Direccion : "",
                Telefono: action.usuario.dataEmpresa.Telefono ? action.usuario.dataEmpresa.Telefono : "",
                Celular: action.usuario.dataEmpresa.Celular ? action.usuario.dataEmpresa.Celular : "",
                Correo: action.usuario.dataEmpresa.Correo ? action.usuario.dataEmpresa.Correo : "",
                RepresentanteLegal: action.usuario.dataEmpresa.RepresentanteLegal ? action.usuario.dataEmpresa.RepresentanteLegal : "",

                TipoIdentificacion: action.usuario.dataEmpresa.RepresentanteLegal ? action.usuario.dataEmpresa.RepresentanteLegal.TipoIdentificacion : "",
                NumeroIdentificacion: action.usuario.dataEmpresa.RepresentanteLegal ? action.usuario.dataEmpresa.RepresentanteLegal.NumeroIdentificacion : "",
                Nombres: action.usuario.dataEmpresa.RepresentanteLegal ? action.usuario.dataEmpresa.RepresentanteLegal.Nombres : "",
                Apellidos: action.usuario.dataEmpresa.RepresentanteLegal ? action.usuario.dataEmpresa.RepresentanteLegal.Apellidos : "",
                TelefonoRepresentante: action.usuario.dataEmpresa.RepresentanteLegal ? action.usuario.dataEmpresa.RepresentanteLegal.Telefono : "",
                CelularRepresentante: action.usuario.dataEmpresa.RepresentanteLegal ? action.usuario.dataEmpresa.RepresentanteLegal.Celular : "",
                CorreoRepresentante: action.usuario.dataEmpresa.RepresentanteLegal ? action.usuario.dataEmpresa.RepresentanteLegal.Correo : "",
            }

        case ERROR_ACTUALIZAR_EMPRESA_AUTENTICADA:
            return {
                ...state,
                registroMensaje: action.mensaje,
                registroError: action.estado,
                estado_alerta_error: action.estadoAlerta,
                mensaje_alerta_error: action.mensaje
            }

        case ACTUALIZANDO_EMPRESA_AUTENTICADA:
            return {
                ...state,
                actualizando_empresa_autenticada: action.estado
            }

        case ALERTA_REGISTRO_ERROR:
            return {
                ...state,
                estado_alerta_error: action.estado,
                mensaje_alerta_error: action.mensaje
            }

        case ALERTA_REGISTRO_SUCCESS:
            return {
                ...state,
                estado_alerta_success: action.estado,
                mensaje_alerta_success: action.mensaje
            }

        default:
            return state;
    }
}

export const estanActualizandoEmpresaAutenticada = state => state.actualizando_empresa_autenticada;
export const errorEnActualizacion = state => state.registroError;
export const obtenerMensajeActualizacion = state => state.registroMensaje;

export const obtenerEstadoAlertaError = state => state.estado_alerta_error;
export const obtenerEstadoAlertaSuccess = state => state.estado_alerta_success;
export const obtenerMensajeAlertaError = state => state.mensaje_alerta_error;
export const obtenerMensajeAlertaSuccess = state => state.mensaje_alerta_success;

export const obtRazonSocial = state => state.RazonSocial;
export const obtNit = state => state.Nit;
export const obtNumeroLicencia = state => state.NumeroLicencia;
export const obtCodigoHabilitacion = state => state.CodigoHabilitacion;
export const obtCodigoSGSSS = state => state.CodigoSGSSS;
export const obtPaginaWeb = state => state.PaginaWeb;
export const obtDepartamento = state => state.Departamento;
export const obtCiudad = state => state.Ciudad;
export const obtDireccion = state => state.Direccion;
export const obtTelefono = state => state.Telefono;
export const obtCelular = state => state.Celular;
export const obtCorreo = state => state.Correo;
export const obtRepresentanteLegal = state => state.RepresentanteLegal;
export const obtTipoIdentificacion = state => state.TipoIdentificacion;
export const obtNumeroIdentificacion = state => state.NumeroIdentificacion;
export const obtNombres = state => state.Nombres;
export const obtApellidos = state => state.Apellidos;
export const obtTelefonoRepresentante = state => state.TelefonoRepresentante;
export const obtCelularRepresentante = state => state.CelularRepresentante;
export const obtCorreoRepresentante = state => state.CorreoRepresentante;

export const obtenerVariables = state => {
    return {
        RazonSocial: state.RazonSocial,
        Nit: state.Nit,
        NumeroLicencia: state.NumeroLicencia,
        CodigoHabilitacion: state.CodigoHabilitacion,
        CodigoSGSSS: state.CodigoSGSSS,
        PaginaWeb: state.PaginaWeb,
        Departamento: state.Departamento,
        Ciudad: state.Ciudad,
        Direccion: state.Direccion,
        Telefono: state.Telefono,
        Celular: state.Celular,
        Correo: state.Correo,
        RepresentanteLegal: state.RepresentanteLegal,

        TipoIdentificacion: state.TipoIdentificacion,
        NumeroIdentificacion: state.NumeroIdentificacion,
        Nombres: state.Nombres,
        Apellidos: state.Apellidos,
        TelefonoRepresentante: state.TelefonoRepresentante,
        CelularRepresentante: state.CelularRepresentante,
        CorreoRepresentante: state.CorreoRepresentante,
    }
}