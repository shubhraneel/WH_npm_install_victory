const QuickLinks = require("../../models/quickLinks");

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

const addQuickLink = async (req, res) => {
    console.log("addQuickLink ENDPOINT => ", req.body);
    try {
        const quicklink = new QuickLinks(req.body);
        await quicklink.save();
        return res.json({
            status: "success",
            message: "Quick Link added!",
            data: quicklink,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            status: "error",
            message: err.message,
        });
    }
};

const updateQuickLinkById = async (req, res) => {
    console.log("updateQuickLinkById ENDPOINT => ", req.params, req.body);
    const _id = req.params._id;
    try {
        const quicklink = await QuickLinks.findByIdAndUpdate(_id, req.body, {
            new: true,
        });
        return res.json({
            status: "success",
            message: "Quick Link updated!",
            data: quicklink,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            status: "error",
            message: err.message,
        });
    }
};

const deleteQuickLinkById = async (req, res) => {
    console.log("deleteQuickLinkById ENDPOINT => ", req.params, req.body);
    const _id = req.params._id;
    try {
        await QuickLinks.findByIdAndDelete(_id);
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
    getQuickLinks,
    addQuickLink,
    updateQuickLinkById,
    deleteQuickLinkById,
};
