const express = require('express');
const controller = require('./../controllers/product_c');
const { createOne, updateOne, deleteOne, getList } = controller;
const router = express.Router();

router.post('/create', createOne);
router.put('/update/:id', updateOne);
router.delete('/delete/:id', deleteOne);
router.get('/', getList);
// router.get('/search', search);

module.exports = router;