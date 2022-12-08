const mongoose = require("mongoose");

const tutorialSchema = mongoose.Schema({
  user_id: { type: String, require: true },
  title: { type: String, require: true },
  content: { type: String, require: true },
  private: { type: Boolean },
});

module.exports = mongoose.model("Tutorial", tutorialSchema);
