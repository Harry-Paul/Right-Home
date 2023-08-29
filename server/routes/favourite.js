const express = require('express');
const router = express.Router();
const favController = require('../controllers/favController');
const verifyJWT = require('../middleware/verifyJWT')

router.use(verifyJWT)

router.post('/',favController.handleFavourite);

module.exports=router;