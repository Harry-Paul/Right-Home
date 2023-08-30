const express = require('express');
const router = express.Router();
const showintController = require('../controllers/showintController');
const verifyJWT = require('../middleware/verifyJWT')

router.use(verifyJWT)

router.post('/',showintController.handleShowint);

module.exports=router;