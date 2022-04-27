//130493
//rocamalo

const express = require('express'); //imports express
require('dotenv').config(); //enviroment variables
const { dbConnection } = require('./database/config');  //importing dbConnection function to connecto to db mongo
const cors = require('cors'); //imports cots

const app = express(); //creating application

app.use(cors()); //uses cors

dbConnection(); //starting connection to db



//rutas
app.get( '/', (req, res) => {
    res.status(400).json({
        ok: true,
        msg: 'Hola mundo'
    })

});


app.listen( process.env.PORT, () => { //starting app on port
    console.log("Server running on port" + 3000)
} )