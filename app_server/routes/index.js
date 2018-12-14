var express = require('express');
var router = express.Router();
var ctrlLokacije = require('../controllers/lokacije');
var ctrlOstalo = require('../controllers/ostalo');
var ctrlSignup = require('../controllers/signup');
var ctrlMyProfile = require('../controllers/my-profile');
var ctrlEditprofile = require('../controllers/editprofile');
var ctrlNewPost = require('../controllers/newpost');
var ctrlGroupActions = require('../controllers/groups');
<<<<<<< HEAD
var ctrlIndexPage = require('../controllers/indexPage');
=======
var ctrldeleteDB = require('../controllers/deleteDB');

/* GET home page. */
/* Lokacijske strani */
router.get('/', ctrlLokacije.seznam);
router.get('/lokacija', ctrlLokacije.podrobnostiLokacije);
router.get('/lokacija/komentar/nov', ctrlLokacije.dodajKomentar);

>>>>>>> b4059b0f28d6b11fe3121e803be7d8d0e1a173ac

/* Ostale strani */
router.get('/informacije', ctrlOstalo.informacije);
//router.get('/profil', ctrlOstalo.profil);
router.get('/members', ctrlOstalo.members);
router.get('/groups', ctrlOstalo.groups);
router.get('/photos', ctrlOstalo.photos);
router.get('/homepage', ctrlOstalo.homepage);
//router.post('/comments', ctrlOstalo.comments);
//router.get('/editprofile', ctrlOstalo.editprofile);
router.get('/signup', ctrlOstalo.signupRender);
router.post('/signup', ctrlSignup.signup);
//router.post('/addUserDB', ctrlSignup.addUserDB);
router.get('/creategroup', ctrlOstalo.creategroup);
router.get('/db', ctrlOstalo.db);
router.get('/addData', ctrlOstalo.addData);
router.get('/regComplete', ctrlOstalo.regComplete);

/* Index page routes. */
router.get('/', ctrlIndexPage.getIndexPage);

// Post routes
router.post('/newpost/:userId', ctrlNewPost.newpost);

// My profile routes
router.get('/myprofile/:userId', ctrlMyProfile.showMyProfile);
router.get('/myprofile/:userId/edit', ctrlMyProfile.showEditProfile);
router.post('/myprofile/:userId/edit', ctrlMyProfile.editProfile);
router.get('/myprofile/:userId/deleteUser', ctrlMyProfile.deleteUserReq);


//Group routes
router.post('/newgroup', ctrlGroupActions.newgroup);

<<<<<<< HEAD
//COMMENT routes
//router.post('/comment/:postId/addcomment/:commentAuthor', ctrlIndexPage.addComment);
=======
//Delete DB routes
router.get('/deleteUserDB', ctrldeleteDB.deleteUserDB);


>>>>>>> b4059b0f28d6b11fe3121e803be7d8d0e1a173ac

module.exports = router;

