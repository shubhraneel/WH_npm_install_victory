const mongoose = require("mongoose");
const { Schema } = mongoose;

const societySchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    coverImage: { type: String, required: true },
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
    },
    contacts: [{ type: Schema.ObjectId, ref: "Official" }],
    gallery: [{ type: Schema.ObjectId, ref: "Image" }],
    events: [{ type: Schema.ObjectId, ref: "Event" }],
    billReimbursements: [
      { type: Schema.ObjectId, ref: "BillReimbursementForm" },
    ],
  },
  { timestamps: true }
);

const Society = mongoose.model("Society", societySchema);
module.exports = Society;
