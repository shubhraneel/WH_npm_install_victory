const mongoose = require("mongoose");
const { Schema } = mongoose;
const { getLinkPreview } = require("link-preview-js");

const newsSchema = new Schema(
    {
        title: {
            type: String,
            trim: true,
            required: true,
        },
        date: {
            type: Date,
            required: true,
        },
        publishedBy: {
            type: String,
            trim: true,
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
        link: {
            type: String,
            trim: true,
            required: true,
        },
        imageLink: {
            type: String,
            trim: true,
            default:
                "https://img.freepik.com/free-vector/coronavirus-news-update-illustration_52683-51043.jpg?size=338&ext=jpg",
        },
    },
    { timestamps: true }
);

newsSchema.pre("save", async function () {
    var news = this;
    return getLinkPreview(news.link).then((data) => {
        news.imageLink = data.images[0];
        console.log(news.imageLink);
    });
});

const News = mongoose.model("News", newsSchema);
module.exports = News;
