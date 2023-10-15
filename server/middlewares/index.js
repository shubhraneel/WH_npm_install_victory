const Student = require("../models/student.js");
const Official = require("../models/officials.js");
const { promisify } = require("util");
const jwt = require("jsonwebtoken");

// export const requireSignin = expressJwt({
//     secret: process.env.JWT_SECRET,
//     algorithms: ["HS256"],
// });

const requireSignin = async (req, res, next) => {
    try {
        let token;

        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer")
        ) {
            token = req.headers.authorization.split(" ")[1];
        }

        if (!token) {
            res.status(401).json({
                message: "You are not logged in. Please log in to get access",
            });
        }

        const decoded = await promisify(jwt.verify)(
            token,
            process.env.JWT_SECRET
        );

        const freshUser =
            (await Student.findById(decoded._id)) ||
            (await Official.findById(decoded._id));

        if (!freshUser) {
            res.status(401).json({
                message: "The user with the given token doesnot exist",
            });
        }

        req.user = freshUser;
        next();
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

const restrictTo = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                message:
                    "You do not have the permssions to perform this action!",
            });
        }

        next();
    };
};

module.exports = {
    requireSignin,
    restrictTo,
};
