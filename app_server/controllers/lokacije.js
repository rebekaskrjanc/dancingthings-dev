/* Vrni začetno stran s seznamom lokacij */
module.exports.seznam = function(req, res) {
  res.render('lokacije-seznam', { title: 'Seznam lokacij' });
};

/* Vrni podrobnosti lokacije */
module.exports.podrobnostiLokacije = function(req, res) {
  res.render('index', { title: 'Podrobnosti lokacije' });
};

/* Vrni stran za dodajanje komentarjev */
module.exports.dodajKomentar = function(req, res) {
  res.render('index', { title: 'Dodaj komentar' });
};

/* Vrni stran Profile */
module.exports.profil = function(req, res) {
  res.render('profil', { title: 'Prikazi profil' });
};