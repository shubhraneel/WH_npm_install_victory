const mongoose = require("mongoose");
const { Schema } = mongoose;

const facultySchema = new Schema(
    {
        contact: { type: Schema.ObjectId, ref: "Contact" },
        researchArea: [{ type: String, required: true }],
    },
    { timestamps: true }
);

const Faculty = mongoose.model("Faculty", facultySchema);
module.exports = Faculty;
