const express = require('express');
const router = express.Router();
const sellmapController = require('../controllers/sellmapController');
const verifyJWT = require('../middleware/verifyJWT')

router.use(verifyJWT)

router.post('/',sellmapController.handleSellmap);

module.exports=router;