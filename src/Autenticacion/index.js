let Autenticacion = {};

Autenticacion.guardarToken = (Token) => {
    localStorage.setItem('session', JSON.stringify({Token}));
}

Autenticacion.eliminarToken = () => {
    localStorage.removeItem('session');
    localStorage.clear();
}

Autenticacion.obtenerToken = () => {
    if(localStorage.getItem('session')){
        return JSON.parse(localStorage.getItem('session'));
    }else{
        return null;
    }
}

export default Autenticacion;