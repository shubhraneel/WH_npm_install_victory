const Student = require("../models/student");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const algoliasearch = require("algoliasearch");

const { sendEmail, AddMinutesToDate } = require("../helpers/auth");

const ALGOLIA_ID = process.env.ALGOLIA_ID;
const ALGOLIA_ADMIN_KEY = process.env.ALGOLIA_ADMIN_KEY;

const signToken = async (id) => {
  return jwt.sign({ _id: id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

const otpGeneration = async (req, res) => {
  console.log("OTP GENERATION ENDPOINT => ", req.body);
  const { email } = req.body;
  try {
    const user = await Student.findOne({ email });
    // validation
    if (!user)
      return res.status(400).json({
        status: "error",
        message: "User Not Found!",
      });
    // generate otp
    let otp = parseInt(Math.random() * 1000000);
    let now = new Date();
    let expiration_time = AddMinutesToDate(now, 5);
    // save otp in db
    let newUser = await Student.findByIdAndUpdate(
      user._id,
      {
        otp,
        otpExpiresAt: expiration_time,
      },
      {
        new: true,
      }
    );
    if (!newUser)
      return res.status(400).json({
        status: "error",
        message: "Try Again!",
      });
    // send otp
    let response = await sendEmail(
      email,
      "LOGIN | OTP",
      `Your otp is ${otp} and is valid for only 5 minutes.`
    );
    return res.json({
      status: "success",
      message: "OTP sent to your email!",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

const login = async (req, res) => {
  console.log("LOGIN ENDPOINT => ", req.body);
  const { email, otp } = req.body;
  try {
    let user = await Student.findOne({ email }).populate("hall department");
    // console.log("USER => ", user);
    if (!user)
      return res.status(400).json({
        status: "error",
        message: "User Not Found!",
      });

    // check otp
    let now = new Date();
    if (user.otpExpiresAt < now)
      return res.json({
        error: "Time Exceeded!",
      });

    if (user.otp != otp)
      return res.json({
        error: "Invalid Otp!",
      });

    // create signed token
    const token = await signToken(user._id);
    user.otp = undefined;
    user.otpExpiresAt = undefined;

    return res.json({
      status: "success",
      message: "Logged In!",
      data: { token, user },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

const register = async (req, res) => {
  console.log("REGISTER ENDPOINT => ", req.user);
  try {
    const data = {};
    if (req.body.tags) data.tags = req.body.tags;
    if (req.body.profilePic) data.profilePic = req.body.profilePic;
    data.isRegistered = true;

    let user = await Student.findByIdAndUpdate(req.user._id, data, {
      new: true,
    }).populate("department hall society");

    const ALGOLIA_INDEX_NAME = "students";
    const client = algoliasearch(ALGOLIA_ID, ALGOLIA_ADMIN_KEY);

    const index = client.initIndex(ALGOLIA_INDEX_NAME);
    const saveToAlgolia = {
      objectID: user._id.valueOf(),
      name: user.name,
      rollNo: user.rollNo,
      gender: user.gender,
      tags: user.tags,
    };

    await index.saveObject(saveToAlgolia);

    if (!user)
      return res.status(400).json({
        status: "error",
        message: "User Not Found!",
      });
    user.otp = undefined;
    user.otpExpiresAt = undefined;
    return res.json({
      status: "success",
      message: "Registered!",
      data: user,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

const loginStudentFromJWT = async (req, res) => {
  try {
    const jwtToken = req.body.token;

    const decoded = await promisify(jwt.verify)(
      jwtToken,
      process.env.JWT_SECRET
    );

    const userId = decoded._id;
    const user = await Student.findById(userId).populate("hall department");

    if (!user)
      return res.status(400).json({
        status: "error",
        message: "User Not Found!",
      });

    const token = await signToken(user._id);

    user.otp = undefined;
    user.otpExpiresAt = undefined;
    return res.json({
      status: "success",
      message: "Logged In!",
      data: { token, user },
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
  otpGeneration,
  login,
  register,
  loginStudentFromJWT,
};
