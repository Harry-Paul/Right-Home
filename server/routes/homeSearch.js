const express = require('express');
const router = express.Router();
const homesearchController = require('../controllers/homesearchController');
const verifyJWT = require('../middleware/verifyJWT')

// router.use(verifyJWT)

router.post('/',homesearchController.handleHomesearch);

module.exports=router;