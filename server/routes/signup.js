const express = require('express');
const router = express.Router();
const registerController = require('../controllers/registerController');
console.log("wdwiuh")

router.post('/',registerController.handleSignup);

module.exports=router;