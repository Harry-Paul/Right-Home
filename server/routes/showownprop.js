const express = require('express');
const router = express.Router();
const showownpropController = require('../controllers/showownpropController');
const verifyJWT = require('../middleware/verifyJWT')

router.use(verifyJWT)

router.post('/',showownpropController.handleShowownprop);

module.exports=router;