const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
  title: String,
  link: {type: String},
  imageLink: {type: String},
  summary: {type: String},
  scraped: {
    type: Date,
    default: Date.now
  },
});

const Data = mongoose.model("Data", dataSchema);
module.exports = Data;