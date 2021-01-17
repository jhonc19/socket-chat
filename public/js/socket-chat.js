let socket = io();

let params = new URLSearchParams(window.location.search);

if (!params.has('nombre') || !params.has('sala')) {
    window.location = 'index.html';
    throw new Error('El nombre y sala son necesarios');
};

$('#title').text(`Sala de mensaje ${params.get('sala')}`);

let usuario = {
    nombre: params.get('nombre'),
    sala: params.get('sala')
};

socket.on('connect', function() {
    console.log('Conectado al servidor');

    socket.emit('entrarChat', usuario, (res) => {
        console.log('Usuarios conectados');
        console.log(res);
    });
});

// escuchar
socket.on('disconnect', function() {
    console.log('Perdimos conexión con el servidor');
});

socket.on('listaPersona', (data) => {
    console.log(data);
});

// Escuchar información
socket.on('crearMensaje', (mensaje) => {
    console.log('Servicor:', mensaje);
});

// Mensajes privados
socket.on('mensajePrivado', (mensaje) => {
    console.log('Mensaje Privado: ', mensaje);
});