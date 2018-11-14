const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const getAllProductsRoutes = require('./routes/getAllProducts');
const productEventRoutes = require('./routes/productEvent');
const userRoutes = require('./routes/user')

mongoose.Promise = global.Promise;

mongoose.connect(
    "mongodb://admin:" + 
    process.env.MONGO_ATLAS_PW + 
    "@testproject-shard-00-00-md68c.mongodb.net:27017,testproject-shard-00-01-md68c.mongodb.net:27017,testproject-shard-00-02-md68c.mongodb.net:27017/test?ssl=true&replicaSet=TestProject-shard-0&authSource=admin&retryWrites=true",
    { 
        useNewUrlParser: true 
    }
);

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

/* routes */
app.use('/products', getAllProductsRoutes);
app.use('/product', productEventRoutes);
app.use('/', userRoutes);

app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res) => {
    res.status( error.status || 500 );
    res.json ({
        error: {
            message: error.message
        }
    });
});

module.exports = app;