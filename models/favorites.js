const mongoose = require("mongoose");

const favoritesSchema = new mongoose.Schema({
  articleId: {
    type: mongoose.Schema.Types.ObjectId,
    unique: true
  }
});

const Favorite = mongoose.model("Favorite", favoritesSchema);
module.exports = Favorite;