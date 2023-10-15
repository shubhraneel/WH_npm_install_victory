const Student = require("../models/student");
const Achievement = require("../models/achievement");
const GrievanceForm = require("../models/grievance_form");

const achievements = async (req, res) => {
  // console.log("ACHIEVEMENT ENDPOINT => ", req.user);
  let data = {
    count: {
      Technology: 0,
      SocialAndCulture: 0,
      SportsAndGames: 0,
      StudentWelfare: 0,
    },
  };
  try {
    let user = await Student.findById(req.user._id).populate("department hall");
    if (!user)
      return res.status(400).json({
        status: "error",
        message: "User Not Found!",
      });
    user.otp = undefined;
    user.otpExpiresAt = undefined;
    data.user = user;

    let technologyCount = await Achievement.count({
      category: "Technology",
      user: req.user._id,
    });
    let socialAndCultureCount = await Achievement.count({
      category: "SocialAndCulture",
      user: req.user._id,
    });
    let sportsAndGamesCount = await Achievement.count({
      category: "SportsAndGames",
      user: req.user._id,
    });
    let studentWelfareCount = await Achievement.count({
      category: "StudentWelfare",
      user: req.user._id,
    });
    data.count["Technology"] = technologyCount;
    data.count["SocialAndCulture"] = socialAndCultureCount;
    data.count["SportsAndGames"] = sportsAndGamesCount;
    data.count["StudentWelfare"] = studentWelfareCount;

    return res.json({
      status: "success",
      message: "Data for achievements page",
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

const addAchievement = async (req, res) => {
  // console.log("ADD ACHIEVEMENT ENDPOINT => ", req.body);
  let data = req.body;
  data.user = req.user._id;
  try {
    const achievement = new Achievement(data);
    // console.log(achievement);
    await achievement.save();
    let user = await Student.findByIdAndUpdate(
      req.user._id,
      {
        $push: { achievements: achievement._id },
      },
      {
        new: true,
      }
    );
    if (!achievement || !user)
      return res.status(400).json({
        status: "error",
        message: "Unable to add!",
      });

    return res.json({
      status: "success",
      message: "Achievement Added!",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

const addGrievance = async (req, res) => {
  // console.log("ADD GRIEVANCE ENDPOINT => ", req.user);

  try {
    const { category, description, attempts, documents } = req.body;
    let form = new GrievanceForm({
      user: req.user._id,
      category,
      description,
      attempts,
      documents,
    });

    await form.save();
    return res.json({
      status: "success",
      message: "Grievance Successfully Posted!",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

const getAchievementByType = async (req, res) => {
  console.log("GET ACHIEVEMENT ENDPOINT => ", req.params);
  try {
    let achievements = await Achievement.find({
      user: req.user._id,
      category: req.params.type,
    });
    if (!achievements)
      return res.status(400).json({
        status: "error",
        message: "Try Again!",
      });
    return res.json({ data: achievements });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

module.exports = {
  achievements,
  addAchievement,
  addGrievance,
  getAchievementByType,
};
