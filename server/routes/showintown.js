const express = require('express');
const router = express.Router();
const showintownController = require('../controllers/showintownController');
const verifyJWT = require('../middleware/verifyJWT')

router.use(verifyJWT)

router.post('/',showintownController.handleShowintown);

module.exports=router;