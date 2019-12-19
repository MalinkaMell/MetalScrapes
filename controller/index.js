const express = require("express");
const router = express.Router();
const axios = require("axios");
const cheerio = require("cheerio");
const moment = require("moment");

const model = require("../models"); //requiring the whole folder, created index in that folde and gather all my models in it

router.get("/scrape", function (req, res) {

  axios.get("https://metalinjection.net/").then(function (response) {
    let $ = cheerio.load(response.data);
    $("article.has-post-thumbnail").each(function (i, element) {
      model.Data.create(
        {
          title: $(element).find(".title").text(),
          link: $(element).find("a").attr("href"),
          imageLink: $(element).find("img").attr("src"),
          summary: $(element).find("p:not(:last-child)").text()
        }
      )
        .then(function (dbData) {
          console.log(dbData);
          res.redirect("/");
        })
        .catch(function (err) {
          if(err.code === 11000) {
            res.redirect("/");
          }
          console.log(err);
        });
    });
  });
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
      //console.log(found);
      model.Data
        .find()
        .where("favorite").equals("false")
        .sort({ $natural: -1 })
        .skip(1)
        .exec(function (err, found) {
          //console.log(found);
          if (err) throw err;
          res.render("index", {
            data: found,
            last: latest
          })
        })
    });
});

router.get("/favorites", function (req, res) {
  model.Data
    .find()
    .where("favorite").equals("true")
    .sort({ $natural: 1 })
    .exec(function (err, found) {
      //console.log(found);
      if (err) throw err;
      res.render("favorites", {
        data: found
      })
    })
});

router.post("/", function (req, res) {
  model.Favorite
    .create(req.body)
    .then(function (done) {
      model.Data
        .findOneAndUpdate({ _id: done.articleId }, { $set: { favorite: true } }, function (err, doc) {
          if (err) throw err;
          console.log(doc);
        })
    })
})

module.exports = router;