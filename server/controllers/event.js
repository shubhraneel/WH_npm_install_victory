const Event = require("../models/event");

const events = async (req, res) => {
    // console.log("EVENTS ENDPOINT");
    let data = {
        count: {
            Technology: 0,
            SocialAndCulture: 0,
            SportsAndGames: 0,
            StudentWelfare: 0,
        },
    };
    try {
        let technologyCount = await Event.count({
            isTSGEvent: true,
            category: "Technology",
        });
        let socialAndCultureCount = await Event.count({
            isTSGEvent: true,
            category: "SocialAndCulture",
        });
        let sportsAndGamesCount = await Event.count({
            isTSGEvent: true,
            category: "SportsAndGames",
        });
        let studentWelfareCount = await Event.count({
            isTSGEvent: true,
            category: "StudentWelfare",
        });
        data.count["Technology"] = technologyCount;
        data.count["SocialAndCulture"] = socialAndCultureCount;
        data.count["SportsAndGames"] = sportsAndGamesCount;
        data.count["StudentWelfare"] = studentWelfareCount;
        return res.json({
            status: "success",
            message: "Data for Events page",
            data,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            status: "error",
            message: err.message,
        });
    }
};

const getEventByType = async (req, res) => {
    // console.log("EVENTS BY TYPE ENDPOINT => ", req.params);
    try {
        let events = await Event.find({
            category: req.params.type,
        });
        if (!events)
            return res.status(400).json({
                status: "error",
                message: "Try Again!",
            });
        return res.json({
            status: "success",
            message: "Data for Events page",
            data: events,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            status: "error",
            message: err.message,
        });
    }
};

const getEventBySlug = async (req, res) => {
    // console.log("EVENT BY SLUG ENDPOINT => ", req.params);
    try {
        let event = await Event.findOne({
            slug: req.params.slug,
        });
        if (!event)
            return res.status(400).json({
                status: "error",
                message: "Event Not Found!",
            });
        return res.json({
            status: "success",
            message: "Data for Event page",
            data: event,
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
    events,
    getEventByType,
    getEventBySlug,
};
