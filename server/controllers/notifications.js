const FundaeFinderRequest = require("../models/fundae_finder_request");
const Student = require("../models/student");

const notifications = async (req, res) => {
    console.log("notifications ENDPOINT");
    try {
        let data = {};
        const fundaeFinderRequests = await FundaeFinderRequest.find({
            requestedTo: req.user._id,
            status: "pending",
        }).populate({ path: "requestedBy", select: ["name", "rollNo"] });

        data.fundaeFinderRequests = fundaeFinderRequests.reverse();
        await Student.findByIdAndUpdate(req.user._id, {
            newNotification: false,
        });

        return res.json({
            status: "success",
            message: "Notifications",
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

const acceptRequest = async (req, res) => {
    console.log("acceptRequest ENDPOINT");
    try {
        await FundaeFinderRequest.findByIdAndUpdate(req.params._id, {
            status: "accepted",
        });
        return res.json({
            status: "success",
            message: "Request Accepted!",
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            status: "error",
            message: err.message,
        });
    }
};

const rejectRequest = async (req, res) => {
    console.log("rejectRequest ENDPOINT");
    try {
        await FundaeFinderRequest.findByIdAndUpdate(req.params._id, {
            status: "rejected",
        });
        return res.json({
            status: "success",
            message: "Request Rejected!",
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
    notifications,
    acceptRequest,
    rejectRequest,
};
