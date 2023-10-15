const FundaeFinderRequest = require("../models/fundae_finder_request");
const Student = require("../models/student");

const fundaeFinder = async (req, res) => {
  console.log("fundaeFinder ENDPOINT");
  try {
    const requests = await FundaeFinderRequest.find({
      requestedBy: req.user,
    }).populate({
      path: "requestedTo",
      select: ["name", "rollNo"],
    });

    await Promise.all(
      requests.map(async (obj) => {
        if (obj.status === "accepted")
          await obj.populate({
            path: "requestedTo",
            select: ["email", "phone", "name", "rollNo"],
          });
      })
    );

    return res.json({
      status: "success",
      message: "fundaeFinder queried",
      data: requests,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

const requestContact = async (req, res) => {
  console.log("requestContact ENDPOINT", req.body.requestedTo);
  try {
    let fundaeFinderRequest = new FundaeFinderRequest({
      requestedBy: req.user,
      requestedTo: req.body.requestedTo,
    });
    await Student.findByIdAndUpdate(req.body.requestedTo, {
      newNotification: true,
      $push: { fundaeFinderRequests: fundaeFinderRequest._id },
    });
    await fundaeFinderRequest.save();
    return res.json({
      status: "success",
      message: "fundaeFinderRequest added",
      data: fundaeFinderRequest,
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
  fundaeFinder,
  requestContact,
};
