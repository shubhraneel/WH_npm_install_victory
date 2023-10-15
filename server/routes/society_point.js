const express = require("express");

const router = express.Router();

const { societyEvents } = require("../controllers/society_point");

router.get("/society-events", societyEvents);

module.exports = router;
