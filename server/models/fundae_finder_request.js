const mongoose = require("mongoose");
const { Schema } = mongoose;

const fundaeFinderRequestSchema = new Schema(
    {
        requestedBy: { type: Schema.ObjectId, ref: "Student" },
        requestedTo: { type: Schema.ObjectId, ref: "Student" },
        status: {
            type: String,
            enum: ["pending", "accepted", "rejected"],
            default: "pending",
        },
    },
    { timestamps: true }
);

const FundaeFinderRequest = mongoose.model(
    "FundaeFinderRequest",
    fundaeFinderRequestSchema
);
module.exports = FundaeFinderRequest;
