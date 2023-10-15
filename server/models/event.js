const mongoose = require("mongoose");
const slug = require("mongoose-slug-generator");
mongoose.plugin(slug);
const { Schema } = mongoose;

const eventSchema = new Schema(
    {
        introduction: {
            type: String,
            trim: true,
            required: true,
        },
        procedure: {
            type: String,
            trim: true,
            required: true,
        },
        judgingCriteria: {
            type: String,
            trim: true,
        },
        timeline: [
            {
                time: {
                    type: Date,
                    required: true,
                },
                description: {
                    type: String,
                    required: true,
                },
            },
        ],
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
        isTSGEvent: {
            type: Boolean,
            default: false,
            required: true,
        },
        organisedBy: { type: Schema.ObjectId, ref: "Society" },
        eventName: {
            type: String,
            trim: true,
            required: true,
        },
        platform: {
            type: String,
            trim: true,
            required: true,
        },
        registrationLink: {
            type: String,
            trim: true,
            required: true,
        },
        eventImage: {
            type: String,
            required: true,
        },
        eventDate: {
            type: Date,
            required: true,
        },
        report: {
            type: String,
        },
        slug: {
            type: String,
            slug: ["eventName"],
            unique: true,
        },
    },
    { timestamps: true }
);

const Event = mongoose.model("Event", eventSchema);
module.exports = Event;
