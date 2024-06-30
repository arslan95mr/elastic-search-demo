const express = require('express');
const router = express.Router();

const product_r = require('./routes/product_r');

router.use('/products', product_r);

module.exports = router;