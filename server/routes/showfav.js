const express = require('express');
const router = express.Router();
const showfavController = require('../controllers/showfavController');
const verifyJWT = require('../middleware/verifyJWT')

router.use(verifyJWT)

router.post('/',showfavController.handleShowfav);

module.exports=router;