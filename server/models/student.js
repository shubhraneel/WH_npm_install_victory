const mongoose = require("mongoose");
const { Schema } = mongoose;

const studentSchema = new Schema(
  {
    rollNo: {
      type: String,
      trim: true,
      min: 9,
      max: 9,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      enum: ["student", "societyOfficial"],
      required: true,
    },
    isRegistered: {
      type: Boolean,
      default: false,
    },
    otp: {
      type: Number,
    },
    otpExpiresAt: {
      type: Date,
    },
    phone: {
      type: Number,
    },
    gender: {
      type: String,
      enum: ["male", "female", "others"],
    },
    society: [
      {
        name: { type: Schema.ObjectId, ref: "Society" },
        role: { type: String },
        officialRights: { type: Boolean, default: false },
      },
    ],
    profilePic: { type: String },
    hall: { type: Schema.ObjectId, ref: "Hall" },
    department: { type: Schema.ObjectId, ref: "Department" },
    achievements: [{ type: Schema.ObjectId, ref: "Achievement" }],
    dob: {
      type: Date,
    },
    course: {
      type: String,
      enum: [
        "B.Tech",
        "B.Arch",
        "Dual Degree",
        "MBA",
        "MHRM",
        "LLB",
        "MMST",
        "MCP",
        "M.Sc",
        "M.Tech",
        "MS",
        "Ph.D",
      ],
    },
    tags: [
      {
        type: String,
        enum: [
          "Finance",
          "Software",
          "Consulting",
          "Data",
          "Quant",
          "Designing",
        ],
      },
    ],
    newNotification: { type: Boolean, default: false },
    fundaeFinderRequests: [
      { type: Schema.ObjectId, ref: "FundaeFinderRequest" },
    ],
  },
  { timestamps: true }
);

const Student = mongoose.model("Student", studentSchema);
module.exports = Student;
