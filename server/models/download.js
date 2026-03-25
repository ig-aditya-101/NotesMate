import mongoose from "mongoose";
const Schema = mongoose.Schema;

const downloadSchema = new Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    note: { type: mongoose.Schema.Types.ObjectId, ref: "note" },
  },
  {
    timestamps: true,
  },
);

const Download= mongoose.model('Download',downloadSchema);
export default Download;
