import { URL } from '../config/conexionServer';
import Autenticacion from '../Autenticacion';

export const buscarDatosSistema = async () => {

    let respuesta = {
        mensaje: "",
        error: null,
        token: null,
        data: null
    };

    try {
        const resultado = await fetch(URL + '/datoSistema', {
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
            respuesta.data = resultadoJson.data;
        }
    } catch (error) {
        console.log(error)
        respuesta.error = true;
        respuesta.mensaje = error.message;
    }

    return respuesta;
}