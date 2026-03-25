import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema =new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, unique: true },
    password: { type: String, select: false },
    role: { type: String, enum: ["student", "teacher"], default: "student" },
    college: { type: mongoose.Schema.Types.ObjectId, ref: "College" },
    avatar: {
      type: String,
      trim: true,
      default: 'https://example.com/images/default-avatar.png',
    },
  },
  { timestamps: true },
);
const User = mongoose.model("user", userSchema);
export default User;
