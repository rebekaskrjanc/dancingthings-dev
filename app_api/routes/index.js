var express = require('express');
var router = express.Router();
var ctrlLokacije = require('../controllers/lokacije');
var ctrlKomentarji = require('../controllers/komentarji');

/* Lokacije */
router.get('/lokacije', 
  ctrlLokacije.lokacijeSeznamPoRazdalji);
router.post('/lokacije', 
  ctrlLokacije.lokacijeKreiraj);
router.get('/lokacije/:idLokacije', 
  ctrlLokacije.lokacijePreberiIzbrano);
router.put('/lokacije/:idLokacije', 
  ctrlLokacije.lokacijePosodobiIzbrano);
router.delete('/lokacije/:idLokacije', 
  ctrlLokacije.lokacijeIzbrisiIzbrano);

/* Komentarji */
router.post('/lokacije/:idLokacije/komentarji', 
  ctrlKomentarji.komentarjiKreiraj);
router.get('/lokacije/:idLokacije/komentarji/:idKomentarja', 
  ctrlKomentarji.komentarjiPreberiIzbranega);
router.put('/lokacije/:idLokacije/komentarji/:idKomentarja', 
  ctrlKomentarji.komentarjiPosodobiIzbranega);
router.delete('/lokacije/:idLokacije/komentarji/:idKomentarja', 
  ctrlKomentarji.komentarjiIzbrisiIzbranega);

module.exports = router;