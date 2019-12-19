const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
  title: {
    type: String,
    unique: true
  },
  link: { type: String },
  imageLink: { type: String },
  summary: { type: String },
  scraped: {
    type: Date,
    default: Date.now
  },
  favorite: {
    type: Boolean,
    default: false
  }
});

const Data = mongoose.model("Data", dataSchema);
module.exports = Data;