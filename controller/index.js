const express = require("express");
const router = express.Router();
const axios = require("axios");
const cheerio = require("cheerio");
const model = require("../models");

router.get("/scrape", function (req, res) {
  axios
    .get("https://metalinjection.net/")
    .then(function (response) {
      let $ = cheerio.load(response.data);
      $("article.has-post-thumbnail").each(function (i, element) {
        model.Data.create(
          {
            title: $(element).find(".title").text(),
            link: $(element).find("a").attr("href"),
            category: $(element).find(".category").text(),
            categoryLink: $(element).find(".category a").attr("href"),
            imageLink: $(element).find("img").attr("src"),
            summary: $(element).find("p:not(:last-child)").text()
          }
        )
          .then(function () {
            console.log("Scraping new articles");
          })
          .catch(function (err) {
            if (err.code === 11000) {
              console.log("We already have this article, no overriding");
            } else {
              console.log(err);
            }
          });
      });
    })
    .then(function () {
      res.redirect("/");
    })
});

router.get("/", function (req, res) {
  let latest;
  model.Data
    .findOne()
    .where("favorite").equals("false")
    .sort({ $natural: -1 })
    .limit(1)
    .exec(function (err, found) {
      if (err) throw err;
      latest = found;
      model.Data
        .find()
        .where("favorite").equals("false")
        .sort({ $natural: -1 })
        .skip(1)
        .exec(function (err, found) {
          if (err) throw err;
          res.render("index", {
            data: found,
            last: latest
          })
        });
    });
});

router.put("/", function (req, res) {
  model.Data
    .findOneAndUpdate(
      req.body,
      { $set: { favorite: true } },
      { new: true },
      function (err, doc) {
        if (err) throw err;
        res.send(doc);
      });
});

router.get("/favorites", function (req, res) {
  model.Data
    .find()
    .where("favorite").equals("true")
    .sort({ $natural: 1 })
    .exec(function (err, found) {
      if (err) throw err;
      res.render("favorites", {
        data: found
      })
    })
});

router.put("/favorites/:id", function (req, res) {
  model.Data
    .findOneAndUpdate(
      { _id: req.params.id },
      { $set: { favorite: false } },
      { new: true },
      function (err, doc) {
        if (err) throw err;
        res.send(doc);
      })
});

router.delete("/", function (req, res) {
  model.Note.countDocuments(function (err, count) {
    if (err) throw err;
    if (count > 0) {
      model.Note.collection.drop()
    }
  })
  model.Data.countDocuments(function (err, count) {
    if (err) throw err;
    if (count > 0) {
      model.Data.collection.drop()
    }
  })
});

router.get("/articles/:id", function (req, res) {
  model.Data
    .findOne()
    .where("_id").equals(req.params.id)
    .populate("note")
    .sort({ $natural: 1 })
    .exec(function (err, found) {
      if (err) throw err;
      res.send(found)
    })
});

router.post("/articles/:id", function (req, res) {
  model.Note
    .create(req.body)
    .then(function (dbData) {
      model.Data
        .findOneAndUpdate(
          { _id: req.params.id },
          { $push: { note: dbData._id } },
          { new: true },
          function (err, doc) {
            if (err) throw err;
            console.log(doc);
            res.send(doc);
          })
    })
});

router.delete("/notes/:id", function (req, res) {
  model.Note.deleteOne({ _id: req.params.id }, { new: true }, function (err, doc) {
    if (err) throw err;
    res.send(doc);
  })
})

module.exports = router;