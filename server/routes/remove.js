const express = require('express');
const router = express.Router();
const removeController = require('../controllers/removeController');
const verifyJWT = require('../middleware/verifyJWT')

router.use(verifyJWT)

router.post('/',removeController.handleRemove);

module.exports=router;