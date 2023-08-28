const express = require('express');
const router = express.Router();
const rootController = require('../controllers/rootController');

router.post('/',rootController.handleRoot);

module.exports=router;