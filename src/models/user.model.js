const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    mobileNumber: { type: String },
    role: { type: String, required: true, default: 'customer' }, // customer | merchant | admin
    merchantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Merchant'}
}, {
    timestamps: true
});

module.exports = mongoose.model("User", userSchema);
