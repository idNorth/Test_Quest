const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

router.get('/users', (req, res) => {
    User.find()
    .exec()
    .then( docs => {
        const response = {
            count: docs.length,
            user: docs.map(doc => {
                return {
                    id: doc.id,
                    name: doc.name,
                    password: doc.password
                }
            })
        };
        res
        .status(200)
        .json(response);
        
    })
    .catch( err => {
        res.status(500).json({
            error: err
        })
    });
})

router.post('/login', (req, res) => {
    User.findOne({name: req.body.name})
    .exec()
    .then( user => {
        if(user) {
            return res.status(409).json({
                message: "Login exist"
            });
        } else {
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if(err){
                    return res.status(500).json({error: err});
                } else {
                    const user = new User({
                        _id: mongoose.Types.ObjectId(),
                        name: req.body.name,
                        password: hash
                    });
                    user
                    .save()
                    .then( result => {
                        res.status(201).json({
                            message: "User created"
                        })
                    })
                    .catch(err => {
                        res.status(500).json({
                            error: err
                        });
                    })
                }
            });    
        }
    })
});

router.post('/singin', (req, res) => {
    User.findOne({name: req.body.name})
    .exec()
    .then( user => {
        if(!user) {
            return res.status(401).json({
                message: 'Auth failed'
            });
        }
        bcrypt.compare(req.body.password, user.password, (err, result) => {
            if(err) {
                return res.status(401).json({
                    message: 'Auth failed'
                });
            }
            if(result) {
                const token = jwt.sign({
                        name: user.name,
                        userId: user._id
                    }, 
                    process.env.JWT_KEY,
                    {
                        expiresIn: "1h"
                    }
                );
                return res.status(200).json({
                    message: 'Auth successful',
                    token: token
                });
            }
            res.status(401).json({
                message: 'Auth failed <password>'
            });
        })
    })
    .catch(err => {
        res.status(500).json({
            error: err
        });
    });
});

router.delete('/:userId', (req, res) => {
    User.deleteOne({_id: req.params.userId})
    .exec()
    .then( result => {
        res.status(200).json({
            message: 'delete user'
        });
    })
    .catch(err => {
        res.status(500).json({
            error: err
        })
    });
})

module.exports = router;