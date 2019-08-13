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
            // console.log(response.data);

            $(".entry-summary").each(function(i, el) {
                var $el = $(el)

                var title = $el.children("a.link").attr("title");
                var author = $el.find("a.author-link").attr("title");
                var link = $el.children("a.link").attr("href");
                var excerpt = $el.find("p.excerpt").text();

                var result = {
                    title,
                    author,
                    link,
                    excerpt
                };

                console.log("scrape result: ", result);

                if (title && link && excerpt) {

                    // create new Article using result object
                    db.Article.create(result)
                    .then(function(dbArticle) {
                        console.log(dbArticle);
                        // res.json(dbArticle);
                    })
                    .catch(function(err) {
                        console.log(err);
                    });
                };
            });
            res.send("Scrape Complete");
        })
        .catch(function(err) {
            console.log(err);
        });
    });

    app.get("/articles", function(req, res) {
        db.Article.find({})
        .then(function(dbArticle) {
            res.json(dbArticle)
        })
        .catch(function(err) {
            console.log(err);
        });
    });

    app.delete("/clear", function(req, res) {
        db.Article.deleteMany({})
        .then(function(dbArticle) {
            res.json(dbArticle);
        })
        .catch(function(err) {
            console.log(err);
        });
    });

    app.put("/saved:id", function(req, res) {
        var id = req.params.id;
        console.log("id: ", id);

        db.Article.findByIdAndUpdate({"_id": id}, 
        {"$set": {"saved": true}})
        .then(function(dbArticle) {
            res.json(dbArticle);
        })
        .catch(function(err) {
            console.log(err);
        })
    })

};