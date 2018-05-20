var express = require('express');
var router = express.Router();
var path = require('path');

// send index.html to start client side
router.get('/', (req, res) => res.sendFile('index.html', { root: path.join(__dirname, '../../public/')}));

module.exports = router;
