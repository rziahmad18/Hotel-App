const mongoose = require('mongoose');

//define the MongoDB connection URL
const mongoURL = 'mongodb://localhost:27017/hotels'

//set up MongoDB connection
mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

//Get teh Default connection
//Mongoose maontain a default connection object representing the MongoDb connection
const db = mongoose.connection;

//define event listeners for database conections
db.on('connected', ()=>{
    console.log("connected to Mongodb Server");
});

db.on('error', (err)=>{
    console.log("MongoDb connection error", err);
});

db.on('disconnected', ()=>{
    console.log("Mongodb Disconnected");
});

//Export the DataBase connection
module.exports = db;
