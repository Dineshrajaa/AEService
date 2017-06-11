var config = require('./config');
var UserAccount = require('./models/UserAccount.model');

var LocalStrategy = require('passport-local').Strategy;

var helperServices = require('./services/helper.service')
var Passport = require('passport');

// require('./authstrategies/local.auth.strategy.js')(Passport);
//Serialization
Passport.serializeUser(function(user, done) {
  console.log(user);
  done(null, user.Id);
});

Passport.deserializeUser(function(userId, done) {

   new UserAccount({Id: userId}).fetch().then(function(user) {
      done(null, user.toJSON());
   });
});

//Strategies
Passport.use(new LocalStrategy({usernameField:'EmailId'},function(email, password, done) {
/*  console.log(email);
  console.log(password);*/
   new UserAccount({EmailId: email}).fetch().then(function(data) {
      var authInfo = data;
      if(authInfo === null) {
        return done(null, false, {error : true, statusCode : 201});
      } else {
         authInfo = data.toJSON();
         password_plaintext = helperServices.encryption(password,email);
        // console.log(password_plaintext);
        // console.log(authInfo.Password);
         console.log(helperServices.decrypt(authInfo.Password,email)); 
         if(password_plaintext!= authInfo.Password) {
            return done(null, false, {error : true, statusCode : 202});
         } else {
            return done(null, authInfo);
         }
      }
   });
}));

module.exports = Passport;
