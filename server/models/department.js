const mongoose = require("mongoose");
const { Schema } = mongoose;

const departmentSchema = new Schema(
    {
        departmentName: {
            type: String,
            trim: true,
            required: true,
        },
        faculty: [{ type: Schema.ObjectId, ref: "Faculty" }],
    },
    { timestamps: true }
);

const Department = mongoose.model("Department", departmentSchema);
module.exports = Department;
