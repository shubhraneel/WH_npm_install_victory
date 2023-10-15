const mongoose = require("mongoose");
const { Schema } = mongoose;

const cdcStatsSchema = new Schema(
    {
        statsTime: {
            year: {
                type: Number,
                trim: true,
            },
            day: {
                type: Number,
                trim: true,
            },
        },
        description: {
            type: String,
            trim: true,
            required: true,
        },
        gallery: [{ type: Schema.ObjectId, ref: "Image" }],
    },
    { timestamps: true }
);

const CDCStats = mongoose.model("CDCStats", cdcStatsSchema);
module.exports = CDCStats;
