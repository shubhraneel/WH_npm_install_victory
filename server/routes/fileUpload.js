const express = require("express");
const {
    generateGetUrl,
    generatePutUrl,
} = require("../controllers/fileUploadToS3");

const router = express.Router();

const { requireSignin } = require("../middlewares");

router.post("/file-upload/generate-put-url", generatePutUrl);
router.post("/file-upload/generate-get-url", generateGetUrl);

module.exports = router;
