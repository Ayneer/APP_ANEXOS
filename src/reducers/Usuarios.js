import { CARGAR_USUARIOS, ERROR_CARGAR_USUARIOS, USUARIO_ELIMINADO, ERROR_ELIMINAR_USUARIO, ELIMINANDO_USUARIO, ELIMINANDO_USUARIO_ALERTA, ELIMINAR_USUARIO, AGREGAR_USUARIO, ACTUALIZAR_USUARIO } from '../config/variables';

const initState = {
    usuarios: [],
    cargandoUsuarios: true,
    errorCargarUsuario: false,
    mensajeError: null,
    eliminarMensajeError: null,
    errorEliminarUsuario: false,
    usuarioEliminado: false,
    eliminandoUsuario: false,
    mensajeExitoEliminar: "",
    usuariosCargados: false
}

const usuario = (state = initState, action) => {
    switch (action.type) {

        case CARGAR_USUARIOS:
            return {
                ...state,
                usuarios: action.usuarios,
                cargandoUsuarios: false,
                usuariosCargados: true
            }

        case ERROR_CARGAR_USUARIOS:
            return {
                ...state,
                errorCargarUsuario: action.estado,
                cargandoUsuarios: false,
                mensajeError: action.mensaje,
            }
        case ERROR_ELIMINAR_USUARIO:
            return {
                ...state,
                errorEliminarUsuario: true,
                eliminarMensajeError: action.mensaje,
            }

        case USUARIO_ELIMINADO:
            return {
                ...state,
                errorEliminarUsuario: false,
                eliminarMensajeError: "",
                usuarioEliminado: action.estado,
                mensajeExitoEliminar: action.mensaje
            }

        case ELIMINANDO_USUARIO:
            return {
                ...state,
                eliminandoUsuario: action.estado
            }

        case ELIMINANDO_USUARIO_ALERTA:
            return {
                ...state,
                errorEliminarUsuario: action.estado,
                eliminarMensajeError: action.mensaje,
            }

        case ELIMINAR_USUARIO:
            let usuarios = state.usuarios.filter((user) => user.identificacion !== action.identificacion);
            return {
                ...state,
                usuarios
            }

        case AGREGAR_USUARIO: {
            let usuarios = state.usuarios;
            usuarios.push(action.usuario)
            return {
                ...state,
                ...usuarios
            }
        }

        case ACTUALIZAR_USUARIO: {
            let usuario = action.usuario;
            let usuarios = state.usuarios;
            for (let index = 0; index < usuarios.length; index++) {
                let {identificacion} = usuarios[index];
                if(identificacion === usuario.identificacion){
                    usuarios[index] = usuario;
                    break;
                }
            }
            return {
                ...state,
                usuarios
            }
        }
        
        default:
            return state;
    }
}

export default usuario;