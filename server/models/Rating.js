import mongoose from "mongoose";
const Schema = mongoose.Schema;

const ratingSchema = new Schema(
  {
    rating: { type: Number, min: 1, max: 5, required: true },
    note: { type: mongoose.Schema.Types.ObjectId, ref: "note" },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  },
  { timestamps: true },
);

ratingSchema.index({ note: 1, user: 1 }, { unique: true });

const Rating = mongoose.model("Rating", ratingSchema);
export default Rating;
