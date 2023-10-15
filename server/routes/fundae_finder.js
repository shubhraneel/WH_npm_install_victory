const express = require("express");

const router = express.Router();

const {
    requestContact,
    fundaeFinder,
} = require("../controllers/fundae_finder");

const { requireSignin } = require("../middlewares");

router.get("/fundae-finder", requireSignin, fundaeFinder);
router.post("/request-contact", requireSignin, requestContact);

module.exports = router;
