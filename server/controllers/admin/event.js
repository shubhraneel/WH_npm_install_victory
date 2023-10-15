const Event = require("../../models/event");
const Society = require("../../models/society");

const getSocietyEvents = async (req, res) => {
  try {
    const userRole = req.user.role;
    if (userRole !== "societyOfficial") {
      return res.status(401).json({
        status: "error",
        message: "You are not authorised to perform this action.",
      });
    }

    const societyId = req.user.roleMetadata.society;
    const events = await Event.find({
      isTSGEvent: false,
      organisedBy: societyId,
    })
      .populate("organisedBy")
      .sort({
        eventDate: -1,
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

const createSocietyEvent = async (req, res) => {
  try {
    const userRole = req.user.role;
    if (userRole !== "societyOfficial") {
      return res.status(401).json({
        status: "error",
        message: "You are not authorised to perform this action.",
      });
    }

    const societyId = req.user.roleMetadata.society;
    const society = await Society.findById(societyId);

    const newEvent = new Event({
      ...req.body,
      organisedBy: societyId,
      isTSGEvent: false,
      category: society.category,
    });

    const event = await newEvent.save();

    await Society.findByIdAndUpdate(societyId, {
      events: [...society.events, event._id],
    });

    return res.json({
      status: "success",
      message: "Event created",
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

const updateSocietyEvent = async (req, res) => {
  try {
    const userRole = req.user.role;
    if (userRole !== "societyOfficial") {
      return res.status(401).json({
        status: "error",
        message: "You are not authorised to perform this action.",
      });
    }

    const societyId = req.user.roleMetadata.society;
    const eventId = req.body.eventId;

    const event = await Event.findById(eventId);
    if (event.organisedBy !== societyId) {
      return res.status(401).json({
        status: "error",
        message: "You are not authorised to perform this action.",
      });
    }

    const updatedEvent = new Event({ ...event, ...req.body });
    await updatedEvent.save();

    return res.json({
      status: "success",
      message: "Event updated",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find().populate("organisedBy").sort({
      eventDate: -1,
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

module.exports = {
  getSocietyEvents,
  createSocietyEvent,
  updateSocietyEvent,
  getAllEvents,
};
