const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const keyvalueSchema = new Schema({
  key: {
    type: String,
    unique: true,
    required: true
  },
  value: {
    type: String,
    unique: false,
    required: true
  }
});

module.exports = mongoose.model("keyvalue", keyvalueSchema);
