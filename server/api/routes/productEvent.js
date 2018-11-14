const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const checkAuth = require('../middleware/check-auth');

const Product = require('../models/products');

router.post('/new', checkAuth, (req, res) => {
    const product = new Product ({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price,
        description: req.body.description
    });
    product
    .save()
    .then( result => {
        res.status(201).json({
            message: 'Created product succesfully'
        });
    })
    .catch(err => {
        res.status(500).json({error: err});
    });
});

router.get('/:productId', (req, res) => {
    const id = req.params.productId
    Product.findById({_id: id})
        .exec()
        .then( result => {
            res.status(200).json(result);
        })
        .catch( err => {
            console.log(err);
            res.status(500).json({error: err});
        });
});

router.delete('/:productId', (req, res) => {
    Product.deleteOne({_id: req.params.productId})
    .exec()
    .then( result => {
        res.status(200).json(result);
    })
    .catch(err => {
        res.status(500).json({error: err});
    });
})

module.exports = router;