const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: "String",
        unique: true,
        require: true
    },
    password: {
        type: "String",
        require: true
    }
});

module.exports = mongoose.model('User', userSchema);