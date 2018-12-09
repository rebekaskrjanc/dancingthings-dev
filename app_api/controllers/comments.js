var mongoose = require('mongoose');
var Lokacija = mongoose.model('User');

var vrniJsonOdgovor = function(odgovor, status, vsebina) {
  odgovor.status(status);
  odgovor.json(vsebina);
};