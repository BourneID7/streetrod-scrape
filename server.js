var express = require("express");
var exphbs = require("express-handlebars");
var mongoose = require("mongoose");

var db = require("./models");

var PORT = process.env.PORT || 3000;

// Initialize Express
var app = express();

// Configure middleware

// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));

// Handlebars
app.engine(
    "handlebars",
    exphbs({
      defaultLayout: "main"
    })
  );
  app.set("view engine", "handlebars");
  
  // Routes
  require("./routes/apiRoutes.js")(app);
  require("./routes/htmlRoutes.js")(app);
  

// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/mongoHeadlines";

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

// Start the server
app.listen(PORT, function() {
    console.log("App running on port " + PORT);
  });