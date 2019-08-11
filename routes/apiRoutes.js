var mongoose = require("mongoose");
var cheerio = require("cheerio");
var axios = require("axios");
var db = require("../models");

module.exports = function(app) {
    app.get("/scrape", function(req, res) {
        axios.get("https://www.hotrod.com/")
        .then(function(response) {

            // load response data into cheerio
            var $ = cheerio.load(response.data);

            $("article").each(function(i, el) {

                var result = {};

                result.title = $(this).children("h3").text();
                result.author = $(this).children(".name").text();
                result.link = $(this).children("a .title").text();
                result.excerpt = $(this).children("p .excerpt").text();

                // create new Article using result object
                db.Article.create(dbArticle)
                .then(function(dbArticle) {
                    console.log(dbArticle);
                    res.json(dbArticle);
                })
                .catch(function(err) {
                    res.json(err);
                });
            });
        })
        .catch(function(err) {
            res.json(err);
        });
    });
};