const mongoose = require("mongoose");
const { Schema } = mongoose;

const achievementSchema = new Schema(
    {
        user: { type: Schema.ObjectId, ref: "Student", required: true },
        certificate: {
            type: String,
            required: true,
        },
        category: {
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
        date: {
            type: Date,
            required: true,
        },
        organisedBy: {
            type: String,
            trim: true,
        },
        eventName: {
            type: String,
            trim: true,
            required: true,
        },
        eventImage: {
            type: String,
            trim: true,
        },
    },
    { timestamps: true }
);

const Achievement = mongoose.model("Achievement", achievementSchema);
module.exports = Achievement;