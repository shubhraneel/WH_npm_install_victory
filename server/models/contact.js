const mongoose = require("mongoose");
const { Schema } = mongoose;

const contactSchema = new Schema(
    {
        designation: {
            type: String,
            trim: true,
            required: true,
        },
        name: {
            type: String,
            trim: true,
            required: true,
        },
        email: {
            type: String,
            trim: true,
        },
        phone: {
            type: String,
            trim: true,
        },
        image: { type: Schema.ObjectId, ref: "Image" },
        isTSGContact: {
            type: Boolean,
            default: false,
        },
        category: {
            type: String,
            enum: ["CurrentOfficeBearers", "TSGStaff", "Secretaries"],
        },
    },
    { timestamps: true }
);

const Contact = mongoose.model("Contact", contactSchema);
module.exports = Contact;