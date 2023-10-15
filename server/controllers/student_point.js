const Resources = require("../models/resource");
const Department = require("../models/department");

const getAcademicResource = async (req, res) => {
    console.log("getAcademicResource ENDPOINT", req.body);
    const data = {
        physics:
            "https://drive.google.com/drive/folders/1c6JWT1OvJbTt43PYfmY9tQ7fVpGWsMNC?usp=sharing",
        chemistry:
            "https://drive.google.com/drive/folders/1c6JWT1OvJbTt43PYfmY9tQ7fVpGWsMNC?usp=sharing",
    };
    try {
        const department = await Department.findOne({
            departmentName: req.body.department,
        });
        let resources = await Resources.find({
            type: "academic",
            department: department._id,
        }).select("link name -_id");
        if (!resources)
            return res.json({
                status: "error",
                message: "Unable to fetch resources!",
            });
        resources.push({
            link: data.physics,
            name: "physics",
        });
        resources.push({
            link: data.chemistry,
            name: "chemistry",
        });
        return res.json({
            status: "success",
            message: "Data for Academic page",
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

const getCareerResource = async (req, res) => {
    try {
        let resources = await Resources.find({
            type: "career",
        }).select("link name -_id");
        if (!resources)
            return res.json({
                status: "error",
                message: "Unable to fetch resources!",
            });
        return res.json({
            status: "success",
            message: "Data for Career page",
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

module.exports = {
    getAcademicResource,
    getCareerResource,
};
