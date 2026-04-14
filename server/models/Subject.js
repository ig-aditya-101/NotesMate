import mongoose from "mongoose";
const Schema = mongoose.Schema;

const subjectSchema = new Schema({
  name: { type: String, required: true },
  branch: { type: String, required: true },
  course: { type: String, required: true },
  university: { type: String, required: true },
  semester: { type: Number, required: true },
});

const Subject = mongoose.model("subject", subjectSchema);
export default Subject;
