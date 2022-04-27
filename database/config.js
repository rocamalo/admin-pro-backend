const mongoose = require('mongoose');
require('dotenv').config(); //enviroment variables



const dbConnection = async () => {

    try {
        await mongoose.connect(process.env.DB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }); 

        console.log("DB ONLINE");
    } catch (error) {
        console.log(error);
        throw new Error("Error connecting to db");
    }

    
}

module.exports = {
    dbConnection
}