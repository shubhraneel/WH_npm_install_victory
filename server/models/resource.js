const mongoose = require("mongoose");
const { Schema } = mongoose;

const resourcesSchema = new Schema(
    {
        link: {
            type: String,
            trim: true,
            required: true,
        },
        type: {
            type: String,
            enum: ["academic", "career"],
            required: true,
        },
        name: {
            type: String,
            trim: true,
            required: true,
        },
        department: {
            type: Schema.ObjectId,
            ref: "Department",
        },
    },
    { timestamps: true }
);

const Resources = mongoose.model("Resources", resourcesSchema);
module.exports = Resources;
