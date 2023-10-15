const mongoose = require("mongoose");
const { Schema } = mongoose;

const resultSchema = new Schema(
    {
        type: {
            type: String,
            enum: [
                "Technology",
                "SocialAndCulture",
                "SportsAndGames",
                "StudentWelfare",
            ],
            required: true,
        },
        description: {
            type: String,
            trim: true,
            required: true,
        },
        gallery: [{ type: Schema.ObjectId, ref: "Image" }],
        report: {
            type: String,
            trim: true,
        },
    },
    { timestamps: true }
);

const Result = mongoose.model("Result", resultSchema);
module.exports = Result;
