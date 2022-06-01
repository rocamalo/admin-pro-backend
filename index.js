//130493
//rocamalo

const express = require('express'); //imports express
require('dotenv').config(); //enviroment variables
const { dbConnection } = require('./database/config');  //importing dbConnection function to connecto to db mongo
const cors = require('cors'); //imports cots

const app = express(); //creating application

app.use(cors()); //uses cors


//lectura del body
app.use( express.json());

dbConnection(); //starting connection to db

//Directorio publico
app.use( express.static('public'));


//rutas
app.use( '/api/usuarios', require('./routes/usuarios-route'));
app.use( '/api/hospitales', require('./routes/hospitales-route'));
app.use( '/api/medicos', require('./routes/medicos-route'));
app.use( '/api/login', require('./routes/auth-route'));
app.use( '/api/busqueda', require('./routes/busqueda-route'));
app.use( '/api/upload', require('./routes/upload-route'));


app.listen( process.env.PORT, () => { //starting app on port
    console.log("Server running on port" + 3000)
});