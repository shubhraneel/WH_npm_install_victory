const express = require("express");

const router = express.Router();

const {
    notifications,
    acceptRequest,
    rejectRequest,
} = require("../controllers/notifications");

const { requireSignin } = require("../middlewares");

router.get("/notifications", requireSignin, notifications);
router.put("/accept-request/:_id", requireSignin, acceptRequest);
router.put("/reject-request/:_id", requireSignin, rejectRequest);

module.exports = router;
