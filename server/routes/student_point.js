const express = require("express");

const router = express.Router();

const {
    getAcademicResource,
    getCareerResource,
} = require("../controllers/student_point");

router.post("/academic", getAcademicResource);
router.post("/career", getCareerResource);

module.exports = router;
