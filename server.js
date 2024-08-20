const express = require('express')
const app = express();
const db = require('./db');
const passport = require('./auth');



const bodyParser = require('body-parser')
app.use(bodyParser.json()); //req.body



// Middleware setup
app.use(express.json());

app.use(passport.initialize());

const localAuthMiddleware = passport.authenticate('local', {session: false});



app.get('/',function (req, res) {
  res.send('welcome to our hotel,how can i help you?')
});



//import the router file person
const personRoute = require('./routes/personRoute');
app.use('/person',localAuthMiddleware, personRoute); //use the router file

//import the router menu
const menuItemRoute = require('./routes/menuRoute');
// const passport = require('./auth');
app.use('/menu', menuItemRoute);


app.listen(3000,()=> {
    console.log("server is listening on port 3000")

})