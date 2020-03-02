import { URL } from '../config/conexionServer';
import Autenticacion from '../Autenticacion';
import { buscarDatosSistema } from './Sistema';
const Api = {};

const variableDuplicada = error => {
    let variableDuplicada = error.split('key:')[1];
    return `Error ya existe un usuario con el parametro ${variableDuplicada}`;
}

//Para los datos utilizados en selects del aplicativo
Api.buscarDatosSistema = async () => buscarDatosSistema;

Api.iniciarSesion = async (Correo, Contraseña) => {

    let respuesta = {
        mensaje: "",
        error: null,
        token: null,
        usuario: null
    };
    try {
        const resultado = await fetch(URL + '/login', {
            method: 'POST',
            body: JSON.stringify({ Correo, Contraseña }),
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                'Accept': 'application/json'
            }
        });

        const resultadoJson = await resultado.json();

        if (resultadoJson.error) {
            console.log(resultadoJson.error)
            respuesta.error = true;
            respuesta.mensaje = resultadoJson.error;
        } else {
            respuesta.error = false;
            respuesta.token = resultadoJson.data.token;
            respuesta.usuario = resultadoJson.data.usuario;
        }
    } catch (error) {
        respuesta.error = true;
        respuesta.mensaje = error.message;
    }


    return respuesta;
}

Api.cerrarSesion = async () => {
    console.log("aaaa")
}

Api.obtenerUsuario = async () => {

    let respuesta = {
        mensaje: "",
        error: null,
        token: null,
        usuario: null
    };

    try {
        const resultado = await fetch(URL + '/sesion', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + Autenticacion.obtenerToken().Token,
                'Content-Type': 'application/json; charset=UTF-8',
                'Accept': 'application/json',
            }
        });

        const resultadoJson = await resultado.json();

        if (resultadoJson.error) {
            respuesta.error = true;
            respuesta.mensaje = resultadoJson.mensaje ? resultadoJson.mensaje : resultadoJson.error;
        } else {
            respuesta.error = false;
            respuesta.usuario = resultadoJson.usuario;
        }
    } catch (error) {
        console.log(error)
        respuesta.error = true;
        respuesta.mensaje = error.message;
    }

    return respuesta;
}

Api.crearUsuario = async (datosEmpresa, datosUsuario, datosAutenticacion) => {
    let respuesta = {
        mensaje: "",
        error: null,
        usuario: null
    };

    try {
        const resultado = await fetch(URL + '/ips_eps', {
            method: 'POST',
            body: JSON.stringify({datosEmpresa, datosUsuario, datosAutenticacion}),
            headers: {
                'Authorization': 'Bearer ' + Autenticacion.obtenerToken().Token,
                'Content-Type': 'application/json; charset=UTF-8',
                'Accept': 'application/json',
            }
        });

        const resultadoJson = await resultado.json();
        
        if (resultadoJson.error) {
            respuesta.error = true;
            if (resultadoJson.mensajeError && resultadoJson.codigoError) {
                if(resultadoJson.codigoError === 11000){
                    respuesta.mensaje = "Ya existe un usuario con los datos enviados";
                }else{
                    respuesta.mensaje = resultadoJson.mensajeError;
                }
            } else if(resultadoJson.status){
                respuesta.mensaje = resultadoJson.status;
            } else {
                respuesta.mensaje = resultadoJson.mensaje ? resultadoJson.mensaje : resultadoJson.error;
            }

        } else {
            respuesta.error = false;
            respuesta.usuario = {
                dataAuth: resultadoJson.dataAuth,
                dataUsuario: resultadoJson.dataUsuario,
                dataEmpresa: resultadoJson.dataEmpresa,
            };
        }
    } catch (error) {
        console.log(error)
        respuesta.error = true;
        respuesta.mensaje = error.message;
    }

    return respuesta;
}

Api.actualizarUsuario = async (actualizacionEmpresa, actualizacionUsuario, actualizacionAutenticacion, _idEmpresa, _idUsuario, _idAutenticacion) => {
    
    let respuesta = {
        mensaje: "",
        error: null,
        usuario: null
    };

    try {
        const resultado = await fetch(URL + '/ips_eps', {
            method: 'PUT',
            body: JSON.stringify({actualizacionEmpresa, actualizacionUsuario, actualizacionAutenticacion, _idEmpresa, _idUsuario, _idAutenticacion}),
            headers: {
                'Authorization': 'Bearer ' + Autenticacion.obtenerToken().Token,
                'Content-Type': 'application/json; charset=UTF-8',
                'Accept': 'application/json',
            }
        });

        const resultadoJson = await resultado.json();
        console.log(resultadoJson)
        if (resultadoJson.error) {
            respuesta.error = true;
            if(resultadoJson.codigoError === 11000){
                respuesta.mensaje = variableDuplicada(resultadoJson.mensajeError);
            }else if (resultadoJson.mensajeError) {
                respuesta.mensaje = resultadoJson.mensajeError;
            } else if(resultadoJson.status){
                respuesta.mensaje = resultadoJson.status;
            } else {
                respuesta.mensaje = resultadoJson.mensaje ? resultadoJson.mensaje : resultadoJson.error;
            }

        } else {
            respuesta.error = false;
            respuesta.usuario = {
                dataAuth: resultadoJson.dataAuth,
                dataUsuario: resultadoJson.dataUsuario,
                dataEmpresa: resultadoJson.dataEmpresa,
            };
        }
    } catch (error) {
        console.log(error)
        respuesta.error = true;
        respuesta.mensaje = error.message;
    }

    return respuesta;
}

