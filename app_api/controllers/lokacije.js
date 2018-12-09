var mongoose = require('mongoose');
var Lokacija = mongoose.model('Lokacija');

var vrniJsonOdgovor = function(odgovor, status, vsebina) {
  odgovor.status(status);
  odgovor.json(vsebina);
};

module.exports.lokacijeSeznamPoRazdalji = function(zahteva, odgovor) {
  vrniJsonOdgovor(odgovor, 200, {"status": "uspešno"});
};

module.exports.lokacijeKreiraj = function(zahteva, odgovor) {
  vrniJsonOdgovor(odgovor, 200, {"status": "uspešno"});
};

module.exports.lokacijePreberiIzbrano = function(zahteva, odgovor) {
  vrniJsonOdgovor(odgovor, 200, {"status": "uspešno"});
};

module.exports.lokacijePosodobiIzbrano = function(zahteva, odgovor) {
  vrniJsonOdgovor(odgovor, 200, {"status": "uspešno"});
};

module.exports.lokacijeIzbrisiIzbrano = function(zahteva, odgovor) {
  vrniJsonOdgovor(odgovor, 200, {"status": "uspešno"});
};