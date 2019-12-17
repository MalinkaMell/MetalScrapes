const express = require("express");
const router = express.Router();
const axios = require("axios");
const cheerio = require("cheerio");
const moment = require("moment");

const model = require("../models"); //requiring the whole folder, created index in that folde and gather all my models in it

router.get("/scrape", function (req, res) {

  axios.get("https://metalinjection.net/category/upcoming-releases").then(function (response) {
    let $ = cheerio.load(response.data);
    $("article.has-post-thumbnail").each(function (i, element) {
      model.Data.create({
        title: $(element).find(".title").text(),
        link: $(element).find("a").attr("href"),
        imageLink: $(element).find("img").attr("src"),
        summary: $(element).find("p:not(:last-child)").text()
      })
        .then(function (dbData) {
          // If saved successfully, send the the new User document to the client
          res.json(dbData);
        })
        .catch(function (err) {
          // If an error occurs, send the error to the client
          res.json(err);
        });
    });
  });
});


router.get("/", function (req, res) {
  let latest;
  model.Data
    .findOne()
    .sort({ $natural: 1 })
    .limit(1)
    .exec(function (err, found) {
      if (err) throw err;
      //console.log(found);
      latest = found;
    })
  model.Data
    .find()
    .sort({ $natural: 1 })
    .skip(1)
    .exec(function (err, found) {
      console.log(found);
      
      if (err) throw err;
      res.render("index", {
        data: found,
        last: latest
      })
    });

  /*   model.Data.find({}, function (err, found) {
      if (err) throw err;
      res.render("index", {
        data: found,
        last: latest
      })
  
    }) */

});

module.exports = router;