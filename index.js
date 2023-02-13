/* CONFIGURACIÓN DE EXPRESS */

/* Importar express */
const express = require('express'); // import express from 'express'
/* Configurar variables de entorno */
require('dotenv').config();
/* Importar corse */
const cors = require('cors');
/* Importar la conexion de la DB */
const { dbConnection } = require('./database/config');

/* Crear el servidor de express */
const app = express();

/* Base de datos */
dbConnection();

/* Cors */
app.use(cors());

/* Middlewares */
/* funciones que se ejecutan cuando se hace una petición al servidor ('use' es un middleware ) */

// Directorio Público
app.use(express.static('public'));

// Lectura y parseo del body
app.use(express.json()); // Las peticiones que vengan en JSON las procesa y extrae el contenido

// RUTAS
// auth: crear, login, renew
app.use('/api/auth', require('./routes/auth')); // exporta lo del require y lo habilita en la ruta

// crud: eventos
app.use('/api/events', require('./routes/events'));

/* Escuchar peticiones */
app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${process.env.PORT}`)
});