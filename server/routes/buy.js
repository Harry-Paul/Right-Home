const express = require('express');
const router = express.Router();
const buyController = require('../controllers/buyController');
const verifyJWT = require('../middleware/verifyJWT')

router.use(verifyJWT)

router.post('/',buyController.handleBuy);

module.exports=router;