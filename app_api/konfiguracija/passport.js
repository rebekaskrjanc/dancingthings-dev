var passport = require('passport');
var LokalnaStrategija = require('passport-local').Strategy;
var mongoose = require('mongoose');
var Uporabnik = mongoose.model('prijavaUser');

passport.use(new LokalnaStrategija({
    usernameField: 'email',
    passwordField: 'password'
  }, 
  function(uporabniskoIme, password, koncano) {
    Uporabnik.findOne(
      {
        email: uporabniskoIme
      },
      function(napaka, uporabnik) {
        if (napaka)
          return koncano(napaka);
        if (!uporabnik) {
          return koncano(null, false, {
            sporocilo: 'Napačno uporabniško ime'
          });
        }
        if (!uporabnik.preveriGeslo(password)) {
          return koncano(null, false, {
            sporocilo: 'Napačno geslo'
          });
        }
        return koncano(null, uporabnik);
      }
    );
  }
));