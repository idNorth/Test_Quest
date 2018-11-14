const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

const Product = require('../models/products');

router.get('/', (req, res) => {
    Product.find()
        .exec()
        .then( docs => {
            res.status(200).json(docs);
        })
        .catch( err => {
            console.log(err);
            res.status(500).json({error: err});
        });
});

module.exports = router;