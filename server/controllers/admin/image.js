const Image = require("../../models/image");

const getImages = async (req, res) => {
    console.log("getImages ENDPOINT");
    try {
        const images = await Image.find({}).populate("uploadedBy");
        return res.json({
            status: "success",
            message: "All images queried!",
            data: images,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            status: "error",
            message: err.message,
        });
    }
};

const addImage = async (req, res) => {
    console.log("addImage ENDPOINT => ", req.body);
    try {
        const image = new Image(req.body);
        await image.save();
        return res.json({
            status: "success",
            message: "Image added!",
            data: image,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            status: "error",
            message: err.message,
        });
    }
};

const updateImageById = async (req, res) => {
    console.log("updateImageById ENDPOINT => ", req.params, req.body);
    const _id = req.params._id;
    try {
        const image = await Image.findByIdAndUpdate(_id, req.body, {
            new: true,
        });
        return res.json({
            status: "success",
            message: "Im    age updated!",
            data: image,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            status: "error",
            message: err.message,
        });
    }
};

const deleteImageById = async (req, res) => {
    console.log("deleteImageById ENDPOINT => ", req.params, req.body);
    const _id = req.params._id;
    try {
        await Image.findByIdAndDelete(_id);
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
    getImages,
    addImage,
    updateImageById,
    deleteImageById,
};