Api.eliminarUsuario = async (nit) => {
    let respuesta = {
        mensaje: "",
        error: null,
        usuario: null
    };

    try {
        const resultado = await fetch(URL + '/ips_eps/' + nit, {
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer ' + Autenticacion.obtenerToken().Token,
                'Content-Type': 'application/json; charset=UTF-8',
                'Accept': 'application/json',
            }
        });

        const resultadoJson = await resultado.json();
        console.log(resultadoJson)
        if (resultadoJson.error) {
            respuesta.error = true;
            if (resultadoJson.mensajeError) {
                respuesta.mensaje = resultadoJson.mensajeError;
            } else if(resultadoJson.status){
                respuesta.mensaje = resultadoJson.status;
            } else {
                respuesta.mensaje = resultadoJson.mensaje ? resultadoJson.mensaje : resultadoJson.error;
            }

        } else {
            respuesta.error = false;
            respuesta.usuario = resultadoJson.data;
        }
    } catch (error) {
        console.log(error)
        respuesta.error = true;
        respuesta.mensaje = error.message;
    }

    return respuesta;
}

Api.listarUsuarios = async (id_empresa) => {

    let respuesta = {
        mensaje: "",
        error: null,
        token: null,
        usuarios: null
    };

    try {
        const resultado = await fetch(URL + '/eps/' + id_empresa, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + Autenticacion.obtenerToken().Token,
                'Content-Type': 'application/json; charset=UTF-8',
                'Accept': 'application/json',
            }
        });

        const resultadoJson = await resultado.json();

        if (resultadoJson.error) {
            respuesta.error = true;
            if (resultadoJson.status) {
                respuesta.mensaje = resultadoJson.status;
            } else {
                respuesta.mensaje = resultadoJson.mensaje ? resultadoJson.mensaje : resultadoJson.error;
            }

        } else {
            respuesta.error = false;
            respuesta.usuarios = resultadoJson.listadoEps;
        }
    } catch (error) {
        console.log(error)
        respuesta.error = true;
        respuesta.mensaje = error.message;
    }

    return respuesta;
}

Api.buscartipos_identificacion = async () => {

    let respuesta = {
        mensaje: "",
        error: null,
        tipos_identificacion: []
    };

    try {
        const resultado = await fetch(URL + '/tipoDocumento', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + Autenticacion.obtenerToken().Token,
                'Content-Type': 'application/json; charset=UTF-8',
                'Accept': 'application/json',
            }
        });

        const resultadoJson = await resultado.json();

        if (resultadoJson.error) {
            respuesta.error = true;
            if (resultadoJson.status) {
                respuesta.mensaje = resultadoJson.status;
            } else {
                respuesta.mensaje = resultadoJson.mensaje ? resultadoJson.mensaje : resultadoJson.error;
            }

        } else {
            respuesta.error = false;
            respuesta.tipos_identificacion = resultadoJson.data;
        }
    } catch (error) {
        console.log(error)
        respuesta.error = true;
        respuesta.mensaje = error.message;
    }

    return respuesta;
}

Api.buscarTipos_rol = async () => {

    let respuesta = {
        mensaje: "",
        error: null,
        tipos_rol: []
    };

    try {
        const resultado = await fetch(URL + '/rol', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + Autenticacion.obtenerToken().Token,
                'Content-Type': 'application/json; charset=UTF-8',
                'Accept': 'application/json',
            }
        });

        const resultadoJson = await resultado.json();

        if (resultadoJson.error) {
            respuesta.error = true;
            if (resultadoJson.status) {
                respuesta.mensaje = resultadoJson.status;
            } else {
                respuesta.mensaje = resultadoJson.mensaje ? resultadoJson.mensaje : resultadoJson.error;
            }

        } else {
            respuesta.error = false;
            respuesta.tipos_rol = resultadoJson.data;
        }
    } catch (error) {
        console.log(error)
        respuesta.error = true;
        respuesta.mensaje = error.message;
    }

    return respuesta;
}

export default Api;