const express = require('express');
const router = express.Router();
const sellController = require('../controllers/sellController');
const verifyJWT = require('../middleware/verifyJWT')

router.use(verifyJWT)

router.post('/',sellController.handleSell);

module.exports=router;