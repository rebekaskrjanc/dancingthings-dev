var mongoose = require('mongoose');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

var prijavaUserShema = new mongoose.Schema({
  email: {type: String, unique: true, required: true},
  username: {type: String, required: true},
  firstname: {type: String, required: true},
  dance: {type: String, required: true},

  zgoscenaVrednost: String,
  nakljucnaVrednost: String
});

prijavaUserShema.methods.nastaviGeslo = function(geslo) {
  this.nakljucnaVrednost = crypto.randomBytes(16).toString('hex');
  this.zgoscenaVrednost = crypto.pbkdf2Sync(geslo, this.nakljucnaVrednost, 1000, 64, 'sha512').toString('hex');
};

prijavaUserShema.methods.preveriGeslo = function(geslo) {
  var zgoscenaVrednost = crypto.pbkdf2Sync(geslo, this.nakljucnaVrednost, 1000, 64, 'sha512').toString('hex');
  return this.zgoscenaVrednost == zgoscenaVrednost;
};

prijavaUserShema.methods.generirajJwt = function() {
  var datumPoteka = new Date();
  datumPoteka.setDate(datumPoteka.getDate() + 7);
  
  return jwt.sign({
    _id: this._id,
    email: this.email,
    username: this.username,
    dance: this.dance,
    firstname: this.firstname,
    datumPoteka: parseInt(datumPoteka.getTime() / 1000, 10)
  }, process.env.JWT_GESLO);
};

mongoose.model('prijavaUser', prijavaUserShema, 'prijavaUsers');