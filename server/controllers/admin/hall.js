const Hall = require("../../models/hall");

const getHalls = async (req, res) => {
    console.log("getHalls ENDPOINT");
    try {
        const halls = await Hall.find({});
        return res.json({
            status: "success",
            message: "All halls queried!",
            data: halls,
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
    try {
        const hall = await Hall.findById(req.params._id)
            .populate("gallery events")
            .populate({
                path: "contacts",
                populate: { path: "image" },
            });

        return res.json({
            status: "success",
            message: "All halls queried!",
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

const addHall = async (req, res) => {
    console.log("addHall ENDPOINT => ", req.body);
    try {
        const resource = new Hall(req.body);
        await resource.save();
        return res.json({
            status: "success",
            message: "Hall added!",
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

const updateHallById = async (req, res) => {
    console.log("updateHallById ENDPOINT => ", req.params, req.body);
    const _id = req.params._id;
    try {
        const hall = await Hall.findByIdAndUpdate(_id, req.body, {
            new: true,
        });
        return res.json({
            status: "success",
            message: "Hall updated!",
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

const deleteHallById = async (req, res) => {
    console.log("deleteHallById ENDPOINT => ", req.params, req.body);
    const _id = req.params._id;
    try {
        await Hall.findByIdAndDelete(_id);
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
    getHalls,
    addHall,
    getHallById,
    updateHallById,
    deleteHallById,
};
