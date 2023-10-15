const mongoose = require("mongoose");
const { Schema } = mongoose;

const imageSchema = new Schema(
    {
        imageURL: {
            type: String,
            trim: true,
            required: true,
        },
        uploadedBy: { type: Schema.ObjectId, ref: "Student" },
    },
    { timestamps: true }
);

const Image = mongoose.model("Image", imageSchema);
module.exports = Image;
