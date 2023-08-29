const express = require('express');
const router = express.Router();
const intController = require('../controllers/intController');
const verifyJWT = require('../middleware/verifyJWT')

router.use(verifyJWT)

router.post('/',intController.handleInterested);

module.exports=router;