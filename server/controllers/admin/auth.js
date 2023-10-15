const Official = require("../../models/officials.js");
const Society = require("../../models/society");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const { sendEmail } = require("../../helpers/auth");

const signToken = async (id) => {
  return jwt.sign({ _id: id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

const loginOfficial = async (req, res) => {
  try {
    const { userName, password } = req.body;

    // Check if email and password are provided
    if (!userName || !password) {
      return res.status(400).json({
        status: "error",
        message: "Please provide username and password.",
      });
    }

    // Check if the user exists and the password is correct
    const official = await Official.findOne({
      userName,
    }).select("+password");

    if (
      !official ||
      !(await official.correctPassword(password, official.password))
    ) {
      res.status(401).json({
        status: "error",
        message: "Enter a valid username and password.",
      });
    }

    const token = await signToken(official._id);

    delete official["password"];
    return res.json({
      status: "success",
      message: "Logged In!",
      data: { token, official },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

const loginOfficialFromJWT = async (req, res) => {
  try {
    console.log(req.user);

    const jwtToken = req.body.token;

    const decoded = await promisify(jwt.verify)(
      jwtToken,
      process.env.JWT_SECRET
    );

    const officialId = decoded._id;
    const official = await Official.findById(officialId);

    if (!official)
      return res.status(404).json({
        status: "error",
        message: "Official Not Found!",
      });

    const token = await signToken(official._id);

    return res.json({
      status: "success",
      message: "Logged In!",
      data: { token, official },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

const createOfficial = async (req, res) => {
  try {
    const { data } = req.body;

    const official = await Official.create(data);

    await sendEmail(
      data.email,
      "Login Credentials for Official Login",
      `You have been added as an official at TSG. Your login credentials are: Username: ${official.userName}, Password: ${data.password}`
    );

    if (data.role === "societyOfficial") {
      await Society.updateOne(
        { _id: data.roleMetadata.society },
        { $push: { contacts: official._id } }
      );
    }

    return res.json({
      status: "success",
      message: "Users added!",
      data,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

module.exports = {
  loginOfficial,
  loginOfficialFromJWT,
  createOfficial,
};
