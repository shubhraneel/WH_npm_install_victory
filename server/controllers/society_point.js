const Event = require("../models/event");

const societyEvents = async (req, res) => {
    // console.log("EVENTS ENDPOINT");
    try {
        let events = await Event.find({
            isTSGEvent: false,
        })
            .populate("organisedBy")
            .sort({
                eventDate: -1,
            });
        return res.json({
            status: "success",
            message: "Data for Events page",
            data: { events },
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
    societyEvents,
};
