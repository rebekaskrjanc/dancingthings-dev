var express = require('express');
var router = express.Router();
var ctrlLokacije = require('../controllers/lokacije');
var ctrlOstalo = require('../controllers/ostalo');
var ctrlSignup = require('../controllers/signup');
var ctrlMyProfile = require('../controllers/my-profile');
var ctrlEditprofile = require('../controllers/editprofile');
var ctrlNewPost = require('../controllers/newpost');
var ctrlGroupActions = require('../controllers/groups');


/* GET home page. */
/* Lokacijske strani */
router.get('/', ctrlLokacije.seznam);
router.get('/lokacija', ctrlLokacije.podrobnostiLokacije);
router.get('/lokacija/komentar/nov', ctrlLokacije.dodajKomentar);


/* Ostale strani */
router.get('/informacije', ctrlOstalo.informacije);
//router.get('/profil', ctrlOstalo.profil);
router.get('/members', ctrlOstalo.members);
router.get('/groups', ctrlOstalo.groups);
router.get('/photos', ctrlOstalo.photos);
router.get('/homepage', ctrlOstalo.homepage);
router.post('/comments', ctrlOstalo.comments);
//router.get('/editprofile', ctrlOstalo.editprofile);
router.get('/signup', ctrlOstalo.signupRender);
router.post('/signup', ctrlSignup.signup);
router.get('/creategroup', ctrlOstalo.creategroup)

router.post('/newpost', ctrlNewPost.newpost);

// My profile routes
router.get('/myprofile/:userId', ctrlMyProfile.showMyProfile);
router.get('/myprofile/:userId/edit', ctrlMyProfile.showEditProfile);
router.put('/myprofile/:userId/edit', ctrlMyProfile.editProfile);

//Group Actions
router.post('/newgroup', ctrlGroupActions.newgroup);


module.exports = router;

