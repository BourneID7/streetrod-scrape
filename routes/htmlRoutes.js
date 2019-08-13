var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    db.Article.find({}).then(function(dbArticle) {
      res.render("index", {
        Article: dbArticle
      });
    });
  });

  app.get("/saved", function(req, res) {
    db.Article.find({"saved": true})
    .then(function(dbArticle) {
      res.render("saved", {
        Article: dbArticle
      });
    });
  });

};