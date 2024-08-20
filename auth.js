// sets up Passport with a local authentication strategy, using a Person model for user data. - Auth.js file
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const Person = require('./models/person');

passport.use(new localStrategy(async (username,password,done) => {
    try{
        // console.log('Recived credentials:', username, password);
        const user = await Person.findOne({username});
        if(!user)
            return done(null, false, {message:"Incorrect username"});

        const isPasswordMatch = user.password === password ? true: false;
        if(isPasswordMatch)
            return done(null, user);
        else
            return done(null, false, {message: "Incorrect Password"})
    } catch(error){
        return done(error);
    }
}));

module.exports = passport;  