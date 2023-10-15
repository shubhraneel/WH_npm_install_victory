const mongoose = require("mongoose");
const { Schema } = mongoose;

const hallSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    description: {
      type: String,
      trim: true,
      required: true,
    },
    coverImage: { type: String, required: true },
    contacts: [{ type: Schema.ObjectId, ref: "Official" }],
    gallery: [{ type: Schema.ObjectId, ref: "Image" }],
    events: [{ type: Schema.ObjectId, ref: "Event" }],
  },
  { timestamps: true }
);

const Hall = mongoose.model("Hall", hallSchema);
module.exports = Hall;
