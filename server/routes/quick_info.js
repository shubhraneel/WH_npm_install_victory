const express = require("express");

const router = express.Router();

const {
    getQuickLinks,
    getSocieties,
    getSocietyById,
    getHalls,
    getHallById,
    getTSGContacts,
    getTSGContactsByCategory,
    getFaculty,
    getFacultyById,
} = require("../controllers/quick_info");

router.get("/quicklinks", getQuickLinks);
router.get("/societies", getSocieties);
router.get("/society/:_id", getSocietyById);
router.get("/halls", getHalls);
router.get("/hall/:_id", getHallById);
router.get("/contacts", getTSGContacts);
router.get("/contacts/:category", getTSGContactsByCategory);
router.get("/faculties", getFaculty);
router.get("/faculty/:_id", getFacultyById);

module.exports = router;
