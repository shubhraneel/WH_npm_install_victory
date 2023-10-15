const QuickLinks = require("../models/quickLinks");
const Society = require("../models/society");
const Hall = require("../models/hall");
const Contact = require("../models/contact");
const Department = require("../models/department");

const getQuickLinks = async (req, res) => {
  console.log("getQuickLinks ENDPOINT");
  try {
    const quicklinks = await QuickLinks.find({});
    return res.json({
      status: "success",
      message: "All quicklinks queried!",
      data: quicklinks,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

const getSocieties = async (req, res) => {
  console.log("getsocieties ENDPOINT");
  try {
    const societies = await Society.find({}).select("name").sort("name");
    const populate = await Society.findById(societies[0]._id)
      .populate("gallery events")
      .populate({
        path: "contacts",
        populate: { path: "image" },
      });
    return res.json({
      status: "success",
      message: "All societies queried!",
      data: { societies, populate },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

const getSocietyById = async (req, res) => {
  console.log("getSocietyById ENDPOINT");
  const _id = req.params._id;
  try {
    const society = await Society.findById(_id)
      .populate("gallery events")
      .populate({
        path: "contacts",
        populate: { path: "profilePic" },
      });
    return res.json({
      status: "success",
      message: "Society queried!",
      data: society,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

const getHalls = async (req, res) => {
  console.log("getHalls ENDPOINT");
  try {
    const halls = await Hall.find({}).select("name").sort("name");
    return res.json({
      status: "success",
      message: "All halls queried!",
      data: { halls },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

const getHallById = async (req, res) => {
  console.log("getHallById ENDPOINT");
  const _id = req.params._id;
  try {
    const hall = await Hall.findById(_id)
      .populate("gallery events")
      .populate({
        path: "contacts",
        populate: { path: "image" },
      });
    return res.json({
      status: "success",
      message: "Hall queried!",
      data: hall,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

const getTSGContacts = async (req, res) => {
  console.log("getTSGContacts ENDPOINT");
  try {
    const contacts = await Contact.find({ isTSGContact: true }).populate(
      "image"
    );
    return res.json({
      status: "success",
      message: "All contacts queried!",
      data: { contacts },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

const getTSGContactsByCategory = async (req, res) => {
  console.log("getTSGContactsByCategory ENDPOINT", req.params);
  try {
    const contacts = await Contact.find({
      isTSGContact: true,
      category: req.params.category,
    }).populate("image");
    return res.json({
      status: "success",
      message: "All contacts queried!",
      data: { contacts },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

const getFaculty = async (req, res) => {
  console.log("getFaculty ENDPOINT");
  try {
    const departments = await Department.find({})
      .select("departmentName")
      .sort("departmentName");
    const populate = await Department.findById(departments[0]._id).populate({
      path: "faculty",
      populate: { path: "contact", populate: "image" },
    });
    return res.json({
      status: "success",
      message: "All departments queried!",
      data: { departments, populate },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

const getFacultyById = async (req, res) => {
  console.log("getFacultyById ENDPOINT");
  const _id = req.params._id;
  try {
    const department = await Department.findById(_id).populate({
      path: "faculty",
      populate: { path: "contact", populate: "image" },
    });
    return res.json({
      status: "success",
      message: "Department queried!",
      data: department,
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
  getQuickLinks,
  getSocieties,
  getSocietyById,
  getHalls,
  getHallById,
  getFaculty,
  getTSGContacts,
  getTSGContactsByCategory,
  getFacultyById,
};
