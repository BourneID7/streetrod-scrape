const mongoose = require("mongoose");
const cheerio = require("cheerio");
const axios = require("axios");
const db = require("../models");

module.exports = function(app) {

    //route to scape new articles from website
    app.get("/scrape", function(req, res) {
        axios.get("https://www.hotrod.com/")
        .then(function(response) {

            // load response data into cheerio
            const $ = cheerio.load(response.data);
            // console.log(response.data);

            $(".entry-summary").each(function(i, el) {
                const $el = $(el)

                const title = $el.children("a.link").attr("title");
                const author = $el.find("a.author-link").attr("title");
                const link = $el.children("a.link").attr("href");
                const excerpt = $el.find("p.excerpt").text();

                const result = {
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

    //route to get all articles in db
    app.get("/articles", function(req, res) {
        db.Article.find({})
        .then(function(dbArticle) {
            res.json(dbArticle)
        })
        .catch(function(err) {
            console.log(err);
        });
    });

    //route to delete all articles & notes from db
    app.delete("/clear", function(req, res) {
        db.Article.deleteMany({})
        .then(function() {
            db.Note.deleteMany({})
        })
        .then(function() {
            db.Article.find({})
        })
        .then(function(dbArticle) {
            res.json(dbArticle);
        })
        .catch(function(err) {
            console.log(err);
        });
    });

    //route to add article to saved list
    app.put("/saved:id", function(req, res) {
        const id = req.params.id;
        console.log("id: ", id);

        db.Article.findByIdAndUpdate({"_id": id}, 
        {"$set": {"saved": true}})
        .then(function(dbArticle) {
            res.json(dbArticle);
        })
        .catch(function(err) {
            console.log(err);
        });
    });

    //route to remove article from saved articles list. Does not remove article from db
    app.put("/unsaved:id", function(req, res) {
        const id = req.params.id;
        console.log("id: ", id);

        db.Article.findByIdAndUpdate({"_id": id}, 
        {"$set": {"saved": false}})
        .then(function(dbArticle) {
            res.json(dbArticle);
        })
        .catch(function(err) {
            console.log(err);
        });
    });

    //route to save a new note & associate to article
    app.post("/note/:id", function(req, res) {
        const id = req.params.id;
        console.log("note for article id: ", id);

        db.Note.create(req.body)
        .then(function(dbNote) {
            return db.Article.findByIdAndUpdate(
                {"_id": id}, {"$push": {note: dbNote._id} }, {new: true});
        })
        .then(function(dbArticle) {
            res.json(dbArticle)
        })
        .catch(function(err) {
            console.log(err);
        });    
    });

    //route to delete note
    app.delete('/note/:id', function (req, res) {
        db.Note.findByIdAndDelete({ _id: req.params.id }, function (err, response) {
            if (err) throw err;
            db.Article.updateOne(
                { "note": req.params.id },
                { "$pull": { "note": req.params.id } },
            )
            .then(function(dbArticle){
                res.json(dbArticle);
            })
            .catch(function(err) {
                console.log(err)
            });
        });
    });

};