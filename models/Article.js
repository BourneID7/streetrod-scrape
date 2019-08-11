var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var ArticleSchema = new Schema ({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
    },
    link: {
        type: String,
        required: true
    },
    excerpt: {
        type: String,
        required: true
    },
    imgUrl: {
        type: String
    },
    note: {
        type: Schema.Types.ObjectId,
        ref: "Note"
    }
});

var Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;