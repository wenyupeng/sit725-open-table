const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
    phone: {type: String, required: true},
    email: {type: String, required: true},
    activationStatus: {type: String, required: true},
    status: {type: Boolean, required: true, default: 1},
}, {
    timestamps: true,
    versionKey: false,
});

module.exports = mongoose.model('User',UserSchema);
