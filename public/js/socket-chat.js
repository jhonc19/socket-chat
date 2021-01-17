let socket = io();

let params = new URLSearchParams(window.location.search);

if (!params.has('nombre') || !params.has('sala')) {
    window.location = 'index.html';
    throw new Error('El nombre y sala son necesarios');
};

let usuario = {
    nombre: params.get('nombre'),
    sala: params.get('sala')
};

socket.on('connect', function() {
    console.log('Conectado al servidor');

    socket.emit('entrarChat', usuario, (res) => {
        renderizarUsuarios(res);
        console.log(res);
    });
});

// escuchar
socket.on('disconnect', function() {
    console.log('Perdimos conexión con el servidor');
});

socket.on('listaPersona', (data) => {
    renderizarUsuarios(data);
});

// Escuchar información
socket.on('crearMensaje', (mensaje) => {
    renderizarMensajes(mensaje, false);
    scrollBottom();
});

// Mensajes privados
socket.on('mensajePrivado', (mensaje) => {
    console.log('Mensaje Privado: ', mensaje);
});