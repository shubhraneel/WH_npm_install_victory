const express = require("express");

const router = express.Router();

const {
    achievements,
    addGrievance,
    addAchievement,
    getAchievementByType,
} = require("../controllers/achievement");

const { requireSignin } = require("../middlewares");

router.get("/achievements", requireSignin, achievements);
router.post("/grievance", requireSignin, addGrievance);
router.post("/add-achievement", requireSignin, addAchievement);
router.get("/achievements/:type", requireSignin, getAchievementByType);

module.exports = router;
