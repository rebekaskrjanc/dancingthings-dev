var passport = require('passport');
var mongoose = require('mongoose');
var Uporabnik = mongoose.model('prijavaUser');

var vrniJsonOdgovor = function(odgovor, status, vsebina) {
  odgovor.status(status);
  odgovor.json(vsebina);
};

module.exports.registracija = function(zahteva, odgovor) {
  if (!zahteva.body.username || !zahteva.body.email || !zahteva.body.password || !zahteva.body.firstname || !zahteva.body.city || !zahteva.body.state || !zahteva.body.dance) {
    vrniJsonOdgovor(odgovor, 400, {
      "sporočilo": "Zahtevani so vsi podatki"
    });
  }
  var uporabnik = new Uporabnik();
  uporabnik.username = zahteva.body.username;
  uporabnik.email = zahteva.body.email;
  uporabnik.firstname=zahteva.body.firstname;
  uporabnik.city=zahteva.body.city;
  uporabnik.state=zahteva.body.state;
  uporabnik.dance=zahteva.body.dance;
  uporabnik.nastaviGeslo(zahteva.body.password);
  uporabnik.save(function(napaka) {
   if (napaka) {
     vrniJsonOdgovor(odgovor, 500, napaka);
   } else {
     vrniJsonOdgovor(odgovor, 200, {
       "zeton": uporabnik.generirajJwt()
     });
   }
  });
};

module.exports.prijava = function(zahteva, odgovor) {
  if (!zahteva.body.email || !zahteva.body.password) {
    vrniJsonOdgovor(odgovor, 400, {
      "sporočilo": "Zahtevani so vsi podatki"
    });
  }
  passport.authenticate('local', function(napaka, uporabnik, podatki) {
    if (napaka) {
      vrniJsonOdgovor(odgovor, 404, napaka);
      return;
    }
    if (uporabnik) {
      vrniJsonOdgovor(odgovor, 200, {
        "zeton": uporabnik.generirajJwt()
      });
    } else {
      vrniJsonOdgovor(odgovor, 401, podatki);
    }
  })(zahteva, odgovor);
};