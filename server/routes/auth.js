const express = require("express");

const router = express.Router();

const {
    otpGeneration,
    login,
    register,
    loginStudentFromJWT,
    // getData,
} = require("../controllers/auth");

const { requireSignin } = require("../middlewares");

router.post("/otp-generate", otpGeneration);
router.post("/login", login);
router.put("/register", requireSignin, register);
router.post("/login-with-token", loginStudentFromJWT);
// router.get("/data", getData);

module.exports = router;
