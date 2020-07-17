const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ArticleSchema = new Schema ({
    title: {
        type: String,
        required: true,
        unique: true
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
    saved: {
        type: Boolean,
        default: false
    },
    note: [{
        type: Schema.Types.ObjectId,
        ref: "Note"
    }],  
    }, 
    {
        toObject: {
        virtuals: true,
        },
        toJSON: {
        virtuals: true,
        }
    }
);

const Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;