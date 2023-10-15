const express = require("express");

const router = express.Router();

const {
    events,
    getEventByType,
    getEventBySlug,
} = require("../controllers/event");

router.get("/events", events);
router.get("/events/:type", getEventByType);
router.get("/events/individual/:slug", getEventBySlug);

module.exports = router;
