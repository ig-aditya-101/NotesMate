import mongoose from "mongoose";

const Schema = mongoose.Schema;

const noteSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    subject: { type: String, required: true, trim: true },
    college: { type: mongoose.Schema.Types.ObjectId, ref: "College" },
    uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    fileUrl: { type: String, required: true },
    filePublicId: { type: String, required: true },
    fileName: { type: String },
    fileSize: { type: Number },
    downloads: { type: Number, default: 0 },
    averageRating: { type: Number, default: 0 },
    ratingCount: { type: Number, default: 0 },
    aiQualityScore: { type: Number },
    contentHash: { type: String },
    noteStatus: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "approved",
    },
    isTrending: { type: Boolean, default: false },
  },
  { timestamps: true },
);

noteSchema.index({ college: 1, subject: 1 });
noteSchema.index({ college: 1, createdAt: -1 });

const Note = mongoose.model("note", noteSchema);
export default Note;
