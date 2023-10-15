const mongoose = require("mongoose");
const { Schema } = mongoose;

const grievanceFormSchema = new Schema(
    {
        user: { type: Schema.ObjectId, ref: "User", required: true },
        category: {
            type: String,
            enum: [
                "Academic",
                "Payment",
                "ExtraCurricular",
                "Scholarship",
                "MentalHealth",
                "Others",
            ],
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        attempts: {
            type: String,
            required: true,
        },
        documents: {
            type: Array,
        },
    },
    { timestamps: true }
);

const GrievanceForm = mongoose.model("GrievanceForm", grievanceFormSchema);
module.exports = GrievanceForm;
