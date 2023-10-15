const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const { Schema } = mongoose;

const officialSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    userName: {
      type: String,
    },
    password: {
      type: String,
      required: [true, "Official must have a password"],
      minlength: 8,
      select: false,
    },
    confirmPassword: {
      type: String,
      required: [true, "Official must have a password"],
      validate: {
        validator: function (el) {
          return el === this.password;
        },
        message: "Passwords do not match!",
      },
      select: false,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      enum: ["admin", "tsgOfficial", "societyOfficial", "hallOfficial"],
      required: true,
    },
    roleMetadata: {
      position: { type: String, required: true },
      hall: { type: Schema.ObjectId, ref: "Hall", required: false },
      society: { type: Schema.ObjectId, ref: "Society", required: false },
    },
    phone: {
      type: Number,
    },
    gender: {
      type: String,
      enum: ["male", "female", "others"],
    },
    profilePic: { type: Schema.ObjectId, ref: "Image", required: false },
  },
  { timestamps: true }
);

officialSchema.pre("save", function (next) {
  this.userName = `${this.role}--${this.name.split(" ").join("")}`;
  next();
});

officialSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);
  this.confirmPassword = undefined;

  next();
});

officialSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const Official = mongoose.model("Official", officialSchema);
module.exports = Official;
