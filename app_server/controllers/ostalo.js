/* Vrni stran s podrobnostmi*/
module.exports.informacije = function(req, res) {
  res.render('index', { title: 'Informacije o aplikaciji' });
};
/* Vrni stran Profile */
module.exports.profil = function(req, res) {
  res.render('profil', { title: 'Prikazi profil' });
};
/* Vrni stran Members */
module.exports.members = function(req, res) {
  res.render('members', { title: 'Prikazi profil' });
};
/* Vrni stran Members */
module.exports.groups = function(req, res) {
  res.render('groups', { title: 'Prikazi profil' });
};
/* Vrni stran Photos */
module.exports.photos = function(req, res) {
  res.render('photos', { title: 'Prikazi profil' });
};
/* Vrni stran Homepage */
module.exports.homepage = function(req, res) {
  res.render('homepage', { title: 'Prikazi profil' });
};
/* Vrni stran Editprofile */
module.exports.editprofile = function(req, res) {
  res.render('editprofile', { title: 'Uredi profil' });
};
/* Vrni stran Editprofile */
module.exports.editprofileRender = function(req, res) {
  res.render('editprofile', { title: 'Sign Up' });
};
/* Vrni stran Sign Up */
module.exports.signupRender = function(req, res) {
  res.render('signup', { title: 'Sign Up' });
};
/* Vrni stran Sign Up */
module.exports.signup = function(req, res) {
  res.render('signup', { title: 'Sign Up' });
};
/* Vrni stran Create New Group */
module.exports.creategroup = function(req, res) {
  res.render('creategroup', { title: 'Create new group' });
};
/* Vrni stran Create New Post */
module.exports.newpost = function(req, res) {
  res.render('index', { title: 'New Post' });
};
/* Vrni stran Homepage */
module.exports.db = function(req, res) {
  res.render('db', { title: 'Prikazi profil' });
};
/* Vrni stran Homepage */
module.exports.addData = function(req, res) {
  res.render('addData', { title: 'Prikazi profil' });
};
module.exports.regComplete = function(req, res) {
  res.render('regComplete', { title: 'Prikazi profil' });
};



/* Vrni stran Comments */
module.exports.comments = function(req, res) { //26 272 lecture udemy
  //res.render('comments', { title: 'Prikazi komentarje' });
  var novKomentar=req.body.vsebinaKomentarja
  res.send("you have reached the post route") 
  res.reload('/comments');
};