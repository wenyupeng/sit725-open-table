const mongoose = require("mongoose");
const { roles } = require("../../utils/utils.roles");

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    status: { type: Boolean, required: true, default: 1 },
    role: { type: String, required: true, default: roles.CUSTOMER }, // customer | merchant | admin
    merchant: { type: mongoose.Types.ObjectId, ref: 'Merchants' }
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

module.exports = mongoose.model("User", UserSchema);
