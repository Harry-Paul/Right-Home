const express = require('express');
const router = express.Router();
const propertyController = require('../controllers/propertyController');
const verifyJWT = require('../middleware/verifyJWT')

// router.use(verifyJWT)

router.post('/',propertyController.handleProperty);

module.exports=router;