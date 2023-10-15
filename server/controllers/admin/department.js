const Department = require("../../models/department");

const getDepartments = async (req, res) => {
    console.log("getDepartments ENDPOINT");
    try {
        const departments = await Department.find({}).populate({
            path: "faculty",
            populate: { path: "contact" },
        });
        return res.json({
            status: "success",
            message: "All departments queried!",
            data: departments,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            status: "error",
            message: err.message,
        });
    }
};

const addDepartment = async (req, res) => {
    console.log("addDepartment ENDPOINT => ", req.body);
    try {
        const department = new Department(req.body);
        await department.save();
        return res.json({
            status: "success",
            message: "Department added!",
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

const updateDepartmentById = async (req, res) => {
    console.log("updateDepartmentById ENDPOINT => ", req.params, req.body);
    const _id = req.params._id;
    try {
        const department = await Department.findByIdAndUpdate(_id, req.body, {
            new: true,
        });
        return res.json({
            status: "success",
            message: "Department updated!",
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

const deleteDepartmentById = async (req, res) => {
    console.log("deleteDepartmentById ENDPOINT => ", req.params, req.body);
    const _id = req.params._id;
    try {
        await Department.findByIdAndDelete(_id);
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
    getDepartments,
    addDepartment,
    updateDepartmentById,
    deleteDepartmentById,
};
