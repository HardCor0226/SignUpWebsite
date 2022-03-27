'use strict'

const mongoose = require("mongoose"),
    userSchema = mongoose.Schema({
        name: {
            type: String,
            required: true
        },
        gender: {
            type: String,
            required: true
        }
    });

//module.exports = mongoose.model("User", userSchema);
module.exports = mongoose.models.User || mongoose.model('User', userSchema);