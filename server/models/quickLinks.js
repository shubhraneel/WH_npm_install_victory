const mongoose = require("mongoose");
const { Schema } = mongoose;

const quickLinksSchema = new Schema(
    {
        link: {
            type: String,
            trim: true,
            required: true,
            unique: true,
        },
        name: {
            type: String,
            trim: true,
            required: true,
        },
        logo: {
            type: String,
            trim: true,
        },
    },
    { timestamps: true }
);

const QuickLinks = mongoose.model("QuickLinks", quickLinksSchema);
module.exports = QuickLinks;
