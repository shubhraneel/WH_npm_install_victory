const algoliasearch = require("algoliasearch");
const Student = require("../../models/student");
const Hall = require("../../models/hall");
const Department = require("../../models/department");

const ALGOLIA_ID = process.env.ALGOLIA_ID;
const ALGOLIA_ADMIN_KEY = process.env.ALGOLIA_ADMIN_KEY;

const getUsers = async (req, res) => {
  console.log("GET USERS ENDPOINT");
  try {
    console.log(req.user);
    const users = await Student.find({}).populate(
      "department achievements hall society"
    );
    return res.json({
      status: "success",
      message: "All users queried!",
      data: users,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await Student.findById(req.params._id).populate(
      "department achievements hall society"
    );
    return res.json({
      status: "success",
      message: "User queried!",
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

const getUserByRollNo = async (req, res) => {
  try {
    const user = await Student.findOne({ rollNo: req.params.rollNo }).populate(
      "department achievements hall society"
    );
    return res.json({
      status: "success",
      message: "User queried!",
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

const updateUserById = async (req, res) => {
  console.log("updateUserById ENDPOINT => ", req.params, req.body);
  const _id = req.params._id;
  try {
    const ALGOLIA_INDEX_NAME = "students";
    const client = algoliasearch(ALGOLIA_ID, ALGOLIA_ADMIN_KEY);

    const index = client.initIndex(ALGOLIA_INDEX_NAME);

    const user = await Student.findByIdAndUpdate(_id, req.body, {
      new: true,
    });

    const saveToAlgolia = {
      objectID: _id.valueOf(),
      name: user.name,
      rollNo: user.rollNo,
      gender: user.gender,
      tags: user.tags,
    };

    await index.partialUpdateObject(saveToAlgolia);

    return res.json({
      status: "success",
      message: "User updated!",
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

const addUser = async (req, res) => {
  console.log("addUser ENDPOINT => ", req.params, req.body);
  try {
    const ALGOLIA_INDEX_NAME = "students";
    const client = algoliasearch(ALGOLIA_ID, ALGOLIA_ADMIN_KEY);

    const index = client.initIndex(ALGOLIA_INDEX_NAME);

    const user = new Student(req.body);
    await user.save();

    const saveToAlgolia = {
      objectID: user._id.valueOf(),
      name: user.name,
      rollNo: user.rollNo,
      gender: user.gender,
      tags: user.tags,
    };

    await index.saveObject(saveToAlgolia);

    return res.json({
      status: "success",
      message: "User added!",
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

const addUsers = async (req, res) => {
  console.log("addUsers ENDPOINT => ", req.params, req.body);
  try {
    const ALGOLIA_INDEX_NAME = "students";
    const client = algoliasearch(ALGOLIA_ID, ALGOLIA_ADMIN_KEY);

    const index = client.initIndex(ALGOLIA_INDEX_NAME);

    const { users } = req.body;

    const halls = await Hall.find({});
    const hallsNameIdMap = {};
    halls.forEach((obj) => {
      hallsNameIdMap[obj.name] = obj._id;
    });

    const departments = await Department.find({});
    const departmentsNameIdMap = {};
    departments.forEach((obj) => {
      departmentsNameIdMap[obj.departmentName] = obj._id;
    });

    users.forEach((obj) => {
      obj.hall = hallsNameIdMap[obj.hall];
      obj.department = departmentsNameIdMap[obj.department];
    });

    const result = await Student.create(users);

    const saveToAlgolia = result.map((obj) => {
      return {
        objectID: obj._id.valueOf(),
        name: obj.name,
        rollNo: obj.rollNo,
        gender: obj.gender,
        tags: obj.tags,
      };
    });

    await index.saveObjects(saveToAlgolia);

    return res.json({
      status: "success",
      message: "Users added!",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

const deleteUserById = async (req, res) => {
  console.log("deleteUserById ENDPOINT => ", req.params, req.body);
  const _id = req.params._id;
  try {
    const ALGOLIA_INDEX_NAME = "students";
    const client = algoliasearch(ALGOLIA_ID, ALGOLIA_ADMIN_KEY);

    const index = client.initIndex(ALGOLIA_INDEX_NAME);

    await Student.findByIdAndDelete(_id);

    await index.deleteObject(_id.valueOf());
    return res.json({
      status: "success",
      message: "Deleted Successfully!",
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
  getUsers,
  getUserById,
  updateUserById,
  addUser,
  addUsers,
  deleteUserById,
  getUserByRollNo,
};
