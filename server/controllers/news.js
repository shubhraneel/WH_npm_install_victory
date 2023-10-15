const News = require("../models/news");

const getNews = async (req, res) => {
    // console.log("NEWS ENDPOINT");
    try {
        let news = await News.find({});
        if (!news)
            return res.json({
                status: "error",
                message: "Unable to fetch news!",
            });
        return res.json({
            status: "success",
            message: "Data for News page",
            data: news,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            status: "error",
            message: err.message,
        });
    }
};

module.exports = {
    getNews,
};
