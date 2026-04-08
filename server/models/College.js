import mongoose from "mongoose";

const Schema = mongoose.Schema;

const collegeSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    city: String,
    state: String,
  },
  { timestamps: true },
);
collegeSchema.index({ name: 1 })
const College = mongoose.model("college", collegeSchema);
export default College;
