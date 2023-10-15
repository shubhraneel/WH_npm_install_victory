const Student = require("../models/student");

const getCompleteProfile = async (req, res) => {
    try {
        const profileData = await Student.findById(req.user._id).populate(
            "department hall society"
        );

        return res.json({
            status: "success",
            message: "Logged In!",
            data: profileData,
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
    getCompleteProfile,
};
