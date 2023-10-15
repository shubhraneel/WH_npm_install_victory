const Faculty = require("../../models/faculty");

const getFaculties = async (req, res) => {
    console.log("getFaculties ENDPOINT");
    try {
        const faculties = await Faculty.find({}).populate({
            path: "contact",
            populate: { path: "image" },
        });
        return res.json({
            status: "success",
            message: "All faculties queried!",
            data: faculties,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            status: "error",
            message: err.message,
        });
    }
};

const addFaculty = async (req, res) => {
    console.log("addFaculty ENDPOINT => ", req.body);
    try {
        const faculty = new Faculty(req.body);
        await faculty.save();
        return res.json({
            status: "success",
            message: "Faculty added!",
            data: faculty,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            status: "error",
            message: err.message,
        });
    }
};

const updateFacultyById = async (req, res) => {
    console.log("updateFacultyById ENDPOINT => ", req.params, req.body);
    const _id = req.params._id;
    try {
        const faculty = await Faculty.findByIdAndUpdate(_id, req.body, {
            new: true,
        });
        return res.json({
            status: "success",
            message: "Faculty updated!",
            data: faculty,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            status: "error",
            message: err.message,
        });
    }
};

const deleteFacultyById = async (req, res) => {
    console.log("deleteFacultyById ENDPOINT => ", req.params, req.body);
    const _id = req.params._id;
    try {
        await Faculty.findByIdAndDelete(_id);
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
    getFaculties,
    addFaculty,
    updateFacultyById,
    deleteFacultyById,
};
