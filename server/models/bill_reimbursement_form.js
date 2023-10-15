const mongoose = require("mongoose");
const { Schema } = mongoose;

const billReimbursementFormSchema = new Schema(
  {
    society: {
      type: Schema.ObjectId,
      ref: "Society",
      required: true,
    },
    status: {
      type: String,
      enum: ["Successfully Verified", "In Process", "Declined"],
      required: true,
    },
    createdBy: { type: Schema.ObjectId, ref: "Official", required: true },
    remarks: {
      type: String,
    },
    document: { type: String, required: true },
    description: { type: String, required: true },
  },
  { timestamps: true }
);

const BillReimbursementForm = mongoose.model(
  "BillReimbursementForm",
  billReimbursementFormSchema
);
module.exports = BillReimbursementForm;
