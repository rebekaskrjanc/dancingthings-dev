var passport = require('passport');
var mongoose = require('mongoose');
var rp = require('request-promise');
var Uporabnik = mongoose.model('prijavaUser');

var vrniJsonOdgovor = function(odgovor, status, vsebina) {
  odgovor.status(status);
  odgovor.json(vsebina);
};

module.exports.registracija = async function(zahteva, odgovor) {
  console.log("api scenke",zahteva.body);
  if (!zahteva.body.username || !zahteva.body.email || !zahteva.body.password || !zahteva.body.firstname || !zahteva.body.city || !zahteva.body.state || !zahteva.body.dance || !zahteva.body.recaptchaResponse) {
    vrniJsonOdgovor(odgovor, 400, {
      "sporočilo": "Zahtevani so vsi podatki"
    });
    return;
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
     return;
   } else {
     vrniJsonOdgovor(odgovor, 200, {
       "zeton": uporabnik.generirajJwt()
     });
     return;
   }
  });

  await validateRecaptcha(zahteva.body.recaptchaResponse);
  if (!validatedRecaptcha.success) {
    vrniJsonOdgovor(odgovor, 400, {
      "sporočilo": "You might be a robot. Please try again."
    });
    return;
  }

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

async function validateRecaptcha(response) {
  var options = {
    url: 'https://www.google.com/recaptcha/api/siteverify',
    method: 'POST',
    json: true,
    qs: {
      secret: process.env.RECAPTCHA_SECRET,
      response: response
    }
  };
  try {
    return await rp(options).promise();
  } catch (error) {
    return error;
  }
}