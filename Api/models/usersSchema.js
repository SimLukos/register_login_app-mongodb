const mongoose = require("mongoose");

const usersSchema = mongoose.Schema({
  email: { type: String, require: true },
  password: { type: String, require: true },
  reg_timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("User", usersSchema);
