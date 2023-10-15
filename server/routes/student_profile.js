const express = require("express");

const { getCompleteProfile } = require("../controllers/student_profile");

const router = express.Router();

const { requireSignin } = require("../middlewares");

router.get("/my-profile", requireSignin, getCompleteProfile);

module.exports = router;
