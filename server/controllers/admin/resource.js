const Resources = require("../../models/resource");

const getResources = async (req, res) => {
    console.log("getResources ENDPOINT");
    try {
        const resources = await Resources.find({}).populate("department");
        return res.json({
            status: "success",
            message: "All resources queried!",
            data: resources,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            status: "error",
            message: err.message,
        });
    }
};

const addResource = async (req, res) => {
    console.log("addResource ENDPOINT => ", req.body);
    try {
        const resource = new Resources(req.body);
        await resource.save();
        return res.json({
            status: "success",
            message: "Resource added!",
            data: resource,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            status: "error",
            message: err.message,
        });
    }
};

const updateResourceById = async (req, res) => {
    console.log("updateResourceById ENDPOINT => ", req.params, req.body);
    const _id = req.params._id;
    try {
        const resource = await Resources.findByIdAndUpdate(_id, req.body, {
            new: true,
        });
        return res.json({
            status: "success",
            message: "Resource updated!",
            data: resource,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            status: "error",
            message: err.message,
        });
    }
};

const deleteResourceById = async (req, res) => {
    console.log("deleteResourceById ENDPOINT => ", req.params, req.body);
    const _id = req.params._id;
    try {
        await Resources.findByIdAndDelete(_id);
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
    deleteResourceById,
    updateResourceById,
    addResource,
    getResources,
};
